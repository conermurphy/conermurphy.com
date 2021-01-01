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

function count(arr) {
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
  // Get the total array of tags used from the arrayTotaler function above.
  const { totalTagArray } = arrayTotaler(type, arr);

  // Run each tag in the total array through the findTagInfo function to see if we have a matching tag
  const matchedTagArray = totalTagArray
    .map((tag) => {
      const { matchingTag } = findTagInfo(tag);
      return matchingTag;
    })
    .flat();

  const sortedTags = count(matchedTagArray);

  return { totalTagArray, sortedTags };
}
