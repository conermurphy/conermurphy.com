import React from 'react'
import {FaInstagram, FaTwitter, FaGithub, FaEnvelope, FaRegWindowClose } from "react-icons/fa"
import styled from 'styled-components'

const ContactContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const SocialMediaContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-grow: 1;
`

const SocialMediaItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 1rem;
    background-color: #1f2a51;
    color: white;
    padding: 2rem;
    transition: 0.5s;

    :hover {
        background-color: white;
        border: 1px solid #1f2a51;
        color: #1f2a51;
    }

    & > svg {
        height: 2.5rem;
        width: 2.5rem;
    }
`

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    justify-content: center;
    flex-grow: 1;
    background-color: #1f2a51;
    color: white;
    width: ${props => props.formContainerOpen ? '100vw' : '0vw'};
    height: ${props => props.formContainerOpen ? '100vh' : '0vh'};
    transition: 0.5s;
`

const Form = styled.form`
    opacity : ${props => props.formContainerOpen ? '100%' : '0%'};
    transition: 0.5s
`

const FormCloseButton = styled.a`
 & > svg {
     width: 3rem;
     height: 3rem;
 }
`

class SocialMediaLinks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formContainerOpen: false
        }
    }

    openContactForm(e) {
        this.setState({
            formContainerOpen: !this.state.formContainerOpen
        })
    }

    closeContactForm(e) {
        this.setState({
            formContainerOpen: !this.state.formContainerOpen
        })
    }

    handleClick = (e) => {
        if (this.form.contains(e.target)) {
            return;
        }
        this.setState({
            formContainerOpen: false
        })
    }

    componentDidMount() {
        document.addEventListener('mousedown',this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown',this.handleClick, false);
    }

    render() {
        return(
        <ContactContainer>
            <FormContainer formContainerOpen={this.state.formContainerOpen}>
                  <Form formContainerOpen={this.state.formContainerOpen} ref={form => this.form = form} name="contact" method="POST" data-netlify="true">
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
                    <FormCloseButton onClick={this.closeContactForm.bind(this)}><FaRegWindowClose/></FormCloseButton>
                  </Form>
            </FormContainer>
            <SocialMediaContainer>
                <a href="/"><SocialMediaItem><FaInstagram/></SocialMediaItem></a>
                <a href="/"><SocialMediaItem><FaTwitter/></SocialMediaItem></a>
                <a href="/"><SocialMediaItem><FaGithub/></SocialMediaItem></a>
                <a onClick={this.openContactForm.bind(this)}><SocialMediaItem><FaEnvelope/></SocialMediaItem></a>
            </SocialMediaContainer>
        </ContactContainer>
        )
    }
}

export default SocialMediaLinks