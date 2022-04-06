export default function getHeadingLink(children: string): string {
  return typeof children === 'string'
    ? children
        // Regex to remove all punctionation from the original string
        .replaceAll(/['!"#$%&\\'()\\*+,\-\\.\\/:;<=>?@\\[\\\]\\^_`{|}~']/g, '')
        // Convert any spaces to '-'
        .replaceAll(' ', '-')
        // Replace any '--' to a '-'
        .replaceAll(/(--)/g, '-')
        // Make it all lower case
        .toLowerCase()
    : '';
}
