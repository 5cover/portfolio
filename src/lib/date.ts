export function formatDate(dateString: string, locale: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.valueOf())) {
    return dateString;
  }
  return new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(date);
}
