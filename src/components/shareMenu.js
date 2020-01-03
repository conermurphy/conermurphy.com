import React from 'react'
import {FaShareAlt, FaTwitter, FaInstagram} from 'react-icons/fa'
import styled from 'styled-components'
import { device } from '../components/device'

const ShareContainer = styled.section`

    @media ${device.laptop} {
        display: none;
    };
`

const ShareButton = styled.a`
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    width: 3.5rem;
    height: 3.5rem;
    left: 20%;
    top: 20%;
    z-index: 3;
    color: #1f2a51;
    background-color: white;
    border: 2px solid #1f2a51;
    transition: 0.2s;

    :hover  {
        background-color: #1f2a51;
        color: white;
    };

    @media ${device.laptop} {
        left: 90%;
        margin: 0rem;
        top: 20%;
    };
`

const ShareIcon = styled.a`
    z-index: 1;
    width: 3.5rem;
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #1f2a51;
    color: #1f2a51;
    background-color: white;
    text-align: center;
    position: fixed;
    left: 20%;
    top: 20%;

    :hover  {
        background-color: #1f2a51;
        color: white;
    };

    :nth-child(2)   {
        top: ${props => props.shareOpen ? '26%' : '20%'};
        z-index: 2;
        transition: 0.25s;
    };

    :nth-child(3)  {
        top: ${props => props.shareOpen ? '32%' : '20%'};
        z-index: 1;
        transition: 0.5s;
    };

    @media ${device.laptop} {
        left: 90%;
        margin: 0rem;
        
        :nth-child(2)   {
            top: ${props => props.shareOpen ? '26%' : '20%'};
            z-index: 2;
            transition: 0.25s;
        };
    
        :nth-child(3)  {
            top: ${props => props.shareOpen ? '32%' : '20%'};
            z-index: 1;
            transition: 0.5s;
        };
    };
`

class ShareMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shareOpen: false
        }
    }

    openShare(e) {
        this.setState({
            shareOpen: !this.state.shareOpen
        })
    }

    handleClick = (e) => {
        if (this.shareContainer.contains(e.target)) {
            return;
        }
        this.setState({
            shareOpen: false
        })
    }

    componentDidMount() {
        document.addEventListener('mousedown',this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown',this.handleClick,false);
    }

    render() {
    return (
        <ShareContainer ref={shareContainer => this.shareContainer = shareContainer}>
              <ShareButton onClick={this.openShare.bind(this)}><FaShareAlt/></ShareButton>
              <ShareIcon href="https://twitter.com/ConerMMurphy" shareOpen={this.state.shareOpen}><FaTwitter/></ShareIcon>
              <ShareIcon href="https://www.instagram.com/conermurphy/" shareOpen={this.state.shareOpen}><FaInstagram/></ShareIcon>
        </ShareContainer>
    )
    }
}

export default ShareMenu