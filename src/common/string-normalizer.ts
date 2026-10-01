export function normalizeForSearch(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function collapsePunctuation(value: string): string {
  return value.replace(/[!?.,]{2,}/g, (match) => match[0]);
}
