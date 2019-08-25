import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Header from "../components/header"
import Footer from "../components/footer"
import layoutStyles from "../components/layout.module.css"
import Img from 'gatsby-image'
import { Helmet } from "react-helmet"

export default () => {
    const data = useStaticQuery(
        graphql`
        query {
            projects: allMarkdownRemark(sort: {order: DESC, fields: frontmatter___date}, filter: {fileAbsolutePath: {regex: "/(projects)/.*\\\\.md$/"}}) {
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
                { name: 'description', content: "All of my projects, I have completed in the past. I'm constantly working to improve some I'd love to hear your thoughts on my work." },
                { name: 'keywords', content: 'Web Development, Data, Blogging' },
              ]}>
                <html lang="en" />
                <meta charSet="utf-8" />
                <link rel="canonical" href="https://conermurphy.com" />
            </Helmet>
            <Header/>
            <div className={layoutStyles.projectContainer} id={'projects'}> {/*start of projects section of page*/}
              <div className={layoutStyles.projectHeader}>
                <h2 className={layoutStyles.projectHeadTitle}>Projects</h2>         
                <h4 className={layoutStyles.projectHeadSubTitle}>Some of my most recent projects.</h4>
                <hr className={layoutStyles.hr}/>
              </div>

              <div className={layoutStyles.projectBox}>
                  

                  {data.projects.edges.map(({ node }) => (
                    <div className={layoutStyles.projectBoxSlave} key={node.id}>
                    
                   
                    <Link to={node.fields.slug} style={{textDecoration: `none`, color: `inherit`, backgroundImage: `none`}}>
                      <div className={layoutStyles.projectImage}>
                          <Img fixed={node.frontmatter.thumbnail.childImageSharp.fixed}/>
                      </div>
                    <div className={layoutStyles.projectBody}>
                        <div className={layoutStyles.projectID}><h4>Project: #{node.frontmatter.id}</h4></div>
                        <div className={layoutStyles.projectTitle}><h3>{node.frontmatter.title}</h3></div>
                    </div>     
                    <div className={layoutStyles.projectBottom}>
                          <div className={layoutStyles.projectDate}><p>{node.frontmatter.date}</p></div>
                          <div className={layoutStyles.projectTime}><p>{node.timeToRead} mins read</p></div>
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