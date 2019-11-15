import React from 'react'
import {useStaticQuery, graphql, Link} from 'gatsby'
import sidebarStyles from './styles/sidebarStyles.module.css'
import {FaTwitter,FaInstagram,FaEnvelope,FaGithub} from 'react-icons/fa';

const Sidebar = () => {

    const data = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                    }
                }
            }
        `
    )

    return (
        <div className={sidebarStyles.sidebarContainer}>
            <div className={sidebarStyles.sidebarTop}>
                <svg width="100" height="100">
                    <rect width="100" height="100" fill="white"/>
                </svg>
                <h1 className={sidebarStyles.title}>{data.site.siteMetadata.title.slice(0,5)}<br/>{data.site.siteMetadata.title.slice(5)}</h1>
                <nav className={sidebarStyles.navContainer}>
                    <Link to="/">Home</Link>
                    <Link to="/#blog">Blog</Link>
                    <Link to="/#contact">Contact</Link>
                </nav>
            </div>
            <div className={sidebarStyles.sidebarBottom}>
                <div className={sidebarStyles.socialMediaContainer}>
                    <a href="/"><FaTwitter/></a>
                    <a href="/"><FaInstagram/></a>
                    <a href="/"><FaGithub/></a>
                    <a href="/"><FaEnvelope/></a>
                </div>
                <p className={sidebarStyles.copyright}>Copyright © 2019 <br/>Coner Murphy</p>
            </div>
        </div>
    )
}

export default Sidebar