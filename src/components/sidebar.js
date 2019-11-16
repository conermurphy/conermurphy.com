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
    padding: 2rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 17.5vw;
    height: 100vh;

    @media ${device.mobileL} {
        z-index: 999;
        display: flex;
        flex-direction: ${props => props.isMenuOpen ? 'column' : 'row'}
        width: 100vw;
        height: ${props => props.isMenuOpen ? '100vh' : 'auto'}
        padding: ${props => props.isMenuOpen ? '2rem' : '0rem 1rem'}
    }
`

const SidebarTop = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    @media ${device.mobileL} {
        flex-direction: ${props => props.isMenuOpen ? 'column' : 'row'}
        width: 100vw
    }
`

const MenuOpenButton = styled.button`
    display: none;
    border: none;
    background-color: transparent;
    color: white;
    padding: 1rem;

    @media ${device.mobileL} {
        display: ${props => props.isMenuOpen ? 'none' : 'block'};
    }

    & > svg {
        width: 1.5rem;
        height: 1.5rem;
    }
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
    display: block;

    @media ${device.mobileL} {
        display: ${props => props.isMenuOpen ? 'block' : 'none'}
    }
`

const NavContainer = styled.nav`
    display: flex;
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

    @media ${device.mobileL} {
        display: ${props => props.isMenuOpen ? 'flex' : 'none'}
    }
`

const SocialAndCopyrightContainer = styled.div`
    display: flex;
    flex-direction: column;

    @media ${device.mobileL} {
        display: ${props => props.isMenuOpen ? 'flex' : 'none'};
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

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuOpen: false
        }
    }

    openCloseMenu(e) {
        this.setState({
            isMenuOpen: !this.state.isMenuOpen
        })
    }

    // handleClick = (e) => {
    //     if (this.sidebar.contains(e.target)) {
    //         this.setState({
    //             isMenuOpen: false
    //         })
    //     }
        
    // }

    componentWillMount() {
        document.addEventListener('mousedown',this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown',this.handleClick, false);
    }

    render() {
        return (
            <SidebarContainer isMenuOpen={this.state.isMenuOpen} ref={sidebar => this.sidebar = sidebar}>
                <SidebarTop isMenuOpen={this.state.isMenuOpen}>
                    <Link to="/">
                        <Logo src={logo} alt="CM Logo"/>
                    </Link>
                    <Title isMenuOpen={this.state.isMenuOpen}>Coner<br/>Murphy</Title>
                    <MenuOpenButton isMenuOpen={this.state.isMenuOpen} onClick={this.openCloseMenu.bind(this)}><FaAlignRight/></MenuOpenButton>
                </SidebarTop>
                <NavContainer isMenuOpen={this.state.isMenuOpen}>
                        <Link onClick={this.openCloseMenu.bind(this)} to="/">Home</Link>
                        <Link onClick={this.openCloseMenu.bind(this)} to="/#blog">Blog</Link>
                        <Link onClick={this.openCloseMenu.bind(this)} to="/#contact">Contact</Link>
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