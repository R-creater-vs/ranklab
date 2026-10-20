import test from 'node:test';
import assert from 'node:assert/strict';

import { tokenize } from '../src/domain/tokenizer.ts';
import { InvertedIndex } from '../src/domain/bm25.ts';
import {
  calculateDCG,
  calculateIDCG,
  calculateNDCG,
  calculateReciprocalRank,
  evaluateRankingOnPool,
} from '../src/domain/metrics.ts';
import { computeJudgmentEnvelope } from '../src/domain/envelope.ts';
import type { Document, RankerConfig } from '../src/domain/types.ts';

// -------------------------------------------------------------
// CONTRACT 1: Canonical 2-Document Fixture & Mathematical Envelope
// -------------------------------------------------------------
test('Contract 1: Canonical 2-Document Fixture & Mathematical Envelope Verification', () => {
  const docX = 'doc-X';
  const docY = 'doc-Y';
  const rankedA = [docX, docY];
  const rankedB = [docY, docX];
  const pool = [docX, docY];

  // Case 1A: x is relevant (1), y is unknown (null)
  const known1 = { [docX]: 1 as const };
  const env1 = computeJudgmentEnvelope('q-canonical', rankedA, rankedB, known1, pool, undefined, 2);

  // Exact math:
  // If y = 0: DCG_A = 1/log2(2) = 1.0; DCG_B = 1/log2(3) = 0.63092975; IDCG = 1.0
  // NDCG_A = 1.0, NDCG_B = 0.6309. Diff = 1 - 0.6309 = +0.3691.
  // If y = 1: DCG_A = 1 + 1/log2(3) = 1.6309; DCG_B = 1 + 1/log2(3) = 1.6309; IDCG = 1.6309
  // NDCG_A = 1.0, NDCG_B = 1.0. Diff = 0.0.
  // Envelope should be [0.0, 0.3691]
  assert.equal(env1.isExact, true);
  assert.equal(env1.missingCount, 1);
  assert.equal(env1.totalCombinations, 2);
  assert.ok(Math.abs(env1.minDifference - 0.0) <= 0.0001, `Min diff was ${env1.minDifference}`);
  assert.ok(Math.abs(env1.maxDifference - 0.3691) <= 0.0002, `Max diff was ${env1.maxDifference}`);
  assert.equal(env1.minWitness.labels[docY], 1, 'Min witness has y=1');
  assert.equal(env1.maxWitness.labels[docY], 0, 'Max witness has y=0');

  // Case 1B: Both x and y are unknown (null)
  const knownNone = {};
  const envNone = computeJudgmentEnvelope('q-canonical', rankedA, rankedB, knownNone, pool, undefined, 2);

  // When both unknown:
  // If x=0, y=1: B wins, Diff = -0.3691
  // If x=1, y=0: A wins, Diff = +0.3691
  // If x=y: Diff = 0
  assert.equal(envNone.missingCount, 2);
  assert.equal(envNone.totalCombinations, 4);
  assert.ok(Math.abs(envNone.minDifference - (-0.3691)) <= 0.0002, `Min diff was ${envNone.minDifference}`);
  assert.ok(Math.abs(envNone.maxDifference - 0.3691) <= 0.0002, `Max diff was ${envNone.maxDifference}`);
  assert.equal(envNone.verdict, 'unresolved', 'Verdict must be unresolved when sign can flip');
  assert.equal(envNone.minWitness.labels[docX], 0);
  assert.equal(envNone.minWitness.labels[docY], 1);
  assert.equal(envNone.maxWitness.labels[docX], 1);
  assert.equal(envNone.maxWitness.labels[docY], 0);
});

// -------------------------------------------------------------
// CONTRACT 2: BM25 Formula & Non-Negative RSJ IDF
// -------------------------------------------------------------
test('Contract 2: BM25 Formula, RSJ Non-Negative IDF, and Tie-Breaking', () => {
  const docs: Document[] = [
    {
      docId: 'doc-001',
      familyId: 'fam-net',
      title: 'Campus Wi-Fi Setup',
      body: 'Setup your device on the high-speed campus wireless network.',
      version: '3.0',
      current: true,
      topic: 'Network',
    },
    {
      docId: 'doc-002',
      familyId: 'fam-net',
      title: 'Wi-Fi Connection Issues',
      body: 'Common problems with Wi-Fi network certificates and authentication.',
      version: '2.0',
      current: false,
      topic: 'Network',
    },
    {
      docId: 'doc-003',
      familyId: 'fam-vpn',
      title: 'GlobalProtect VPN Client',
      body: 'Secure remote access through campus VPN gateway.',
      version: '1.0',
      current: true,
      topic: 'VPN',
    },
  ];

  const index = new InvertedIndex(docs);

  // Check RSJ non-negative IDF
  const idfWifi = index.getIDF('wi');
  assert.ok(idfWifi > 0, `IDF for 'wi' must be strictly positive: ${idfWifi}`);

  // Even if term is in all docs (N=3, df=3), ln(1 + 0.5/3.5) > 0
  const idfCampus = index.getIDF('campus');
  assert.ok(idfCampus > 0, `IDF for common term must be non-negative: ${idfCampus}`);

  // Test empty query returns empty
  const emptyRes = index.search('', { name: 'test', type: 'bm25', k1: 1.2, b: 0.75, duplicateSuppression: false });
  assert.equal(emptyRes.length, 0);

  // Test ranking and tie-breaking
  const res = index.search('wi-fi network', { name: 'test', type: 'bm25', k1: 1.2, b: 0.75, duplicateSuppression: false });
  assert.ok(res.length >= 2, 'Should return matching documents');
  assert.ok(res[0].score >= res[1].score, 'Higher score must rank first');
});

// -------------------------------------------------------------
// CONTRACT 3: Duplicate-Family Suppression Tradeoff Policy
// -------------------------------------------------------------
test('Contract 3: Duplicate-Family Suppression Policy Tradeoff', () => {
  const docs: Document[] = [
    {
      docId: 'doc-a',
      familyId: 'fam-wifi',
      title: 'Wi-Fi Guide Current Wi-Fi',
      body: 'Campus wifi connection instructions wifi wireless network',
      version: '3.0',
      current: true,
      topic: 'Wi-Fi',
    },
    {
      docId: 'doc-b',
      familyId: 'fam-wifi',
      title: 'Wi-Fi Guide Obsolete Wi-Fi',
      body: 'Legacy wifi instructions wifi wireless network',
      version: '1.0',
      current: false,
      topic: 'Wi-Fi',
    },
    {
      docId: 'doc-c',
      familyId: 'fam-vpn',
      title: 'VPN Setup Client',
      body: 'Remote vpn client for campus staff with wireless access',
      version: '2.0',
      current: true,
      topic: 'VPN',
    },
  ];

  const index = new InvertedIndex(docs);

  const cfgUnsuppressed: RankerConfig = {
    name: 'Unsuppressed',
    type: 'bm25',
    k1: 1.2,
    b: 0.75,
    duplicateSuppression: false,
  };

  const cfgSuppressed: RankerConfig = {
    name: 'Suppressed',
    type: 'bm25',
    k1: 1.2,
    b: 0.75,
    duplicateSuppression: true,
  };

  const resRaw = index.search('wifi wireless', cfgUnsuppressed);
  const resSup = index.search('wifi wireless', cfgSuppressed);

  // In unsuppressed, both doc-a and doc-b from fam-wifi occupy ranks 1 and 2
  assert.equal(resRaw[0].familyId, 'fam-wifi');
  assert.equal(resRaw[1].familyId, 'fam-wifi');
  assert.equal(resRaw[0].suppressed, false);
  assert.equal(resRaw[1].suppressed, false);

  // In suppressed, the first fam-wifi is kept at rank 1, but doc-c (fam-vpn) is promoted to rank 2 before doc-b
  assert.equal(resSup[0].familyId, 'fam-wifi');
  assert.equal(resSup[0].suppressed, false);
  assert.equal(resSup[1].familyId, 'fam-vpn');
  assert.equal(resSup[1].suppressed, false);
  assert.equal(resSup[2].familyId, 'fam-wifi');
  assert.equal(resSup[2].suppressed, true);
});

// -------------------------------------------------------------
// CONTRACT 4: Monotonic Envelope Contraction Under New Judgments
// -------------------------------------------------------------
test('Contract 4: Monotonic Envelope Contraction Under Incremental Judgments', () => {
  const rankedA = ['doc-1', 'doc-2', 'doc-3', 'doc-4'];
  const rankedB = ['doc-2', 'doc-1', 'doc-4', 'doc-3'];
  const pool = ['doc-1', 'doc-2', 'doc-3', 'doc-4'];

  // Start with all 4 unjudged
  const initialJudgments = {};
  const envInitial = computeJudgmentEnvelope('q-mono', rankedA, rankedB, initialJudgments, pool);

  // Now judge doc-1 as relevant (1)
  const step1Judgments = { 'doc-1': 1 as const };
  const envStep1 = computeJudgmentEnvelope('q-mono', rankedA, rankedB, step1Judgments, pool);

  // Now judge doc-2 as non-relevant (0)
  const step2Judgments = { 'doc-1': 1 as const, 'doc-2': 0 as const };
  const envStep2 = computeJudgmentEnvelope('q-mono', rankedA, rankedB, step2Judgments, pool);

  // Contraction assertions:
  // Step 1 envelope must be a subset of Initial envelope
  assert.ok(
    envStep1.minDifference >= envInitial.minDifference - 1e-4,
    `New min (${envStep1.minDifference}) cannot be lower than initial min (${envInitial.minDifference})`
  );
  assert.ok(
    envStep1.maxDifference <= envInitial.maxDifference + 1e-4,
    `New max (${envStep1.maxDifference}) cannot be higher than initial max (${envInitial.maxDifference})`
  );

  // Step 2 envelope must be a subset of Step 1 envelope
  assert.ok(
    envStep2.minDifference >= envStep1.minDifference - 1e-4,
    `Step2 min (${envStep2.minDifference}) cannot be lower than Step1 min (${envStep1.minDifference})`
  );
  assert.ok(
    envStep2.maxDifference <= envStep1.maxDifference + 1e-4,
    `Step2 max (${envStep2.maxDifference}) cannot be higher than Step1 max (${envStep1.maxDifference})`
  );
});

// -------------------------------------------------------------
// CONTRACT 5: Minimax Next-Judgment Recommendation Heuristic
// -------------------------------------------------------------
test('Contract 5: Minimax Next-Judgment Recommendation Heuristic', () => {
  const rankedA = ['doc-A', 'doc-B', 'doc-C'];
  const rankedB = ['doc-B', 'doc-A', 'doc-C'];
  const pool = ['doc-A', 'doc-B', 'doc-C'];

  // Doc-A is judged 1, doc-B and doc-C are unjudged
  const known = { 'doc-A': 1 as const };
  const env = computeJudgmentEnvelope('q-minimax', rankedA, rankedB, known, pool);

  assert.ok(env.suggestedNextJudgment, 'Must provide next judgment suggestion');
  const suggestion = env.suggestedNextJudgment!;

  // Must suggest one of the unjudged docs
  assert.ok(['doc-B', 'doc-C'].includes(suggestion.docId));
  assert.ok(suggestion.expectedWorstCaseWidth <= env.maxDifference - env.minDifference);
  assert.ok(suggestion.reasoning.length > 0);
});
