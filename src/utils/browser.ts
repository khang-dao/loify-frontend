export function openUrlInNewTab(url?: string) {
  url ? window.open(url, '_blank') : console.log('No URL provided')
}
