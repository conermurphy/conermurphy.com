export default async function copyToClipboard(value: string) {
  await navigator.clipboard.writeText(value);
}
