import React from 'react'
import styled from 'styled-components'
import { device } from '../components/device'
import {useStaticQuery, graphql} from 'gatsby'
import {FaTwitter, FaInstagram, FaGithub} from 'react-icons/fa'

const AuthorCardContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    width: 30vw;
    margin: 0rem 2.5rem;
    border: 2px solid;
    padding: 1rem

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
    margin-top: 1.5rem;
    margin-left: 1.5rem;
    
    @media ${device.mobileL} {
        align-items: center;
        align-self: center;
        margin: 1rem;
    }
`

const AuthorTitle = styled.h3`
    margin: 0;
`

const AuthorDescription = styled.p`

`

const AuthorSocialMedia = styled.div`
    display: flex;
    flex-direction: row;
`

const SocialMediaIcon = styled.a`
    text-decoration: none;
    color: black;

    & > svg {
        width: 1.5rem;
        height: 1.5rem;
        margin: 0rem 1rem 1rem 1rem;
        transition: 0.2s;
    }

    & > svg:hover {
        transform: scale(1.25,1.25);
    }
`

const AuthorImg = styled.img`
    height: 7.5rem;
    width: 7.5rem;
    border-radius: 50%;
    margin: 1rem;

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
                <AuthorDescription>{data.allAuthorsJson.edges[props.id].node.Description}</AuthorDescription>
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