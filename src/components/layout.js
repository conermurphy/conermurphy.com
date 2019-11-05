//Importing dependcies from other sources to be worked with.
import React from 'react'
import { Link, graphql, useStaticQuery } from "gatsby" 
import layoutStyles from "./layout.module.css"
// import Img from 'gatsby-image';
import SEO from './seo';
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
          <div>
            <SEO title="Coner Murphy"/>

            {/*start of home section of page*/}
            <div className={layoutStyles.home} id={"contact"} > 
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
            {/* End of the home section */}

            {/* Beginning of About Section */}
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
            {/* End of the about section */}
            
            {/*start of writing section of page*/}
            </div>
            <div className={layoutStyles.writingContainer} id={'blog'}> 
              <div className={layoutStyles.writingHeader}>
              <h2 className={layoutStyles.writingHeadTitle}>Writing</h2>            
              <h4 className={layoutStyles.writingHeadSubTitle}>Some of my most recent blog posts.</h4>
              <hr className={layoutStyles.hr}/>
              </div>

                  <div className={layoutStyles.writingBox}>

                    {data.writing.edges.map(({ node }) => (
                      <div className={layoutStyles.writingBoxSlave} key={node.id}>

                        <Link to={node.fields.slug} style={{textDecoration: `none`, color: `inherit`, backgroundImage: `none`}}>
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
        </div>
    )
}

