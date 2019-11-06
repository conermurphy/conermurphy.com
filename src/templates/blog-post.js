import React from "react"
import { graphql } from "gatsby"
import Layout from '../components/layout'
import blogPostStyles from "../styles/blogPost.module.css"
import {FaArrowLeft} from 'react-icons/fa';


export default ({ data }) => {
    const post = data.markdownRemark;
    return (

        <Layout>
            <div className={blogPostStyles.container}> 
              <div className={blogPostStyles.backarrow}><button onClick={() => window.history.back()}><FaArrowLeft/><p> Back to the blog.</p></button></div>
              <div className={blogPostStyles.content} dangerouslySetInnerHTML={{ __html: post.html }}/>
              <div className={blogPostStyles.backarrow}><button onClick={() => window.history.back()}><FaArrowLeft/><p> Back to the blog.</p></button></div>
            </div>
        </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        
      }
    }
  }
`