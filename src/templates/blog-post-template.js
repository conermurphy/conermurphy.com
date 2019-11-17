import React from "react"
import { graphql } from "gatsby"
import Img from 'gatsby-image'
import Layout from '../components/layout'
import ShareMenu from '../components/shareMenu'
import AuthorCard from '../components/authorCard'
import {FaArrowLeft} from 'react-icons/fa';
import styled from 'styled-components'
import { device } from '../components/device'

const AboutArticle = styled.div`
    display: flex;
    flex-direction: column;
`

const AboutTitle = styled.h4`
    padding: 1rem 0;
    border-bottom: 3px solid #1f2a51;

    @media ${device.tablet} {
      margin-top: 0rem;
    };
`

const AboutSubTitle = styled.h5`
    margin-bottom: 0;
`

const EOA = styled.hr `
    border: 2px dashed #1f2a51;
    width: 20%;
    margin: 1rem auto;
`

const BlogPostIDCategoryContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: 1px solid #1f2a51;
`

const BlogPostInfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    & > * {
        margin-bottom: 0;
    };

    @media ${device.tablet} {
        flex-direction: column;
        align-items: flex-start;
    };
`

const BlogPostID = styled.h4`
    width: 1.5rem;
    background-color: #1f2a51;
    padding: 0.5rem;
    text-align: center;
    color: white;
    margin-bottom: 0rem;
    line-height: 1.5rem;
`

const BlogPostCategory = styled.h4`
    background-color: white;
    color: #1f2a51;
    width: fit-content;
    padding: .5rem;
    max-height: 1.5rem;  
    margin-bottom: 0rem;
    line-height: 1.5rem;
`

const BlogPostLanguagesContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;

`
const BlogPostLanguageContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #1f2a51;
    padding: 0.5rem;
    width: fit-content;
    margin-left: 1rem;
    margin-top: 1rem;

    :first-child {
      margin-left: 0rem;
    };
`

const BlogPostLanguage = styled.h4`
    color: white;
    margin-bottom: 0rem;
`

const Container = styled.div`
  word-break: break-word;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 2rem;
  margin-top: -5rem;
  flex-wrap: wrap;
  padding: 0rem;
  padding-top 2rem;

  @media ${device.laptop} {
    margin-top: 0rem;
  };

  @media ${device.tablet} {
    margin-top: 0rem;
  };
`

const Content = styled.div`

  & > .gatsby-resp-image-wrapper {
    margin-bottom: 5rem;
    word-break: break-word;
  };

  & > h3 {
    border-top: 5px solid #999999;
    padding: 1rem 0;
    border-bottom: 5px solid #999999;
  };

  & > h4, h5 {
    border-bottom: 2px solid #333333;
    width: fit-content;
    margin-top: 1.5rem;
  };
`

const BackArrow = styled.div`
  text-align: center;
  position: fixed;
  left: 20%;
  z-index: 2;
  top: 12%;
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #1f2a51;
  color: #1f2a51;
  background-color: white;

  & > button {
    -webkit-appearance: none;
    background-color: white;
    transition: 0.2s;
    width: 3.5rem;
    height: 3.5rem;
    border: none;
  };

  & > button:hover {
    background-color: #1f2a51;
    color: white;
  };

  @media ${device.laptop} {
    left: 90%;
    margin: 0rem;
    top: 12%;
  };

  @media ${device.tablet} {
    display: none;
  };
`

const BlogPostDateContainer = styled.div`
  position: fixed;
  top: 4%;
  left: 20%;
  word-break: break-all;
  background-color: #1f2a51;
  color: white;
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #1f2a51;

  @media ${device.laptop} {
    left: 90%;
  };

  @media ${device.tablet} {
    display: none;
  };
`

const BlogPostDate = styled.h4`
  margin: 0.5rem;
    text-align: center;
    font-size: 1rem;
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
  
  if (typeof window !== 'undefined') {

    if (window.innerWidth > device.mobileL) {
      return (

        <Layout>
            <BlogPostDateContainer>  
              <BlogPostDate>{data.markdownRemark.frontmatter.date}</BlogPostDate>
            </BlogPostDateContainer>
            <BackArrow><button onClick={() => window.history.back()}><FaArrowLeft/></button></BackArrow>
            <ShareMenu/>
            <Container>
              <Img style={{width:`100%`, borderRadius:`2rem`, marginBottom:`2rem`}} fluid={data.markdownRemark.frontmatter.featuredImage.childImageSharp.fluid}/> 
              <AuthorCard id={data.markdownRemark.frontmatter.authorid}/>
              <BlogPostInfoContainer>
                  <BlogPostIDCategoryContainer>
                    <BlogPostID>#{data.markdownRemark.frontmatter.id}</BlogPostID>
                    <BlogPostCategory>{data.markdownRemark.frontmatter.category}</BlogPostCategory>
                  </BlogPostIDCategoryContainer>
                  <BlogPostLanguagesContainer>
                    {data.markdownRemark.frontmatter.languages.map( lan => 
                      <BlogPostLanguageContainer>
                        <BlogPostLanguage key={lan}>{lan}</BlogPostLanguage>
                      </BlogPostLanguageContainer>
                    )}
                  </BlogPostLanguagesContainer>
                  
                </BlogPostInfoContainer>

              <Content dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}/>
            </Container>
        </Layout>
  )
      
    } else {

      return (

        <Layout>
            <BlogPostDateContainer>  
              <BlogPostDate>{data.markdownRemark.frontmatter.date}</BlogPostDate>
            </BlogPostDateContainer>
            <BackArrow><button onClick={() => window.history.back()}><FaArrowLeft/></button></BackArrow>
            <ShareMenu/>
            <Container>
              <Img style={{width:`100%`, borderRadius:`2rem`, marginBottom:`2rem`}} fluid={data.markdownRemark.frontmatter.featuredImage.childImageSharp.fluid}/> 
              <AuthorCard id={data.markdownRemark.frontmatter.authorid}/>
              <BlogPostInfoContainer>
                  <BlogPostIDCategoryContainer>
                    <BlogPostID>#{data.markdownRemark.frontmatter.id}</BlogPostID>
                    <BlogPostCategory>{data.markdownRemark.frontmatter.category}</BlogPostCategory>
                  </BlogPostIDCategoryContainer>
                </BlogPostInfoContainer>

              <Content dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}/>
              <EOA/>
              <AboutArticle>
                <AboutTitle>ABOUT THIS ARTICLE</AboutTitle>
                <AboutSubTitle>LANGUAGES:</AboutSubTitle>
                <BlogPostLanguagesContainer>
                  {data.markdownRemark.frontmatter.languages.map( lan => 
                    <BlogPostLanguageContainer>
                      <BlogPostLanguage key={lan}>{lan}</BlogPostLanguage>
                    </BlogPostLanguageContainer>
                  )}
                </BlogPostLanguagesContainer>
              </AboutArticle>
            </Container>
        </Layout>
  )

    }
  } else {
    return(
      null
    )
  }
}

