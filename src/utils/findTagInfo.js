import tagData from '../data/tags.json';

export default function findTagInfo(tag) {
  const tagKeys = Object.keys(tagData);

  const matchingTag = tagKeys.find((tk) => tk.toLowerCase() === tag.toLowerCase());

  const { backgroundColor, color } = tagData[matchingTag];

  return { backgroundColor, color, matchingTag };
}
