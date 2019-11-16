import React from 'react'
import styled from 'styled-components'
import { device } from '../components/device'
import {useStaticQuery, graphql} from 'gatsby'
import {FaTwitter, FaInstagram, FaGithub} from 'react-icons/fa'

const AuthorCardContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 0.5rem;
    border: 1px solid #1f2a51;
    margin-bottom: 2rem;
    width: fit-content;

    @media ${device.mobileL} {
        flex-direction: column;
        width: auto;
        align-content: center;
        justify-content: center;
    }
`

const AuthorInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-left: 1.5rem;
    
    @media ${device.mobileL} {
        align-items: center;
        align-self: center;
        margin: 1rem;
    }
`

const AuthorTitle = styled.h3`
    margin: 0;
    font-size: 1.25rem;
`

const AuthorSocialMedia = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-top: 0.5rem;
`

const SocialMediaIcon = styled.a`
    text-decoration: none;
    color: black;
    margin-right: 1rem;

    & > svg {
        width: 1.25rem;
        height: 1.25rem;
        transition: 0.2s;
    }

    & > svg:hover {
        transform: scale(1.25,1.25);
    }
`

const AuthorImg = styled.img`
    height: 3.5rem;
    width: 3.5rem;
    border-radius: 50%;

    @media ${device.mobileL} {
        align-self: center;
    }
`

const AuthorCard = (props) => {
    const data = useStaticQuery(
        graphql`
            query AuthorQuery {
                allAuthorsJson {
                edges {
                    node {
                    ID
                    Description
                    Name
                    profileImg
                    }
                }
                }
            }
        `
    )
      
    return(
        <AuthorCardContainer>
            <AuthorImg src={data.allAuthorsJson.edges[props.id].node.profileImg}/>
            <AuthorInfo>
                <AuthorTitle>{data.allAuthorsJson.edges[props.id].node.Name}</AuthorTitle>
                <AuthorSocialMedia>
                    <SocialMediaIcon href="https://twitter.com/ConerMMurphy" target="_blank" rel="noopener noreferrer"><FaTwitter/></SocialMediaIcon>
                    <SocialMediaIcon href="https://www.instagram.com/conermurphy/" target="_blank" rel="noopener noreferrer"><FaInstagram/></SocialMediaIcon>
                    <SocialMediaIcon href="https://github.com/conermurphy" target="_blank" rel="noopener noreferrer"><FaGithub/></SocialMediaIcon>
                </AuthorSocialMedia>
            </AuthorInfo>
            
        </AuthorCardContainer>
    )
}

export default AuthorCard