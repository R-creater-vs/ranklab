import type { Document, RankedDocument, TermContribution, RankerConfig } from './types.ts';
import { tokenize, computeTermFrequencies } from './tokenizer.ts';

export interface DocumentPosting {
  docId: string;
  tf: number;
}

export class InvertedIndex {
  public docs: Map<string, Document> = new Map();
  public docLengths: Map<string, number> = new Map();
  public docTokens: Map<string, Map<string, number>> = new Map();
  public postings: Map<string, DocumentPosting[]> = new Map();
  public docFrequency: Map<string, number> = new Map();
  public avgDocLength: number = 0;
  public totalDocs: number = 0;

  constructor(documents: Document[]) {
    this.buildIndex(documents);
  }

  private buildIndex(documents: Document[]): void {
    this.docs.clear();
    this.docLengths.clear();
    this.docTokens.clear();
    this.postings.clear();
    this.docFrequency.clear();

    this.totalDocs = documents.length;
    let totalTokens = 0;

    for (const doc of documents) {
      this.docs.set(doc.docId, doc);
      // Combine title (weighted x2) and body
      const titleTokens = tokenize(doc.title);
      const bodyTokens = tokenize(doc.body);
      const allTokens = [...titleTokens, ...titleTokens, ...bodyTokens];

      const len = allTokens.length;
      this.docLengths.set(doc.docId, len);
      totalTokens += len;

      const tfMap = computeTermFrequencies(allTokens);
      this.docTokens.set(doc.docId, tfMap);

      for (const [term, tf] of tfMap.entries()) {
        const list = this.postings.get(term) || [];
        list.push({ docId: doc.docId, tf });
        this.postings.set(term, list);
        this.docFrequency.set(term, (this.docFrequency.get(term) || 0) + 1);
      }
    }

    this.avgDocLength = this.totalDocs > 0 ? totalTokens / this.totalDocs : 0;
  }

  public getIDF(term: string): number {
    const df = this.docFrequency.get(term) || 0;
    if (df === 0 || this.totalDocs === 0) return 0;
    // Robertson-Spärck Jones non-negative IDF variant
    return Math.log(1 + (this.totalDocs - df + 0.5) / (df + 0.5));
  }

  public search(queryText: string, config: RankerConfig, topK: number = 10): RankedDocument[] {
    const rawTokens = tokenize(queryText);
    const queryTerms = Array.from(new Set(rawTokens)); // distinct query terms

    if (queryTerms.length === 0) {
      return [];
    }

    const candidateScores = new Map<string, { score: number; termContributions: TermContribution[] }>();

    for (const doc of this.docs.values()) {
      const docTfMap = this.docTokens.get(doc.docId);
      if (!docTfMap) continue;

      let totalScore = 0;
      const contributions: TermContribution[] = [];
      const docLen = this.docLengths.get(doc.docId) || 1;

      for (const term of queryTerms) {
        const tf = docTfMap.get(term) || 0;
        if (tf === 0) continue;

        const idf = this.getIDF(term);
        let termScore = 0;

        if (config.type === 'bm25') {
          const numerator = tf * (config.k1 + 1);
          const denominator = tf + config.k1 * (1 - config.b + config.b * (docLen / (this.avgDocLength || 1)));
          termScore = idf * (numerator / denominator);
        } else {
          // TF-IDF baseline ranker
          const tfWeight = 1 + Math.log(tf);
          termScore = tfWeight * idf;
        }

        if (termScore > 0) {
          totalScore += termScore;
          contributions.push({
            term,
            tf,
            idf: Math.round(idf * 1000) / 1000,
            scoreContribution: Math.round(termScore * 1000) / 1000,
          });
        }
      }

      if (totalScore > 0) {
        candidateScores.set(doc.docId, { score: totalScore, termContributions: contributions });
      }
    }

    // Convert to RankedDocument list and sort
    const rankedList: RankedDocument[] = Array.from(candidateScores.entries())
      .map(([docId, { score, termContributions }]) => {
        const doc = this.docs.get(docId)!;
        return {
          rank: 0,
          docId,
          score: Math.round(score * 10000) / 10000,
          familyId: doc.familyId,
          title: doc.title,
          version: doc.version,
          current: doc.current,
          termContributions,
        };
      })
      .sort((a, b) => {
        const scoreDiff = b.score - a.score;
        if (Math.abs(scoreDiff) > 1e-9) return scoreDiff;
        // Tie-breaker: stable docId alphabetical
        return a.docId.localeCompare(b.docId);
      });

    // Apply Duplicate-Family Suppression if enabled
    if (config.duplicateSuppression) {
      const seenFamilies = new Set<string>();
      const retained: RankedDocument[] = [];
      const suppressed: RankedDocument[] = [];

      for (const item of rankedList) {
        if (!seenFamilies.has(item.familyId)) {
          seenFamilies.add(item.familyId);
          retained.push({ ...item, suppressed: false });
        } else {
          suppressed.push({ ...item, suppressed: true });
        }
      }

      const combined = [...retained, ...suppressed];
      combined.forEach((item, idx) => {
        item.rank = idx + 1;
      });
      return combined.slice(0, topK);
    } else {
      rankedList.forEach((item, idx) => {
        item.rank = idx + 1;
        item.suppressed = false;
      });
      return rankedList.slice(0, topK);
    }
  }
}
