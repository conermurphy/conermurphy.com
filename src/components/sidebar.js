import React from 'react'
import {Link} from 'gatsby'
import {FaTwitter,FaInstagram,FaGithub, FaAlignRight} from 'react-icons/fa';
import logo from '../../content/media/assets/CM-Logo-2019.gif'
import styled from 'styled-components'
import { device } from "./device"

const SidebarContainer = styled.div`
    
    align-items: center;
    justify-content: space-between;
    position: fixed;
    background-color: #1f2a51;
    padding: ${props => props.isMenuOpen ? '4rem 2rem 2rem 2rem' : '0rem 1rem'}
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 17.5vw;
    height: 100vh;
    z-index: 999;

    @media ${device.mobileL} {
        display: flex;
        flex-direction: row;
        width: 100vw;
        height: ${props => props.isMenuOpen ? '100vh' : 'auto'}
    }
`

const SidebarTop = styled.div`
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100vw;
    align-items: center;
`

const Logo = styled.img`
    height: 7.5rem;
    width: 7.5rem;

    @media ${device.mobileL} {
        height: ${props => props.isMenuOpen ? '7.5rem' : '2.5rem'}
        width: ${props => props.isMenuOpen ? '7.5rem' : '2.5rem'}
        padding: 1rem;
    }
`

const Title = styled.h1`
    color: white;
    display: ${props => props.isMenuOpen ? 'block' : 'none'}
`

const NavContainer = styled.nav`
    display: ${props => props.isMenuOpen ? 'flex' : 'none'}
    flex-direction: column;
    align-items: center;
    flex-grow: 1;

    & > a {
        font-size: 1.5rem;
        text-decoration: none;
        padding: 0.5rem;
        color: white;
        font-family: 'Montserrat', sans-serif;
    }
`

const SocialAndCopyrightContainer = styled.div`
    display: ${props => props.isMenuOpen ? 'block' : 'none'}
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

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuOpen: false
        }
    }

    openMenu(e) {
        this.setState({
            isMenuOpen: !this.state.isMenuOpen
        })
    }

    closeMenu(e) {
        this.setState({
            isMenuOpen: !this.state.isMenuOpen
        })
    }

    componentDidMount() {
        document.addEventListener('mousedown',this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown',this.handleClick, false);
    }

    render() {
        return (
            <SidebarContainer isMenuOpen={this.state.isMenuOpen}>
                <SidebarTop isMenuOpen={this.state.isMenuOpen}>
                    <Logo src={logo} alt="CM Logo"/>
                    <Title isMenuOpen={this.state.isMenuOpen}>Coner<br/>Murphy</Title>
                    <button onClick={this.openMenu.bind(this)}><FaAlignRight/></button>
                </SidebarTop>
                <NavContainer isMenuOpen={this.state.isMenuOpen}>
                        <Link to="/">Home</Link>
                        <Link to="/#blog">Blog</Link>
                        <Link to="/#contact">Contact</Link>
                </NavContainer>
                <SocialAndCopyrightContainer isMenuOpen={this.state.isMenuOpen}>
                    <div>
                        <SocialMediaItem href="https://twitter.com/ConerMMurphy" target="_blank" rel="noopener noreferrer"><FaTwitter/></SocialMediaItem>
                        <SocialMediaItem href="https://www.instagram.com/conermurphy/" target="_blank" rel="noopener noreferrer"><FaInstagram/></SocialMediaItem>
                        <SocialMediaItem href="https://github.com/conermurphy" target="_blank" rel="noopener noreferrer"><FaGithub/></SocialMediaItem>
                    </div>
                    <Copyright>Copyright © 2019<br/>Coner Murphy</Copyright>
                </SocialAndCopyrightContainer>
            </SidebarContainer>
        )
    }
}

export default Sidebar