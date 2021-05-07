import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import { EmailSignup } from './EmailSignup';
import ContactIcons from './ContactIcons';
import { HireMe } from './HireMe';
import { AuthorCard } from './Nav';
import { BlogPostCard } from './PostCards';

const FooterBody = styled.footer`
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-width: var(--maxWidth);
`;

const FooterContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin: 2rem;

  & > div {
    margin: 5rem 0;
  }

  .latestPost {
    & > h3 {
      margin-top: 0;
    }
  }

  .info {
    h3 {
      font-size: 2.5rem;
    }
  }
`;

const PostFooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 1rem;

  border-top: 1px solid rgba(50, 59, 73, 0.5);

  & * {
    font-size: 1.4rem;
  }
`;

function FooterContent() {
  const data = useStaticQuery(graphql`
    query {
      latestPost: allMdx(
        limit: 1
        sort: { fields: frontmatter___date, order: DESC }
        filter: { frontmatter: { published: { eq: true } } }
      ) {
        edges {
          node {
            frontmatter {
              date(formatString: "MMM Do YYYY")
              description
              title
              image {
                childImageSharp {
                  gatsbyImageData(layout: FULL_WIDTH)
                }
              }
            }
            fields {
              slug
            }
            excerpt
          }
        }
      }
    }
  `);

  return (
    <FooterContentContainer>
      <div className="info">
        <AuthorCard />
        <p>Some Random Text that I will need to populate with something at some point.</p>
        <HireMe available />
        <ContactIcons />
        <h4>Sign Up For My Newsletter:</h4>
        <EmailSignup />
      </div>
      <div className="latestPost">
        <h3>Latest Post:</h3>
        <BlogPostCard post={data.latestPost.edges[0].node} />
      </div>
    </FooterContentContainer>
  );
}

function PostFooter() {
  return (
    <PostFooterContainer>
      <p>&copy; Coner Murphy {new Date().getFullYear()}</p>
      <p className="credits">
        Icons Used : <a href="	https://fontawesome.com/">Font Awesome</a>,{' '}
        <a href="http://google.github.io/material-design-icons/">Material Design</a>,{' '}
        <a href="https://github.com/grommet/grommet-icons">Grommet-Icons</a> & <a href="https://ionicons.com/">Ionicons</a> from{' '}
        <a href="https://react-icons.github.io/react-icons">React Icons</a>
      </p>
    </PostFooterContainer>
  );
}

export function Footer() {
  return (
    <FooterBody>
      <FooterContent />
      <PostFooter />
    </FooterBody>
  );
}
