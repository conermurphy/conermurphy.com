export default function getHeadingLink(children: string): string {
  return typeof children === 'string'
    ? children
        // Regex to remove all punctionation from the original string
        .replace(/['!"#$%&\\'()\\*+,\-\\.\\/:;<=>?@\\[\\\]\\^_`{|}~']/g, '')
        // Convert any spaces to '-'
        .replace(/ /g, '-')
        // Replace any '--' to a '-'
        .replace(/(--)/g, '-')
        // Make it all lower case
        .toLowerCase()
    : '';
}
