/** Encode each path segment so spaces, commas, and em-dashes load reliably in img src. */
export function encodeImageUrl(url: string): string {
  const [pathname, search = ''] = url.split('?');
  const encoded = pathname
    .split('/')
    .map((segment) => (segment ? encodeURIComponent(segment) : ''))
    .join('/');
  return search ? `${encoded}?${search}` : encoded;
}
