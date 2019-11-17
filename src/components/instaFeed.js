import React from 'react';
import styled from 'styled-components'
import { device } from '../components/device'
import Img from 'gatsby-image'
import {useStaticQuery, graphql} from 'gatsby'
import { FaComment, FaHeart } from 'react-icons/fa';

const InstaFeedContainer = styled.section`
    display: grid;
    grid-template-areas: '1 2 3 4';
    grid-gap: 1rem;
    justify-content: flex-start;

    @media ${device.tablet} {
        grid-template-areas : '1 2 3 4';
        justify-content: flex-start;
        z-index: 1;
    }

    @media ${device.mobileL} {
        grid-template-areas : '1 2';
        justify-content: flex-start;
        z-index: 1;
    }
`

const InstaImgLink = styled.a`
    position: relative;
    color: black;
`

const InstaImg = styled(Img)`
    width: 250px;
    height: 250px;
    transition: 0.5s;

    :hover  {
        transform: scale(1.05,1.05);
    }

    @media ${device.tablet} {
        width: 150px;
        height: 150px;
    }
`

const InstaImgStatsContainer = styled.div`
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 3;
    opacity: 0;
    transition: 0.5s;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;

    ${InstaImgLink}:hover & {
        opacity: 100;
        background-color: #1f2a51;
        padding: 0.5rem;
    }

    @media ${device.tablet} {
        display: none;
    }
`

const InstaImgStats = styled.p`
    font-size: 1.25rem;
    color: white;
    margin: 0.5rem;
`

const InstaFeed = () => {
    const data = useStaticQuery(
        graphql`
        query {
            allInstaNode(limit: 4, filter: {caption: {regex: "/cat/"}}) {
              edges {
                node {
                  id
                  likes
                  comments
                  mediaType
                  preview
                  original
                  timestamp
                  caption
                  localFile {
                    childImageSharp {
                        fluid(maxWidth: 800) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                  }
                  # Only available with the public api scraper
                  thumbnails {
                    src
                    config_width
                    config_height
                  }
                  dimensions {
                    height
                    width
                  }
                }
              }
            }
          }
        `
    )

    return(
        <InstaFeedContainer>
            {data.allInstaNode.edges.map(( { node } ) => (
                <InstaImgLink key={node.id} href={`https://www.instagram.com/p/${node.id}/`} >
                    <InstaImg fluid={node.localFile.childImageSharp.fluid}/>
                    <InstaImgStatsContainer>
                        <InstaImgStats><FaHeart/> {node.likes}</InstaImgStats>
                        <InstaImgStats><FaComment/> {node.comments === 0 ? node.comments : 0}</InstaImgStats>
                    </InstaImgStatsContainer>
                </InstaImgLink>
            ))}
            
        </InstaFeedContainer>
    )
}

export default InstaFeed
