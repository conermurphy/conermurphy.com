//Importing dependcies from other sources to be worked with.
import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby" 
import { Helmet } from "react-helmet"
import layoutStyles from "./layout.module.css"
import Header from "./header"
import Footer from "./footer"
import Img from 'gatsby-image';
import {FaTwitter} from 'react-icons/fa';
import {FaInstagram} from 'react-icons/fa';
import {FaEnvelope} from 'react-icons/fa';
import {FaMediumM} from 'react-icons/fa';
import {FaGithub} from 'react-icons/fa';

if (typeof window !== "undefined") {
  // eslint-disable-next-line global-require
  require("smooth-scroll")('a[href*="#"]')
}

// What is rendered to the page
export default () => {
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
      projects: allMarkdownRemark(limit: 3, sort: {order: DESC, fields: frontmatter___date}, filter: {fileAbsolutePath: {regex: "/(projects)/.*\\\\.md$/"}}) {
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
          <div className={layoutStyles.pageContainer}> {/*container for whole page*/}
            <Helmet
              title="Coner Murphy"
              meta={[
                { name: 'description', content: 'Self taught web-develop sharing his work while blogging about all things web and data related. I also love coffee...' },
                { name: 'keywords', content: 'Web Development, Data, Blogging' },
              ]}>
                <html lang="en" />
                <meta charSet="utf-8" />
                <link rel="canonical" href="https://conermurphy.com" />
            </Helmet>
            <Header/>
            <div className={layoutStyles.home} id={"contact"} > {/*start of home section of page*/}
              <div className={layoutStyles.homeTitle}>
                <h1>Hi, I'm Coner Murphy</h1>
                <div className={layoutStyles.homeRW}>
                  <span>Writer</span>
                  <span>Web Designer</span>
                  <span>Digital Marketer</span>
                  <span>Data Nerd</span>
                  <span>Coffee Fanatic</span>
                </div>
              </div>
              <div className={layoutStyles.homeSocialBoxContainer}>
                <div className={layoutStyles.homeSocialBox}><a href="https://twitter.com/ConerMMurphy" aria-label="Twitter" target="_blank" rel="noopener noreferrer"> <FaTwitter/></a></div>
                <div className={layoutStyles.homeSocialBox}><a href="https://www.instagram.com/conermurphy/" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><FaInstagram/></a></div>
                <div className={layoutStyles.homeSocialBox}><a href="https://conermurphy.typeform.com/to/CUZ4g6" aria-label="Email" target="_blank" rel="noopener noreferrer"><FaEnvelope/></a></div>
                <div className={layoutStyles.homeSocialBox}><a href="https://medium.com/@conermurphy" aria-label="Medium" target="_blank" rel="noopener noreferrer"><FaMediumM/></a></div>
                <div className={layoutStyles.homeSocialBox}><a href="https://github.com/conermurphy" aria-label="Github" target="_blank" rel="noopener noreferrer"><FaGithub/></a></div>
              </div>
            </div> 
            <div className={layoutStyles.aboutContainer} id ={"about"}>
              <h2 className={layoutStyles.aboutTitle}>About Me</h2>
              <h4 className={layoutStyles.aboutSubTitle}>A little bit about me.</h4>
              <hr className={layoutStyles.hr}/>
              <div className={layoutStyles.aboutBody}>
                <div className={layoutStyles.aboutBodyText}>
                    <p>Hailing from Norwich, I’m a self taught web-developer on a journey to refine my craft, learn new things and improve my skills.</p>

                    <ul><li>I’m constantly learning new things and pushing myself further using new technologies and languages with the eventual goal of helping grow open-source projects.</li>
                    <li>Once a week I release a post here on my website, followed by Medium covering a range of topics that I could be beneficial to others.</li>
                    <li>I am still quite new to web development so if you see something I could improve on, please get in touch, I’d love to discuss with you.</li></ul>

                    <p>Outside of web development, you can find me writing about Personal Development, training for my upcoming half marathon or chilling out playing video games.</p>
                    
                    <p>Have an exciting idea you want to work with me on, please get in touch I’d love to hear from you.</p>

                </div>
                <div className={layoutStyles.profileImage}></div>
              </div>
            </div>
            <div className={layoutStyles.projectContainer} id={'projects'}> {/*start of projects section of page*/}
              <div className={layoutStyles.projectHeader}>
                <h2 className={layoutStyles.projectHeadTitle}>Projects</h2>         
                <h4 className={layoutStyles.projectHeadSubTitle}>Some of my most recent projects.</h4>
                <hr className={layoutStyles.hr}/>
              </div>

              {/* START OF QUERY PROJECT BOX GENERATION */}
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
                {/* END OF QUERY PROJECT BOX GENERATION */}
                {/* START OF VIEW MORE PROJECT BOX */}
                <div className={layoutStyles.viewMoreBox}>
                                     
                    <Link to={"/projects"} style={{textDecoration: `none`, color: `inherit`, backgroundImage: `none`}}>
                    <div className={layoutStyles.viewMoreBody}>
                        <div className={layoutStyles.viewMoreTitle}><h4>Click Here To View More Projects.</h4></div>
                    </div>     
                    </Link>  
                      
                </div>
                 {/* END OF VIEW MORE PROJECT BOX */}

            </div>
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
                  {/* START OF VIEW MORE WRITING BOX */}
                <div className={layoutStyles.viewMoreBox}>
                                     
                    <Link to={"/writing"} style={{textDecoration: `none`, color: `inherit`, backgroundImage: `none`}}>
                    <div className={layoutStyles.viewMoreBody}>
                        <div className={layoutStyles.viewMoreTitle}><h4>Click Here To View More Posts.</h4></div>
                    </div>     
                    </Link>  
                      
                </div>
                 {/* END OF VIEW MORE WRITING BOX */}
            </div>
            <Footer/>
        </div>
    )
}

