# RANKLAB — Evaluation Contract & Mathematical Specification

## 1. Retrieval & Tokenization Contract

### Tokenization & Normalization
1. **Unicode Normalization**: All text is normalized using Unicode NFKC (`text.normalize('NFKC')`).
2. **Casing**: Lowercased (`toLowerCase()`).
3. **Punctuation & Delimiters**: Non-alphanumeric characters (regex `/[^\p{L}\p{N}]+/gu`) are treated as token separators.
4. **Stopwords**: Standard minimal English stopwords are retained for exact phrase match transparency, but query-document overlap is computed purely on token frequencies.
5. **Document Length**: Document length $\text{len}(d)$ is the total count of parsed tokens in title and body. Average document length $\text{avgLen} = \frac{1}{N} \sum_{d \in \mathcal{C}} \text{len}(d)$.
6. **Tie-Breaking**: If two documents have identical retrieval scores, they are sorted alphabetically by their unique `docId`.

### BM25 Formulation
RANKLAB implements the non-negative Robertson-Spärck Jones IDF variant:

$$\text{idf}(t) = \ln\left(1 + \frac{N - \text{df}(t) + 0.5}{\text{df}(t) + 0.5}\right)$$

For a query $q$ and document $d$:

$$\text{score}_{\text{BM25}}(q, d) = \sum_{t \in q \cap d} \text{idf}(t) \cdot \frac{\text{tf}(t, d) \cdot (k_1 + 1)}{\text{tf}(t, d) + k_1 \cdot \left(1 - b + b \cdot \frac{\text{len}(d)}{\text{avgLen}}\right)}$$

- Default parameters: $k_1 = 1.2$, $b = 0.75$.
- Baseline ranker: Token-overlap TF-IDF with linear term frequency.

### Duplicate-Family Suppression Policy
Each document belongs to a `familyId` (e.g. `wifi-setup`, `vpn-guide`).
When Duplicate-Family Suppression is enabled:
- The ranked list is traversed in descending score order.
- The first document from each `familyId` is retained; subsequent documents from the same `familyId` are marked `suppressed = true` and moved behind unique families.
- This isolates whether suppression improves NDCG or inadvertently removes a more specific version of a document.

---

## 2. Metric Formulations on Fixed Candidate Pools

### Binary Relevance
Relevance judgments $r \in \{0, 1, \text{null}\}$:
- `1`: Relevant.
- `0`: Verified nonrelevant.
- `null`: Unjudged / unknown. Never silently coerced to 0!

### Discounted Cumulative Gain (DCG@k)
For a ranked list of documents with assigned binary relevance vector $\mathbf{r} = [r_1, r_2, \dots, r_k]$:

$$\text{DCG}@k = \sum_{i=1}^k \frac{r_i}{\log_2(i + 1)}$$

### Ideal Discounted Cumulative Gain (IDCG@k) & Shared Denominator
$$\text{IDCG}@k = \sum_{j=1}^{\min(k, R_{\text{pool}})} \frac{1}{\log_2(j + 1)}$$
where $R_{\text{pool}} = \sum_{d \in \mathcal{P}} r_d$ is the total count of relevant documents in the fixed candidate pool $\mathcal{P}$.
**Critical IR Principle**: Both ranker A and ranker B are evaluated against the exact same pool and identical $\text{IDCG}@k$.

$$\text{NDCG}@k = \begin{cases} \frac{\text{DCG}@k}{\text{IDCG}@k} & \text{if } \text{IDCG}@k > 0 \\ 0 & \text{if } \text{IDCG}@k = 0 \text{ (marked 'no relevant item in pool')} \end{cases}$$

### Reciprocal Rank (RR@k)
$$\text{RR}@k = \begin{cases} \frac{1}{\min \{ i \in [1, k] \mid r_i = 1 \}} & \text{if } \exists i \le k \text{ with } r_i = 1 \\ 0 & \text{otherwise} \end{cases}$$

---

## 3. The Judgment Uncertainty Envelope

For a query $q$ and evaluation cutoff $k = 5$:
1. Form fixed candidate pool $\mathcal{P} = \text{Top}_k(A) \cup \text{Top}_k(B) \cup \mathcal{D}_{\text{judged}}$.
2. Identify unjudged documents $\mathcal{U} = \{ d \in \mathcal{P} \mid J(d) = \text{null} \}$, with $u = |\mathcal{U}|$.
3. If $u \le 12$, enumerate all $2^u$ binary assignments $\omega \in \{0, 1\}^u$.
4. For each assignment $\omega$:
   - Complete the pool relevance vector.
   - Compute $\text{NDCG}_A(\omega)$ and $\text{NDCG}_B(\omega)$ using the shared ideal denominator $\text{IDCG}(\omega)$.
   - Compute difference $\Delta(\omega) = \text{NDCG}_A(\omega) - \text{NDCG}_B(\omega)$.
5. Output exact envelope $[\min_\omega \Delta(\omega), \max_\omega \Delta(\omega)]$ and witness assignments $\omega_{\min}, \omega_{\max}$.

### Mathematical Properties
- **Exact Logical Bounds**: $[\min \Delta, \max \Delta]$ spans all physically realizable outcomes under binary relevance.
- **Monotonicity Under Labeling**: As an unknown document is labeled $0$ or $1$, the new envelope is guaranteed to be a subset of the previous envelope: $[\min', \max'] \subseteq [\min, \max]$.
- **Minimax Next-Judgment Recommendation**:
  For each $d \in \mathcal{U}$, evaluate the worst-case remaining envelope width:
  $$W^*(d) = \max \left( \text{width}(\Delta \mid r_d = 0), \text{width}(\Delta \mid r_d = 1) \right)$$
  The suggested next document to judge is:
  $$d^* = \arg\min_{d \in \mathcal{U}} W^*(d) \quad (\text{tie-broken by stable docId})$$

---

## 4. The Canonical 2-Document Fixture

- Document set $\{x, y\}$; $k = 2$.
- Ranker A orders $[x, y]$; Ranker B orders $[y, x]$.
- Case 1: $x = 1, y = \text{unknown}$:
  - If $y = 0$: $\text{NDCG}_A = 1.0, \text{NDCG}_B = \frac{1}{\log_2(3)} \approx 0.6309$. $\Delta = 1 - 0.6309 = +0.3691$.
  - If $y = 1$: Both score $1.0$. $\Delta = 0.0$.
  - Exact envelope: $[0, 1 - 1/\log_2(3)] \approx [0.0, 0.3691]$.
  - Conclusion: A is never worse than B, but not strictly better under all completions.
- Case 2: Both $x, y$ unknown:
  - If $x = 0, y = 1$: $\Delta = -0.3691$ (B wins).
  - If $x = 1, y = 0$: $\Delta = +0.3691$ (A wins).
  - If $x = y$: $\Delta = 0.0$ (Tied).
  - Exact envelope: $[-0.3691, +0.3691]$. Sign is completely unresolved.
