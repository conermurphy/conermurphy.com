import React from 'react'
import styled from 'styled-components'
import {useStaticQuery} from 'gatsby'
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
`

const AuthorInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 1.5rem;
    margin-left: 1.5rem;
`

const AuthorTitle = styled.h3`
    margin: 0;
`

const AuthorDescription = styled.p`

`

const AuthorSocialMedia = styled.div`

`

const SocialMediaIcon = styled.a`
    text-decoration: none;
    color: black;

    & > svg {
        width: 1.5rem;
        height: 1.5rem;
        margin-right: 1rem
    }
`

const AuthorImg = styled.img`
    height: 7.5rem;
    width: 7.5rem;
    border-radius: 50%;
    border: 3px solid #1f2a51;
    margin: 1rem;
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
                    <SocialMediaIcon href="/"><FaTwitter/></SocialMediaIcon>
                    <SocialMediaIcon href="/"><FaInstagram/></SocialMediaIcon>
                    <SocialMediaIcon href="/"><FaGithub/></SocialMediaIcon>
                </AuthorSocialMedia>
            </AuthorInfo>
        </AuthorCardContainer>
    )
}

export default AuthorCard