# RANKLAB — 90-Second Technical Demo Script

## Hook
“The leaderboard says this search engine wins. Change one previously unknown relevance judgment and that conclusion is no longer supported.”

---

## The 90-Second Walkthrough

### 0:00 - 0:15: The Search Duel (The Leaderboard Trap)
- **Visual:** Open **Search Duel**. Query `[q-01]` "connect to campus eduroam wifi".
- **Narrative:**
  > "In standard IR evaluations, teams run a benchmark, treat unjudged documents as 0, and declare a winner. On this screen, Engine A (BM25) shows a provisional lead of +0.28 over the baseline. But notice the amber tags: 3 documents in the candidate pool have never been judged by a human assessor. Treating them as non-relevant is an assumption, not evidence."

### 0:15 - 0:35: The Signature Mechanism (Evidence Envelope)
- **Visual:** Switch to **Evidence Envelope**. Point to the number line and the zero axis.
- **Narrative:**
  > "Here is RANKLAB's signature contribution: the **Judgment Uncertainty Envelope**. Instead of assuming zeros, we enumerate all $2^u$ possible binary relevance completions on the fixed pool. For this query, the mathematical bounds span from **-0.21 to +0.35**. Because zero is inside the envelope, the leaderboard winner is completely unresolved."

### 0:35 - 0:55: The Opposing Witnesses
- **Visual:** Click **Reveal Min Witness**, then **Reveal Max Witness**.
- **Narrative:**
  > "Rather than just showing a confidence interval, RANKLAB produces the exact **witness assignments**. Look at the Min Witness: if document `doc-003` is relevant and `doc-002` is non-relevant, Engine B wins by -0.21. In the Max Witness, the opposite occurs. These are mathematical proofs of vulnerability."

### 0:55 - 1:15: Active Learning (Judgment Desk & Minimax Heuristic)
- **Visual:** Click **Judgment Desk**. Point to the top recommendation box and the Blinded Review toggle.
- **Narrative:**
  > "To resolve this uncertainty efficiently, the **Judgment Desk** provides a minimax width heuristic: it identifies the single document that guarantees the greatest reduction in worst-case envelope width, regardless of whether it is relevant or not. Furthermore, the **Blinded Review** toggle hides ranker identities to prevent human assessor confirmation bias."

### 1:15 - 1:30: Macro Sensitivity & Regression Map
- **Visual:** Click **Regression Map**. Show Development vs Held-Out split.
- **Narrative:**
  > "Across all 30 queries, 67% of held-out evaluations have unresolved winners under missing evidence. RANKLAB executes exact enumeration over 4,096 combinations in 7.4 milliseconds, 100% offline with zero cloud APIs."
