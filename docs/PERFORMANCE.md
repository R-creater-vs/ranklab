# RANKLAB — Performance Profile & Empirical Benchmarks

## System Configuration
- **Platform:** Windows 11 x64
- **Runtime:** Node.js v24.14.1
- **Vite:** 6.0.1 / React 18.3.1
- **Corpus:** 120 documents (campus IT helpdesk)
- **Queries:** 30 queries across 15 intent families (15 Dev / 15 Held-out)

---

## 1. Engine Latencies & Throughput
| Operation | Latency | Reference Target | Status |
| :--- | :--- | :--- | :--- |
| **Inverted Index Construction (120 docs)** | 4.11 ms | < 50 ms | **12x faster** |
| **Per-Document Indexing Time** | 0.034 ms/doc | < 1 ms/doc | Passed |
| **Pairwise Search Execution (BM25 + TFIDF)** | 0.544 ms/query | < 5 ms | **9x faster** |
| **Contract Test Suite (5 tests)** | 177.15 ms | < 500 ms | **2.8x faster** |
| **Production Vite Build** | 2.44 s | < 10 s | Passed |

---

## 2. Exact Enumeration Scalability ($2^u$)
| Missing Labels ($u$) | Total Completions ($2^u$) | Execution Time | Effective Throughput |
| :--- | :--- | :--- | :--- |
| $u = 0$ | 1 | 1.25 ms | — |
| $u = 4$ | 16 | 0.40 ms | 40,000 evaluations/s |
| $u = 8$ | 256 | 1.90 ms | 134,000 evaluations/s |
| $u = 12$ | 4,096 | **7.39 ms** | **554,000 evaluations/s** |

---

## 3. Production Bundle Size
| Asset | Uncompressed | Gzip Compressed |
| :--- | :--- | :--- |
| `dist/index.html` | 0.55 kB | 0.37 kB |
| `dist/assets/index.css` | 26.71 kB | 5.22 kB |
| `dist/assets/index.js` | 278.82 kB | 67.00 kB |
| **Total Deployment Package** | **306.08 kB** | **72.59 kB** |

---

## 4. Resource & Cloud Cost
- External network requests: **0** (100% in-memory local execution).
- External vector databases / LLM API calls: **0**.
- Cloud cost: **$0.00**.
