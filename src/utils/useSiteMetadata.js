import { useStaticQuery, graphql } from 'gatsby';

export const useSiteMetadata = () => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
            twitterUsername
            image
          }
        }
      }
    `
  );
  return siteMetadata;
};
