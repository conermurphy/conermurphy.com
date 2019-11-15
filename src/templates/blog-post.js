import React from "react"
import { graphql } from "gatsby"
import Img from 'gatsby-image'
import Layout from '../components/layout'
import ShareMenu from '../components/shareMenu'
import AuthorCard from '../components/authorCard'
import blogPostStyles from "../styles/blogPostStyles.module.css"
import {FaArrowLeft} from 'react-icons/fa';
import styled from 'styled-components'

const BlogPostIDCategoryContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    & > * {
        margin-bottom: 0;
    }
`

const BlogPostID = styled.h4`
    height: 1.5rem;
    width: 1.5rem;
    background-color: #1f2a51;
    padding: 0.5rem;
    text-align: center;
    color: white;
`

const BlogPostCategory = styled.h4`
    background-color: white;
    border: 1px solid #1f2a51;
    color: #1f2a51;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    padding: .5rem;
`

const BlogPostLanguages = styled.h4`
    background-color: #1f2a51;
    color: white;
    padding: 0.5rem;
    width: fit-content;
    height: 1.5rem;
    margin-left: 1rem;
`

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
        authorid
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
              <BlogPostIDCategoryContainer>
                <BlogPostID>#{data.markdownRemark.frontmatter.id}</BlogPostID>
                <BlogPostCategory>{data.markdownRemark.frontmatter.category}</BlogPostCategory>

                {data.markdownRemark.frontmatter.languages.map( lan => 
                    <BlogPostLanguages key={lan}>{lan}</BlogPostLanguages>
                )}

              </BlogPostIDCategoryContainer>
              <div className={blogPostStyles.content} dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}/>
            </div>
            <AuthorCard id={data.markdownRemark.frontmatter.authorid}/>
        </Layout>
  )
}

