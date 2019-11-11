import React from "react"
import Layout from "../components/layout"
import {Link, useStaticQuery, graphql} from 'gatsby'
import pageStyles from '../styles/pageStyles.module.css'
import { FaBookmark, FaInstagram, FaTwitter, FaGithub, FaEnvelope } from "react-icons/fa"

const Index = () => {
  const data = useStaticQuery(
    graphql`
    query {
      writing: allMarkdownRemark(limit: 2, sort: {order: DESC, fields: frontmatter___date}, filter: {fileAbsolutePath: {regex: "/(posts)/.*\\\\.md$/"}}) {
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
              languages
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
    <div className={pageStyles.pageContainer}>
      <Layout>
        <section id="home" className={pageStyles.Container}>
          <h1>CONER MURPHY</h1>
          <p>Some amazing text that is all about me, what I aim to do and how this website will change the world</p>
        </section>
        <section id="blog" className={pageStyles.Container}>
          <h2>BLOG</h2>
          <p>Everything Web Related and a bit more...</p>
          <div className={pageStyles.blogContainerOuter}>
            {data.writing.edges.map(({ node }) => (
              <Link to={node.fields.slug} style={{textDecoration:`none`}}>
              <div className={pageStyles.blogPostContainer} key={node.id}>
                <div className={pageStyles.blogPostLeftContainer}>
                  <div className={pageStyles.blogPostIDCategoryContainer}>
                    <h4 className={pageStyles.blogPostID}>#{node.frontmatter.id}</h4>
                    <h4 className={pageStyles.blogPostCategory}>{node.frontmatter.category}</h4>

                      {node.frontmatter.languages.map( lan => 
                          // <h4 className={pageStyles.blogPostCategory}>{language.languages}</h4>
                          <h4 className={pageStyles.blogPostLanguages} key={lan}>{lan}</h4>
                      )}
                      
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
            <Link to='/blog' style={{textDecoration:`none`}}>
              <div className={pageStyles.blogPostContainer}>
                <div className={pageStyles.blogPostLeftContainer}>
                  <div className={pageStyles.blogPostIDCategoryContainer}>
                    <h4 className={pageStyles.blogPostCategory}>View More</h4>
                  </div>
                  <h3 className={pageStyles.blogPostTitle}>View More Blog Posts...</h3>
                  <p>If you like some of the posts you've seen above, you can see all of the posts I've written by clicking here.</p>  
                </div>
                <div className={pageStyles.blogPostRightContainer}>
                  <div className={pageStyles.blogPostDateContainer}>  
                    <h4 className={pageStyles.blogPostDate}><FaBookmark/></h4>
                  </div>
                </div>
              </div>
              </Link>
          </div>
        </section>
        <section id="work" className={pageStyles.Container}>

        </section>
        <section id="contact" className={pageStyles.Container}> 
          <h2>CONTACT</h2>
          <p>This is a mock description which needs to be filled by an actual description at some point.</p>
          <div className={pageStyles.contactContainer}>
              <div className={pageStyles.formContainer}>
                  <form name="contact" method="POST" data-netlify="true">
                    <p>
                      <label>Your Name:<br/><input type="text" name="name"/></label>
                    </p>
                    <p>
                      <label>Your Email:<br/><input type="email" name="email"/></label>
                    </p>
                    <p>
                      <label>What's your message about? <br/><select name="category[]" dropdown>
                        <option value="General">General</option>
                        <option value="Work Availability">Work Availability</option>
                        <option value="Partnership Idea">Partnership Idea</option>
                        <option value="Content Request">Content Request</option>
                        </select></label>
                    </p>
                    <p>
                      <label>Your Message:<br/><textarea name="message"></textarea></label>
                    </p>
                    <p>
                      <button type="submit">Submit</button>
                    </p>
                  </form>
              </div>
              <div className={pageStyles.socialMediaContainer}>
                <div className={pageStyles.socialMediaItem}><FaInstagram/><h5>@conermmurphy</h5></div>
                <div className={pageStyles.socialMediaItem}><FaTwitter/><h5>@conermurphy</h5></div>
                <div className={pageStyles.socialMediaItem}><FaGithub/><h5>Coner Murphy</h5></div>
                <div className={pageStyles.socialMediaItem}><FaEnvelope/><h5><a>coner@conermurphy.com</a></h5></div>
              </div>
          </div>
        </section>
      </Layout>
    </div>
    
  )
}

export default Index