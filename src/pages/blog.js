import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import SEO from '../components/seo'
import pageStyles from '../styles/pageStyles.module.css'
import Layout from "../components/layout"

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
          <SEO title="Coner Murphy"/>
            <main id="blog" className={pageStyles.Container}>
              <h2>BLOG</h2>
              <p>Everything Web Related and a bit more...</p>
              <div className={pageStyles.blogContainerOuter}>
                {data.writing.edges.map(({ node }) => (
                  <Link to={node.fields.slug} style={{textDecoration:`none`}} key={node.id}>
                  <div className={pageStyles.blogPostContainer}>
                    <div className={pageStyles.blogPostLeftContainer}>
                      <div className={pageStyles.blogPostIDCategoryContainer}>
                        <h4 className={pageStyles.blogPostID}>#{node.frontmatter.id}</h4>
                        <h4 className={pageStyles.blogPostCategory}>{node.frontmatter.category}</h4>
                      </div>
                      <h3 className={pageStyles.blogPostTitle}>{node.frontmatter.title}</h3>
                      <p>{node.frontmatter.description}</p>  
                    </div>
                    <div className={pageStyles.blogPostRightContainer}>
                      <div className={pageStyles.blogPostDateContainer}>  
                        <h4 className={pageStyles.blogPostDate}>{node.frontmatter.date}</h4>
                      </div>
                    </div>
                  </div>
                  </Link>
                ))}
              </div>
          </main>
        </Layout>
    )
}