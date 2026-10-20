# LinkedIn Post Draft — RANKLAB

The leaderboard said Engine A beat Engine B by +0.18 NDCG.

Then we judged just ONE previously unreviewed document in the search pool.

And the winner reversed completely.

Why?

Because almost every search evaluation benchmark in industry relies on a silent, dangerous assumption: **unjudged documents are treated as non-relevant (score 0)**.

If your new search model finds novel, accurate documents that an annotator hasn't reviewed yet, standard evaluation pipelines don't just ignore them—they actively penalize your model by scoring them as zero.

To solve this, I built **RANKLAB** — a local search evaluation workbench with exact bounded judgment-uncertainty analysis.

Here is how it works:
1. **The Judgment Uncertainty Envelope:** Given an incomplete candidate pool with $u$ unjudged documents, it enumerates all $2^u$ completions to compute the exact logical bounds $[\min \Delta, \max \Delta]$ of the comparison.
2. **Opposing Witness Reconstruction:** It doesn't just show a range; it outputs the exact binary label assignment that produces the worst-case and best-case outcomes. If zero is inside the envelope, the leaderboard conclusion is statistically and logically ungrounded.
3. **Minimax Active Labeling:** Identifies the single document that guarantees the greatest reduction in worst-case envelope width, cutting down human labeling costs.
4. **Blinded Judgment Desk:** Hides ranker identities and positions to eliminate human confirmation bias.

⚡ 100% offline & zero cloud spend
⚡ Inverted index + BM25 with Robertson-Spärck Jones non-negative IDF
⚡ Exact enumeration over 4,096 combinations in 7.39 ms
⚡ 5/5 contract tests verified with strict TypeScript and Vite

Search relevance is an empirical science, not an imputation shortcut.

Explore the architecture and codebase here: [github repo link]

#InformationRetrieval #Search #DataAnalytics #SoftwareEngineering #TypeScript #BM25 #Benchmarking
