import findTagInfo from './findTagInfo';

export function arrayTotaler(type, arr) {
  let totalTagArray;
  if (type === 'notes') {
    totalTagArray = arr[type].edges.map(({ node }) => node.fields.noteCategory).flat();
  } else if (type === 'blog') {
    totalTagArray = arr[type].edges.map(({ node }) => node.frontmatter.tags).flat();
  }

  const uniqueArray = totalTagArray.filter((val, i, self) => self.indexOf(val) === i);

  return { uniqueArray, totalTagArray };
}

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

export default function countTags(type, arr) {
  // Set the total array variable depending on the page is being rendered.
  const { totalTagArray } = arrayTotaler(type, arr);

  const totalArray = totalTagArray
    .map((tag) => {
      const { matchingTag } = findTagInfo(tag);
      return matchingTag;
    })
    .flat();

  const sortedTags = count(totalArray);

  return { totalTagArray, sortedTags };
}
