export function tokenize(text: string): string[] {
  if (!text || typeof text !== 'string') return [];
  // NFKC normalization
  const normalized = text.normalize('NFKC').toLowerCase();
  // Match contiguous alphanumeric tokens across all Unicode scripts
  const tokens = normalized.match(/[\p{L}\p{N}]+/gu);
  return tokens || [];
}

export function computeTermFrequencies(tokens: string[]): Map<string, number> {
  const tf = new Map<string, number>();
  for (const t of tokens) {
    tf.set(t, (tf.get(t) || 0) + 1);
  }
  return tf;
}
