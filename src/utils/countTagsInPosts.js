import findTagInfo from './findTagInfo';

export function count(arr) {
  const counts = arr.reduce((acc, tag) => {
    const existingTag = acc[tag];
    if (existingTag) {
      existingTag.count += 1;
    } else {
      acc[tag] = {
        tag,
        count: 1,
      };
    }
    return acc;
  }, {});

  const sortedTags = Object.values(counts).sort((a, b) => b.count - a.count);
  return sortedTags;
}

export default function countTagsInPosts(tags) {
  const totalArray = tags
    .map(({ node }) =>
      node.frontmatter.tags.map((tag) => {
        const { matchingTag } = findTagInfo(tag);
        return matchingTag;
      })
    )
    .flat();

  const sortedTags = count(totalArray);

  return { totalArray, sortedTags };
}
