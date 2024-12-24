export function openUrlInNewTab(url: string) {
  url ? window.open(url, '_blank', 'noopener,noreferrer') : console.log('No URL provided')
}
