import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Header from "../components/header"
import Footer from "../components/footer"
import layoutStyles from "../components/layout.module.css"
import Img from 'gatsby-image';
import { Helmet } from "react-helmet"

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
              thumbnail {
                childImageSharp {
                  id
                  fixed {
                    base64
                    width
                    height
                    src
                    srcSet
                  }
                }
              }
              subtitle
              id
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
        <div className={layoutStyles.container}>
          <Helmet
              title="Coner Murphy"
              meta={[
                { name: 'description', content: "This is where I share everything I've learnt so far in the world of web development, hopefully I can help people improve like others have with me." },
                { name: 'keywords', content: 'Web Development, Data, Blogging' },
              ]}>
                <html lang="en" />
                <meta charSet="utf-8" />
                <link rel="canonical" href="https://conermurphy.com" />
            </Helmet>
            <Header/>
            <div className={layoutStyles.writingContainer} id={'writing'}> {/*start of writing section of page*/}
              <div className={layoutStyles.writingHeader}>
              <h2 className={layoutStyles.writingHeadTitle}>Writing</h2>            
              <h4 className={layoutStyles.writingHeadSubTitle}>Some of my most recent blog posts.</h4>
              <hr className={layoutStyles.hr}/>
              </div>

                  <div className={layoutStyles.writingBox}>

                    {data.writing.edges.map(({ node }) => (
                      <div className={layoutStyles.writingBoxSlave} key={node.id}>

                        <Link to={node.fields.slug} style={{textDecoration: `none`, color: `inherit`, backgroundImage: `none`}}>
                        <div className={layoutStyles.writingImage}>
                          <Img fixed={node.frontmatter.thumbnail.childImageSharp.fixed}/>
                        </div>
                        <div className={layoutStyles.writingBody}>
                          <div className={layoutStyles.writingDateTTR}><p>Post: #{node.frontmatter.id} | {node.frontmatter.date} | {node.timeToRead} mins read</p></div>
                          <div className={layoutStyles.writingTitle}><h3>{node.frontmatter.title}</h3></div>
                        </div>
                        </Link>
                      </div>
                    ))}
                  </div>
            </div>
            <Footer/>
        </div>
    )
}