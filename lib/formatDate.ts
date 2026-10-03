// "2026-10-03" -> "3 October 2026". Pinned to UTC so the day never shifts with the reader's timezone.
export const formatDate = (iso: string): string =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    timeZone: 'UTC',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
