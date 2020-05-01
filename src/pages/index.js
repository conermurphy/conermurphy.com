import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { FaBookmark, FaInstagram, FaCoffee, FaGlobeEurope, FaGamepad } from 'react-icons/fa';
import styled from 'styled-components';
import Layout from '../components/layout';
import SEO from '../components/seo';

const Index = () => {
  const data = useStaticQuery(
    graphql`
      query {
        writing: allMarkdownRemark(
          limit: 2
          sort: { order: DESC, fields: frontmatter___date }
          filter: { fileAbsolutePath: { regex: "/(posts)/.*\\\\.md$/" } }
        ) {
          edges {
            u
            node {
              id
              frontmatter {
                date(formatString: "DDMMYYYY")
                title
                description
                id
                authorid
                category
                tags
                languages
              }
              fields {
                slug
              }
              excerpt
              timeToRead
            }
          }
        }
        site {
          siteMetadata {
            title
          }
        }
        allFile(filter: { extension: { regex: "/(jpg)/" } }) {
          edges {
            node {
              name
              relativeDirectory
              id
            }
          }
        }
      }
    `
  );

  return (
    <div>
      <SEO title="Coner Murphy" />
      <Layout>
        <div id="home" style={{ marginTop: 0 }}>
          <h1>CONER MURPHY</h1>
          <h2>FRONT-END WEB DEVELOPER</h2>
          <div>
            <span>
              Hi, I'm Coner a Front-End Web Developer from the United Kingdom. I specialise in building fast, responsive, and beautiful
              websites.
            </span>
            <span>
              When I'm not building websites, I help others improve their web development skills and knowledge on my{' '}
              <Link to="/blog">Blog</Link> and
              <a aria-label="Instagram Profile" href="https://www.instagram.com/conermurphy/" target="_blank" rel="noopener noreferrer">
                <FaInstagram aria-label="Instagram" />
              </a>
              .
            </span>
            <span>
              And, if I'm not doing either of those things, I'm probably drinking <FaCoffee aria-label="Coffee" />, exploring the{' '}
              <FaGlobeEurope aria-label="Globe showing Europe" /> or just chilling out. <FaGamepad aria-label="Game Controller" />
            </span>
            <span>
              If you're interested in finding out more or are just curious, below is the latest from my{' '}
              <a aria-label="Instagram Profile" href="https://www.instagram.com/conermurphy/" target="_blank" rel="noopener noreferrer">
                <FaInstagram aria-label="Instagram" />
              </a>{' '}
              and if you have an idea you want to work with me on, please <Link to="/#contact">contact me.</Link>
            </span>
          </div>
        </div>

        <section id="blog">
          <h1>BLOG</h1>
          <p>
            Everything Front-End related. HTML, CSS, JS and more. If you see something interesting or want to request a topic, please{' '}
            <Link to="/#contact">contact me.</Link>
          </p>
          <div>
            {data.writing.edges.map(({ node }) => (
              <Link to={node.fields.slug} style={{ textDecoration: 'none' }} key={node.id}>
                <div
                  id={node.frontmatter.id}
                  category={node.frontmatter.category}
                  languages={node.frontmatter.languages}
                  title={node.frontmatter.title}
                  description={node.frontmatter.description}
                  date={node.frontmatter.date}
                />
              </Link>
            ))}

            <Link to="/blog" style={{ textDecoration: 'none' }}>
              <div
                id={null}
                category="View More"
                languages={null}
                title="View More Blog Posts..."
                description={"If you like some of the posts you've seen above, you can see all of the posts I've written by clicking here."}
                date={<FaBookmark />}
              />
            </Link>
          </div>
        </section>

        <div id="contact">
          <div>CONTACT</div>
          <p>Have a question you're itching to ask? Want to work on a project together? Or, just want to chat this is how to do it.</p>
        </div>
      </Layout>
    </div>
  );
};

export default Index;
