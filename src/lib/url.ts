export function constructImageUrl(profileUrl: string, options: {
    width?: number;
    quality?: number;
} = {}): string {
  const url = new URL(profileUrl);

  if (options.width !== undefined) {
    url.searchParams.append('w', options.width.toString());
  }

  if (options.quality !== undefined) {
    url.searchParams.append('q', options.quality.toString());
  }

  return url.toString();
}