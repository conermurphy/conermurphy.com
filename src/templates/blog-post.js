import React from "react"
import { graphql } from "gatsby"
import blogPostStyles from "../styles/blogPost.module.css"
import {FaArrowLeft} from 'react-icons/fa';


export default ({ data }) => {
    const post = data.markdownRemark;
    return (
         <div className={blogPostStyles.all}>

            
            <div className={blogPostStyles.container}> 
              <div className={blogPostStyles.backarrow}><button onClick={() => window.history.back()}><FaArrowLeft/><h5> Back to Main Page.</h5></button></div>
              <div className={blogPostStyles.content} dangerouslySetInnerHTML={{ __html: post.html }}/>
              <div className={blogPostStyles.backarrow}><button onClick={() => window.history.back()}><FaArrowLeft/><h5> Back to Main Page.</h5></button></div>
            </div>

        </div>
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