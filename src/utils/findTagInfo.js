import tagData from '../data/tags.json';

export default function findTagInfo(tag) {
  const matchingTag = tagData.find((tk) => tk.toLowerCase() === tag.toLowerCase());

  return { matchingTag };
}
