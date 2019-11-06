import React from "react"
import Layout from "../components/layout"
import {data, useStaticQuery} from 'gatsby'
import pageStyles from '../styles/pageStyles.module.css'

const Index = () => {
  const data = useStaticQuery(
    graphql`
    query {
      writing: allMarkdownRemark(limit: 4, sort: {order: DESC, fields: frontmatter___date}, filter: {fileAbsolutePath: {regex: "/(posts)/.*\\\\.md$/"}}) {
        edges {
          node {
            id
            frontmatter {
              date(formatString: "DD/MM/YY")
              title
              description
              id
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
    <div className={pageStyles.pageContainer}>
      <Layout>
        <div>
          <h1>Hello World!</h1>
        </div>
      </Layout>
    </div>
    
  )
}

export default Index