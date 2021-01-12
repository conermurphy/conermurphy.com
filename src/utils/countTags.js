import findTagInfo from './findTagInfo';

export function arrayTotaler(type, arr) {
  // Depending on the type of content passed in (blog or notes) then get the tags from the revelant place in the data and flatten them into one array.
  let totalTagArray;
  if (type === 'notes') {
    totalTagArray = arr.notes.edges.map(({ node }) => node.fields.noteCategory).flat();
  } else if (type === 'blog') {
    totalTagArray = arr.blog.edges.map(({ node }) => node.frontmatter.tags).flat();
  } else if (type === 'portfolio') {
    console.log(type);
    console.log(arr);
    totalTagArray = arr.portfolio.edges.map(({ node }) => node.tags).flat();
  } else if (type === 'reads') {
    totalTagArray = arr.reads.edges.map(({ node }) => node.items[0].volumeInfo.categories).flat();
  }

  // create a second array which is a unique version of the array.
  const uniqueArray = totalTagArray.filter((tag) => tag !== null).filter((val, i, self) => self.indexOf(val) === i);

  return { uniqueArray, totalTagArray };
}

function count(arr) {
  // Count the occurances of each tag in the array.
  const counts = arr.reduce((acc, tag) => {
    // See if the current tag is already in the array.
    const existingTag = acc[tag];
    if (existingTag) {
      // if the tag is present increments it's count by 1
      existingTag.count += 1;
    } else {
      // if the tag is not present then add it and set the count to 1
      acc[tag] = {
        tag,
        count: 1,
      };
    }
    return acc;
  }, {});

  // sort the counted object by the count property.
  const sortedTags = Object.values(counts).sort((a, b) => b.count - a.count);
  return sortedTags;
}

export default function countTags(type, arr) {
  // Get the total array of tags used from the arrayTotaler function above.
  const { totalTagArray } = arrayTotaler(type, arr);

  // Run each tag in the total array through the findTagInfo function to see if we have a matching tag, if we do have a matching tag then return it and flatten all into one array.
  const matchedTagArray = totalTagArray
    .map((tag) => {
      // If the call to the function comes from the reads page then return the tag without checking the tags file.
      if (type === 'reads') {
        return tag;
      }
      const { matchingTag } = findTagInfo(tag);
      return matchingTag;
    })
    .flat();

  // Count the occurances of each matched tag from above in the array to determine how many times that tag occurs in our dataset (how many posts have that tag). Then sort the array based on the number of occurances.
  const sortedTags = count(matchedTagArray);

  return { totalTagArray, sortedTags };
}
