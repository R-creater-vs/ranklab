# RANKLAB — Empirical Evaluation & Benchmark Report

## Hardware & Environment
- **Platform:** Windows 11 / Node.js v24.14.1 / x64
- **Date:** 2026-10-20
- **Corpus Size:** 120 documents (fictional campus IT helpdesk)
- **Query Pool:** 30 queries across 15 intent families (15 Dev / 15 Held-out)

---

## 1. Indexing & Query Latency
| Metric | Value | Reference Standard |
| :--- | :--- | :--- |
| **Inverted Index Build Time** | 4.11 ms | < 50 ms |
| **Per-Document Indexing Speed** | 0.034 ms/doc | < 1 ms/doc |
| **Vocabulary Size** | 205 unique terms | Comprehensive |
| **Average Document Length** | 45.2 tokens | — |
| **Mean Pairwise Query Time** | 0.544 ms/query | < 5 ms |

---

## 2. Exact Enumeration Scalability ($2^u$)
| Missing Labels ($u$) | Combinations ($2^u$) | Execution Time | Max Throughput |
| :--- | :--- | :--- | :--- |
| $u = 0$ | 1 | 1.25 ms | Instantaneous |
| $u = 4$ | 16 | 0.4 ms | > 5,000 evals/s |
| $u = 8$ | 256 | 1.9 ms | > 20,000 evals/s |
| $u = 12$ | 4,096 | 7.39 ms | > 35,000 evals/s |

*Theoretical limit:* At $u > 12$, exact enumeration becomes intractable in real-time interactive UI loops without web workers, triggering an explicit bounded estimate.

---

## 3. Split Evaluation: Development vs Held-Out
| Split | Query Count | Baseline Diff (Unjudged=0) | Exact Macro Uncertainty Envelope | Unresolved Queries |
| :--- | :--- | :--- | :--- | :--- |
| **Development** | 15 queries | -0.1708 | `[-0.4671, 0.3528]` | **10 / 15 (67%)** |
| **Held-Out** | 15 queries | -0.2841 | `[-0.5071, 0.2954]` | **10 / 15 (67%)** |

### Key Takeaway for Information Retrieval
Under standard evaluation (imputing unjudged documents as non-relevant 0), BM25 appears to beat the baseline by **+-0.1708** on development and **+-0.2841** on held-out.
However, the **Exact Macro Uncertainty Envelope spans negative values** (`-0.5071` on held-out). Over **10 of 15 held-out queries (67%)** have opposing witness label sets where a previously unjudged document could completely reverse the outcome.
