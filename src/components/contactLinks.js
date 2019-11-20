import React from 'react'
import {FaInstagram, FaTwitter, FaGithub, FaEnvelope, FaRegWindowClose, FaPaperPlane } from "react-icons/fa"
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
    flex-wrap: wrap;
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
    };

    & > svg {
        height: 2.5rem;
        width: 2.5rem;
    };
`

const OpenContactFormButton = styled.button`
    webkit-appearance: none;
    border: none;
    background-color: transparent;
    margin: -0.5rem;
`

const FormContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    justify-content: center;
    flex-grow: 1;
    background-color: #1f2a51;
    color: white;
    width: ${props => props.formContainerOpen ? '100vw' : '0vw'};
    height: ${props => props.formContainerOpen ? '100vh' : '0vh'};
    transition: 0.5s;
    display: flex;
    z-index: 999;
    transform: translate(-50%, -50%);
`

const Form = styled.form`
    opacity : ${props => props.formContainerOpen ? '100%' : '0%'};
    transition: 0.5s;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    display : ${props => props.formContainerOpen ? 'flex' : 'none'};
`

const FormLabelContainer = styled.p`
    font-size: 1.25rem;
    margin: 0.5rem;
`

const Formlabel = styled.label`
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const Forminput = styled.input`
    padding: 0.5rem;
    width: 17.5rem;
`

const FormDropdown = styled.select`
    padding: 0.5rem;
    width: 17.5rem;
    border: none;
    background-color: white;
`

const FormTextArea = styled.textarea`
    padding: 0.5rem;
    height: 7.5rem;
    width: 17.5rem;
`

const FormCloseButton = styled.button`
    transition: 0.5s;
    background-color: transparent;
    border: none;

    & > svg {
        width: 3rem;
        height: 3rem;
        color: white;
    };

    :hover {
        transform: scale(1.25,1.25);
    };
`

const FormSubmitButton = styled.button`
    border: 2px solid white;
    border-radius: 50%;
    padding: 1rem;
    color: white;
    background-color: #1f2a51;
    transition: 0.5s;
    margin: 0.5rem;

    :hover {
        background-color: white;
        color: #1f2a51;
        transform: scale(1.25,1.25);
    };

    & > svg {
        transform: translate(-2px, 1px);
    };
`

class ContactLinks extends React.Component {
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
                    <FormCloseButton><FaRegWindowClose/></FormCloseButton>
                    <FormLabelContainer>
                      <Formlabel>Your Name:<br/><Forminput type="text" name="name"/></Formlabel>
                    </FormLabelContainer>
                    <FormLabelContainer>
                      <Formlabel>Your Email:<br/><Forminput type="email" name="email"/></Formlabel>
                    </FormLabelContainer>
                    <FormLabelContainer>
                      <Formlabel>What's your message about? <br/><FormDropdown name="category[]" dropdown>
                        <option value="General">General</option>
                        <option value="Work Availability">Work Availability</option>
                        <option value="Partnership Idea">Partnership Idea</option>
                        <option value="Content Request">Content Request</option>
                        </FormDropdown></Formlabel>
                    </FormLabelContainer>
                    <FormLabelContainer>
                      <Formlabel>Your Message:<br/><FormTextArea name="message"></FormTextArea></Formlabel>
                    </FormLabelContainer>
                    <FormLabelContainer>
                      <FormSubmitButton type="submit"><FaPaperPlane/></FormSubmitButton>
                    </FormLabelContainer>
                  </Form>
            </FormContainer>
            <SocialMediaContainer>
                <a aria-label="Twitter Profile" href="https://twitter.com/ConerMMurphy" target="_blank" rel="noopener noreferrer"><SocialMediaItem><FaTwitter/></SocialMediaItem></a>
                <a aria-label="Instagram Profile" href="https://www.instagram.com/conermurphy/" target="_blank" rel="noopener noreferrer"><SocialMediaItem><FaInstagram/></SocialMediaItem></a>
                <a aria-label="Github Profile" href="https://github.com/conermurphy" target="_blank" rel="noopener noreferrer"><SocialMediaItem><FaGithub/></SocialMediaItem></a>
                <OpenContactFormButton aria-label="Open Contact Form." onClick={this.openContactForm.bind(this)}><SocialMediaItem><FaEnvelope/></SocialMediaItem></OpenContactFormButton>
            </SocialMediaContainer>
        </ContactContainer>
        )
    }
}

export default ContactLinks