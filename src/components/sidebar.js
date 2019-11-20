import React from 'react'
import {Link} from 'gatsby'
import {FaTwitter,FaInstagram,FaGithub, FaAlignRight} from 'react-icons/fa';
import logo from '../../content/media/assets/CM-Logo-2019.svg'
import styled from 'styled-components'
import { device } from "./device"

const SidebarContainer = styled.div`
    grid-area: sidebar;
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

    @media ${device.tablet} {
        z-index: 999;
        display: flex;
        flex-direction: ${props => props.isMenuOpen ? 'column' : 'row'};
        width: 100vw;
        height: ${props => props.isMenuOpen ? '100vh' : '10vh'};
        padding: ${props => props.isMenuOpen ? '2rem' : '0rem 1rem'};
        transform: translate(0, ${props => props.slide});
        transition: 180ms linear;
        grid-area: sidebar;
    };
`

const SidebarTop = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    @media ${device.tablet} {
        flex-direction: ${props => props.isMenuOpen ? 'column' : 'row'};
        width: 100vw;
    };
`

const MenuOpenButton = styled.button`
    display: none;
    border: none;
    background-color: transparent;
    color: white;
    padding: 1rem;

    @media ${device.tablet} {
        display: ${props => props.isMenuOpen ? 'none' : 'block'};
    };

    & > svg {
        width: 1.5rem;
        height: 1.5rem;
    };
`

const Logo = styled.img`
    height: 7.5rem;
    width: 7.5rem;

    @media ${device.laptop} {
        height: 5rem;
        width: 5rem;
    };

    @media ${device.tablet} {
        height: ${props => props.isMenuOpen ? '7.5rem' : '2.5rem'};
        width: ${props => props.isMenuOpen ? '7.5rem' : '2.5rem'};
        padding: 1rem;
    };
`

const Title = styled.h1`
    color: white;
    display: block;
    font-size: 1.5rem;

    @media ${device.tablet} {
        display: ${props => props.isMenuOpen ? 'block' : 'none'};
    };

    @media screen and (min-width: 2560px) {
        font-size: 2rem;
        line-height: auto;
    };
`

const NavContainer = styled.nav`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;

    & > a {
        font-size: 1.25rem;
        text-decoration: none;
        padding: 0.5rem;
        color: white;
        font-family: 'Montserrat', sans-serif;

        @media screen and (min-width: 2560px) {
            font-size: 1.75rem;
            line-height: auto;
        };
    };

    @media ${device.tablet} {
        display: ${props => props.isMenuOpen ? 'flex' : 'none'};
    };
`

const SocialAndCopyrightContainer = styled.div`
    display: flex;
    flex-direction: column;

    @media ${device.tablet} {
        display: ${props => props.isMenuOpen ? 'flex' : 'none'};
    };
`

const SocialMediaContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    @media ${device.laptop} {
        flex-direction: column;
        align-items: center;
    };

    @media ${device.tablet} {
        flex-direction: row;
        align-items: center;
    };
    
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

        @media screen and (min-width: 2560px) {
            height: 3.5rem;
            width: 3.5rem;
        };
    };

    & > svg:hover {
        transform: scale(1.25,1.25);
    };
`

const Copyright = styled.p`
    font-size: 0.75rem;
    line-height: 1rem;
    color: white;
    text-align: center;
    margin-top: 1rem;

    @media screen and (min-width: 2560px) {
        font-size: 1.25rem;
        line-height: auto;
    };
`

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuOpen: false,
            lastScrollY: 0,
            slide: '0vh'
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

    handleScroll = () => {
        const { lastScrollY } = this.state; 
        const currentScrollY = window.scrollY;
    
    
        if (currentScrollY > lastScrollY) {
          this.setState({ slide: '-10vh' });
        }  else  {
          this.setState({ slide: '0vh' });
        }
        this.setState({ lastScrollY: currentScrollY });
      };

    componentDidMount() {
        // document.addEventListener('mousedown',this.handleClick, false);
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        // document.removeEventListener('mousedown',this.handleClick, false);
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        return (
            <SidebarContainer isMenuOpen={this.state.isMenuOpen} slide={this.state.slide} ref={sidebar => this.sidebar = sidebar}>
                <SidebarTop isMenuOpen={this.state.isMenuOpen}>
                    <Link to="/">
                        <Logo src={logo} alt="CM Logo"/>
                    </Link>
                    <Title isMenuOpen={this.state.isMenuOpen}>Coner<br/>Murphy</Title>
                    <MenuOpenButton aria-label="Open Navigation Menu." isMenuOpen={this.state.isMenuOpen} onClick={this.openCloseMenu.bind(this)}><FaAlignRight/></MenuOpenButton>
                </SidebarTop>
                <NavContainer isMenuOpen={this.state.isMenuOpen}>
                        <Link aria-label="Home" onClick={this.openCloseMenu.bind(this)} to="/">Home</Link>
                        <Link aria-label="Blog" onClick={this.openCloseMenu.bind(this)} to="/#blog">Blog</Link>
                        <Link aria-label="Contact Us" onClick={this.openCloseMenu.bind(this)} to="/#contact">Contact</Link>
                </NavContainer>
                <SocialAndCopyrightContainer isMenuOpen={this.state.isMenuOpen}>
                    <SocialMediaContainer>
                        <SocialMediaItem aria-label="Twitter Profile" href="https://twitter.com/ConerMMurphy" target="_blank" rel="noopener noreferrer"><FaTwitter/></SocialMediaItem>
                        <SocialMediaItem aria-label="Instagram Profile" href="https://www.instagram.com/conermurphy/" target="_blank" rel="noopener noreferrer"><FaInstagram/></SocialMediaItem>
                        <SocialMediaItem aria-label="Github Profile" href="https://github.com/conermurphy" target="_blank" rel="noopener noreferrer"><FaGithub/></SocialMediaItem>
                    </SocialMediaContainer>
                    <Copyright>Copyright © 2019 Coner Murphy</Copyright>
                </SocialAndCopyrightContainer>
            </SidebarContainer>
        )
    }
}

export default Sidebar