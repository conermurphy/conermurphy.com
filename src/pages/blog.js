import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Img from 'gatsby-image';
import SEO from '../components/seo'
import blogStyles from '../styles/blogStyles.module.css'

export default () => {
  const data = useStaticQuery(
    graphql`
    query {
      writing: allMarkdownRemark(sort: {order: DESC, fields: frontmatter___date}, filter: {fileAbsolutePath: {regex: "/(posts)/.*\\\\.md$/"}}) {
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
    }
    `
  )
    return (
        <div className={blogStyles.container}>
          <SEO title="Coner Murphy"/>

            
        </div>
    )
}