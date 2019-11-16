import React from "react"
import Layout from "../components/layout"
import InstaFeed from "../components/instaFeed.js"
import BlogPost from "../components/blogPost.js"
import ContactLinks from "../components/contactLinks"
import { device } from '../components/device'
import {Link, useStaticQuery, graphql} from 'gatsby'
import { FaBookmark} from "react-icons/fa"
import styled from 'styled-components'

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const SectionTitle = styled.h2`
  border-top: 3px solid #1f2a51;
  width: fit-content;
`

const SectionContainer = styled.section`
    margin-top: 3rem;
    display: flex;
    flex-direction: column;

    @media ${device.mobileL} {
      margin-top: 0rem;
    }

`

const BlogContainerOuter = styled.div`
    display: flex;
    flex-direction: column; 

    & > a {
      color: black;
      transition: 0.5s;
    }

    & > a:hover {
      transform: scale(1.1,1.1);
    }
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
      <Layout>
        <SectionContainer id="home" style={{marginTop:`0rem`}}>
          <h1>CONER MURPHY</h1>
          <p>Some amazing text that is all about me, what I aim to do and how this website will change the world</p>
        </SectionContainer>

        <SectionContainer id="blog">
          <SectionTitle>BLOG</SectionTitle>
          <p>Everything Web Related and a bit more...</p>
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

        <SectionContainer id="work">
          <SectionTitle>WORK</SectionTitle>
          <p>Some of the stuff I've been working on.</p>
          <InstaFeed/>
        </SectionContainer>

        <SectionContainer id="contact"> 
          <SectionTitle>CONTACT</SectionTitle>
          <p>This is a mock description which needs to be filled by an actual description at some point.</p>
          <ContactLinks/>
        </SectionContainer>

      </Layout>
    </PageContainer>
    
  )
}

export default Index