import React, { useEffect } from 'react';
import { MdPersonPin, MdLocationOn, MdLanguage, MdContacts } from 'react-icons/md';
import { graphql, Link } from 'gatsby';
import { tsParticles } from 'tsparticles';
import { ContentSection, HeroBackground, InfoBlock, LandingSection } from '../styles/HomeStyles';
import particlesJson from '../assets/particles';
import EmailSignupForm from '../components/emailSignupForm';
import useNavTheme from '../utils/useNavTheme';
import BlogPostCard from '../components/BlogPostCard';

export default function HomePage({ data }) {
  const { blog } = data;

  // Setting the nav theme for this page
  useNavTheme('light');

  // Useeffect to load in the TSparticles background on load.
  useEffect(() => {
    tsParticles.load('particlesBackground', particlesJson);
  }, []);

  return (
    <>
      <HeroBackground id="particlesBackground" />
      <LandingSection>
        <div className="contactBlock">
          <h1>
            Hey, <span>I'm Coner.</span>
          </h1>
          <div>
            <p>
              I'm a Web Developer and on a journey to be the best developer I can and along the way I want to help others grow by sharing my
              lessons.
            </p>
            <p>If this sounds cool to you, then please stick around and consider signing up to my newsletter below! </p>
          </div>
        </div>
        <InfoBlock>
          <div className="aboutMe">
            <h3>About Me</h3>
          </div>
          {/* <img src="" alt="Selfie" /> */}
          <ul>
            <li>
              Coner Murphy <MdPersonPin />
            </li>

            <li>
              Norwich, United Kingdom <MdLocationOn />
            </li>
            <li>
              {/* TODO: Come back and add in a map for each language in a sub list */}
              Languages <MdLanguage />
            </li>
            <li>
              {/* TODO: Come back and add in a list of contact methods with links */}
              Social Media <MdContacts />
            </li>
          </ul>
        </InfoBlock>
      </LandingSection>
      <EmailSignupForm />
      <ContentSection>
        <div className="headerTitleSeperator">
          <h3>Blog</h3>
          <Link to="/blog">View All</Link>
        </div>
        <div className="content">
          {blog.edges.map((post) => (
            <BlogPostCard key={`HomeBlogPostCard-${post.node.frontmatter.id}`} post={post} />
          ))}
        </div>
      </ContentSection>
      <ContentSection>
        <div className="headerTitleSeperator">
          <h3>Notes</h3>
          <Link to="/notes">View All</Link>
        </div>
        <div className="content">{/* TODO: Add in Blog Posts and create custom template for them */}</div>
      </ContentSection>
      <ContentSection>
        <div className="headerTitleSeperator">
          <h3>Portfolio</h3>
          <Link to="/portfolio">View All</Link>
        </div>
        <div className="content">{/* TODO: Add in Blog Posts and create custom template for them */}</div>
      </ContentSection>
      <ContentSection>
        <div className="headerTitleSeperator">
          <h3>testimonials</h3>
        </div>
        <div className="content">{/* TODO: Add in Blog Posts and create custom template for them */}</div>
      </ContentSection>
    </>
  );
}

export const query = graphql`
  query HomePageContentQuery {
    blog: allMdx(sort: { order: DESC, fields: frontmatter___date }, filter: { fields: { contentCategory: { eq: "blog" } } }, limit: 3) {
      edges {
        node {
          frontmatter {
            date(formatString: "DD/MM/YYYY")
            slug
            tags
            title
            id
            image {
              childImageSharp {
                fluid(maxWidth: 400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
