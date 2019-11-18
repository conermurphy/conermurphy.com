import React from "react"
import Layout from "../components/layout"
import InstaFeed from "../components/instaFeed.js"
import BlogPost from "../components/blogPost.js"
import ContactLinks from "../components/contactLinks"
import { device } from '../components/device'
import SEO from "../components/seo"
import {Link, useStaticQuery, graphql} from 'gatsby'
import { FaBookmark, FaInstagram, FaCoffee, FaGlobeEurope, FaGamepad} from "react-icons/fa"
import styled from 'styled-components'

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const SiteTitle = styled.h1`
  margin-bottom: 0rem;
`

const AboutMe = styled.p`
  & > span {
    display: block;
    margin-bottom: 0.8rem;
  };

  & svg {
    width: 1.5rem;
    height: 1.5rem;
    transition: 0.25s;
    padding: 0rem 0.25rem;
    top: 0.2rem;
    position: relative;

    :hover {
      transform: scale(1.25,1.25);
      color: #1f2a51;
    }
  };
`

const SectionTitle = styled.h2`
  border-top: 3px solid #1f2a51;
  width: fit-content;
  margin-bottom: 0.5rem;

  @media ${device.tablet} {
    margin-top: 1rem;
  };
`

const SectionContainer = styled.section`
    margin-top: 2rem;
    display: flex;
    flex-direction: column;

`

const BlogContainerOuter = styled.div`
    display: flex;
    flex-direction: column; 

    & > a {
      color: black;
      transition: 0.5s;
    };

    & a:hover {
      transform: scale(1.1,1.1);
    };

    @media ${device.laptop} {
      & a:hover {
        transform: scale(1.025,1.025);
      };
    };
`

const Index = () => {
  const data = useStaticQuery(
    graphql`
    query {
      writing: allMarkdownRemark(limit: 2, sort: {order: DESC, fields: frontmatter___date}, filter: {fileAbsolutePath: {regex: "/(posts)/.*\\\\.md$/"}}) {
        edges {
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
      allFile(filter: {extension: {regex: "/(jpg)/"}}) {
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
  )

  return (
    <PageContainer>
      <SEO title="Coner Murphy"/>
      <Layout>
        <SectionContainer id="home" style={{marginTop:0}}>
          <SiteTitle>CONER MURPHY</SiteTitle>
          <h2>FRONT-END WEB DEVELOPER</h2>
          <AboutMe>
            <span>Hi, I'm Coner a Front-End Web Developer from the United Kingdom. I specialise in building fast, responsive, and beautiful websites.</span>
            <span>When I'm not building websites, I help others improve their web development skills and knowledge on my <Link to="/blog">Blog</Link> and<a aria-label="Instagram Profile" href="https://www.instagram.com/conermurphy/" target="_blank" rel="noopener noreferrer"><FaInstagram aria-label="Instagram"/></a>.</span>
            <span>And, if I'm not doing either of those things, I'm probably drinking <FaCoffee aria-label="Coffee"/>, exploring the <FaGlobeEurope aria-label="Globe showing Europe"/> or just chilling out. <FaGamepad aria-label="Game Controller"/></span>
            <span>If you're interested in finding out more or are just curious, below is the latest from my <a aria-label="Instagram Profile" href="https://www.instagram.com/conermurphy/" target="_blank" rel="noopener noreferrer"><FaInstagram aria-label="Instagram"/></a> and if you have an idea you want to work with me on, please <Link to="/#contact">contact me.</Link></span>
          </AboutMe>
          <InstaFeed/>
        </SectionContainer>

        <SectionContainer id="blog">
          <SectionTitle>BLOG</SectionTitle>
          <p>Everything Front-End related. HTML, CSS, JS and more. If you see something interesting or want to request a topic, please <Link to="/#contact">contact me.</Link></p>
          <BlogContainerOuter>

            {data.writing.edges.map(({ node }) => (
              <Link to={node.fields.slug} style={{textDecoration:`none`}} key={node.id}>
                <BlogPost id={node.frontmatter.id} category={node.frontmatter.category} languages={node.frontmatter.languages} title={node.frontmatter.title} description={node.frontmatter.description} date={node.frontmatter.date}/>
              </Link>
            ))}

            <Link to='/blog' style={{textDecoration:`none`}}>
              <BlogPost id={null} category={"View More"} languages={null} title={"View More Blog Posts..."} description={"If you like some of the posts you've seen above, you can see all of the posts I've written by clicking here."} date={<FaBookmark/>}/>
              </Link>
          </BlogContainerOuter>
        </SectionContainer>

        <SectionContainer id="contact"> 
          <SectionTitle>CONTACT</SectionTitle>
          <p>Have a question you're itching to ask? Want to work on a project together? Or, just want to chat this is how to do it.</p>
          <ContactLinks/>
        </SectionContainer>

      </Layout>
    </PageContainer>
    
  )
}

export default Index