import blogSeries from '../data/blogSeries.json';

export default function findBlogSeries(series) {
  if (series === '') {
    return 'Other';
  }

  const matchingSeriesIndex = Object.keys(blogSeries).indexOf(series);

  const matchingSeries = Object.values(blogSeries)[matchingSeriesIndex];

  return matchingSeries;
}
