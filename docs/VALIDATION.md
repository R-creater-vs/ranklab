# RANKLAB — Contract Validation & Evaluation Report

## Executive Summary
This document records the empirical verification of **RANKLAB** (Search Evaluation Under Missing Judgments). RANKLAB calculates exact bounded uncertainty intervals $[\min \Delta, \max \Delta]$ over incomplete candidate pools and generates reproducible witness label sets.

All tests run 100% offline with zero cloud spending or paid API keys.

---

## 1. Automated Contract Verification Suite

**Command executed:**
```bash
npm test
# Equivalent to: node --experimental-strip-types --test tests/ranklab_contract.test.ts
```

**Results:**
```
✔ Contract 1: Canonical 2-Document Fixture & Mathematical Envelope Verification (8.95ms)
✔ Contract 2: BM25 Formula, RSJ Non-Negative IDF, and Tie-Breaking (3.09ms)
✔ Contract 3: Duplicate-Family Suppression Policy Tradeoff (0.51ms)
✔ Contract 4: Monotonic Envelope Contraction Under Incremental Judgments (1.10ms)
✔ Contract 5: Minimax Next-Judgment Recommendation Heuristic (1.08ms)
ℹ tests 5
ℹ suites 0
ℹ pass 5
ℹ fail 0
ℹ duration_ms 177.15ms
```

### Detailed Contract Analysis
1. **Contract 1: Canonical 2-Document Mathematical Verification:**
   - Case 1A ($x=1, y=\text{unknown}$):
     - If $y=0$: $\text{NDCG}_A = 1.0, \text{NDCG}_B = 1/\log_2(3) \approx 0.6309$. $\Delta = +0.3691$.
     - If $y=1$: Both score $1.0$. $\Delta = 0.0$.
     - Resulting envelope: $[0.0000, 0.3691]$. Engine A is never worse, but not strictly superior across all completions.
   - Case 1B (Both $x, y$ unknown):
     - Envelope spans $[-0.3691, +0.3691]$.
     - The sign is unresolved ($0.0$ is inside the interval).
     - Opposing witness assignments:
       - Min witness ($\Delta = -0.3691$): $\{x: 0, y: 1\}$.
       - Max witness ($\Delta = +0.3691$): $\{x: 1, y: 0\}$.
2. **Contract 2: BM25 Non-Negative IDF & Lexical Scoring:**
   - Proves Robertson-Spärck Jones IDF: $\text{idf}(t) = \ln(1 + \frac{N - \text{df}(t) + 0.5}{\text{df}(t) + 0.5})$ is strictly positive even for ubiquitous terms ($\text{df}(t) = N$).
   - Verifies deterministic alphabetical tie-breaking on identical scores.
3. **Contract 3: Duplicate-Family Suppression Tradeoff:**
   - Verifies that when suppression is enabled, second document of the same `familyId` has `suppressed = true` and is moved behind distinct families.
4. **Contract 4: Monotonic Envelope Contraction:**
   - Proves that as unjudged documents are assigned labels $0$ or $1$, the new envelope $[\min', \max']$ is guaranteed to be a subset of the previous envelope $[\min, \max]$.
5. **Contract 5: Minimax Next-Judgment Heuristic:**
   - Confirms that evaluating worst-case remaining envelope width $W^*(d) = \max(W_0, W_1)$ correctly selects the document that minimizes uncertainty.

---

## 2. Production Build Verification
- **Command:** `npm run build` (`tsc -b && vite build`)
- **Duration:** 2.44 seconds
- **Output:**
  - `dist/index.html` (0.55 kB)
  - `dist/assets/index.css` (26.71 kB)
  - `dist/assets/index.js` (278.82 kB)
- **Zero TypeScript errors** (`strict: true`, `noImplicitAny`).
