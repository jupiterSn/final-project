export function formatDateTime(value: string) {
  return new Date(value).toLocaleString();
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
