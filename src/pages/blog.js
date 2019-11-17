import React from "react"
import SEO from '../components/seo'
import Layout from "../components/layout"
import BlogPost from "../components/blogPost"
import { Link, graphql, useStaticQuery } from "gatsby"
import styled from 'styled-components'

const BlogContainerOuter = styled.div`
    display: flex;
    flex-direction: column; 

    & > a {
      color: black;
      transition: 0.5s;
    };

    & > a:hover {
      transform: scale(1.1,1.1);
    };
`

export default () => {
  const data = useStaticQuery(
    graphql`
    query {
      writing: allMarkdownRemark(sort: {order: DESC, fields: frontmatter___date}, filter: {fileAbsolutePath: {regex: "/(posts)/.*\\\\.md$/"}}) {
        edges {
          node {
            id
            frontmatter {
              date(formatString: "DDMMYYYY")
              title
              description
              id
              authorid
              languages
              category
              tags
            }
            fields {
              slug
            }
            excerpt
            timeToRead
          }
        }
      }
    }
    `
  )
    return (
        <Layout>
          <SEO title="Coner Murphy | Blog"/>
            <main id="blog">
              <h2>BLOG</h2>
              <p>Everything Web Related and a bit more...</p>
              <BlogContainerOuter>
                {data.writing.edges.map(({ node }) => (
                  <Link to={node.fields.slug} style={{textDecoration:`none`}} key={node.id}>
                    <BlogPost id={node.frontmatter.id} category={node.frontmatter.category} languages={node.frontmatter.languages} title={node.frontmatter.title} description={node.frontmatter.description} date={node.frontmatter.date}/> 
                  </Link>
                ))}
              </BlogContainerOuter>
          </main>
        </Layout>
    )
}