import React from 'react'
import {useStaticQuery, graphql, Link} from 'gatsby'
import {FaTwitter,FaInstagram,FaGithub} from 'react-icons/fa';
import logo from '../../content/media/assets/CM-Logo-2019.gif'
import styled from 'styled-components'

const SidebarContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    background-color: #1f2a51;
    width: 17.5vw;
    height: 100vh;
    min-width: 10rem;
    padding: 4rem 2rem 2rem 2rem;
    box-sizing: border-box;
`

const SidebarTop = styled.div`
    text-align: center;
`

const Logo = styled.img`
    width: 7.5rem;
    height: 7.5rem;
`

const NavContainer = styled.nav`
    display: flex;
    flex-direction: column;

    & > a {
        font-size: 1.5rem;
        text-decoration: none;
        padding: 0.5rem;
        color: white;
        font-family: 'Montserrat', sans-serif;
    }
`

const SocialMediaItem = styled.a`
    padding: 0.5rem;
    color: white;
    font-size: 2rem;
    transition: 0.5s;

    & > svg {
        transition: 0.2s;
        width: 2.5rem;
        height: 2.5rem;
    }

    & > svg:hover {
        transform: scale(1.25,1.25);
    }
`

const Copyright = styled.p`
    font-size: 1rem;
    color: white;
    text-align: center;
    margin-top: 1rem;
`

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
        <SidebarContainer>
            <SidebarTop>
                <Logo src={logo} alt="CM Logo"/>
                <h1 style={{color:`white`}}>{data.site.siteMetadata.title.slice(0,5)}<br/>{data.site.siteMetadata.title.slice(5)}</h1>
                <NavContainer>
                    <Link to="/">Home</Link>
                    <Link to="/#blog">Blog</Link>
                    <Link to="/#contact">Contact</Link>
                </NavContainer>
            </SidebarTop>
            <div>
                <div>
                    <SocialMediaItem href="https://twitter.com/ConerMMurphy" target="_blank" rel="noopener noreferrer"><FaTwitter/></SocialMediaItem>
                    <SocialMediaItem href="https://www.instagram.com/conermurphy/" target="_blank" rel="noopener noreferrer"><FaInstagram/></SocialMediaItem>
                    <SocialMediaItem href="https://github.com/conermurphy" target="_blank" rel="noopener noreferrer"><FaGithub/></SocialMediaItem>
                </div>
                <Copyright>Copyright © 2019 <br/>Coner Murphy</Copyright>
            </div>
        </SidebarContainer>
    )
}

export default Sidebar