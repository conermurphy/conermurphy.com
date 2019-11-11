import React from "react"
import { graphql } from "gatsby"
import Img from 'gatsby-image'
import Layout from '../components/layout'
import ShareMenu from '../components/shareMenu'
import blogPostStyles from "../styles/blogPostStyles.module.css"
import pageStyles from "../styles/pageStyles.module.css"
import {FaArrowLeft} from 'react-icons/fa';

export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        category
        date(formatString: "DDMMYYYY")
        tags
        id
        languages
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

export default ({ data }) => {
  
    return (

        <Layout>
            <div className={blogPostStyles.blogPostDateContainer}>  
              <h4 className={blogPostStyles.blogPostDate}>{data.markdownRemark.frontmatter.date}</h4>
            </div>
            <div className={blogPostStyles.backarrow}><button onClick={() => window.history.back()}><FaArrowLeft/></button></div>
            <ShareMenu/>
            <div className={blogPostStyles.container}>
              <Img style={{width:`100%`, borderRadius:`2rem`, marginBottom:`2rem`}} fluid={data.markdownRemark.frontmatter.featuredImage.childImageSharp.fluid}/> 
              <div className={pageStyles.blogPostIDCategoryContainer}>
                <h4 className={pageStyles.blogPostID}>#{data.markdownRemark.frontmatter.id}</h4>
                <h4 className={pageStyles.blogPostCategory}>{data.markdownRemark.frontmatter.category}</h4>

                {data.markdownRemark.frontmatter.languages.map( lan => 
                    <h4 className={pageStyles.blogPostLanguages} key={lan}>{lan}</h4>
                )}

              </div>
              <div className={blogPostStyles.content} dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}/>
            </div>
        </Layout>
  )
}

