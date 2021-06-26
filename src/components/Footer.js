import React from 'react';
import styled from 'styled-components';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { EmailSignup } from './EmailSignup';
import ContactIcons from './ContactIcons';
import { HireMe } from './HireMe';
import { AuthorCard } from './Nav';
import { BlogPostCard } from './PostCards';

const FooterBody = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;
  width: 100vw;
  background-color: var(--secondaryBg);
  padding-top: 5rem;
`;

const FooterContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 2rem;
  width: clamp(300px, 90vw, var(--maxWidth));
  z-index: 100;

  .info {
    display: flex;
    flex-direction: column;
    width: clamp(300px, 80vw, 400px);
    margin-bottom: 0;

    h3 {
      font-size: 2.5rem;
    }

    h4 {
      margin-top: 5rem;
      margin-bottom: 0.5rem;
      font-size: 2.25rem;
    }
  }
`;

const PostFooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 5rem;
  width: clamp(300px, 90vw, var(--maxWidth));
  z-index: 100;

  .pagesContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;

    & > h4 {
      margin: 0;
    }

      & > li > a {
        font-weight: 400;
      }
    }
  }

  & > .postFooter {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border-top: 1px solid rgba(50, 59, 73, 0.5);
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
        <p>
          I want to help your business grow by giving you a brand new website that your users will love to use. Are you ready to grow your
          business? If so, let's get a meeting in the diary and get started.
        </p>
        <HireMe available />
        <ContactIcons />
        <h4>Sign Up For My Newsletter:</h4>
        <p>I publish a weekly newsletter keeping you up-to-date with everything I'm currently working on.</p>
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
      <ul className="pagesContainer">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about-me">About Me</Link>
        </li>
        <li>
          <Link to="/blog">Blog</Link>
        </li>
        <li>
          <Link to="/threads">Threads</Link>
        </li>
        <li>
          <Link to="/projects">Projects</Link>
        </li>
        <li>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </li>
        <li>
          <Link to="/contact">Contact Me</Link>
        </li>
      </ul>
      <div className="postFooter">
        <p>&copy; Coner Murphy {new Date().getFullYear()}</p>
        <p className="credits">
          Icons Used : <a href="	https://fontawesome.com/">Font Awesome</a>,{' '}
          <a href="http://google.github.io/material-design-icons/">Material Design</a>,{' '}
          <a href="https://github.com/grommet/grommet-icons">Grommet-Icons</a> & <a href="https://ionicons.com/">Ionicons</a> from{' '}
          <a href="https://react-icons.github.io/react-icons">React Icons</a>
        </p>
      </div>
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
