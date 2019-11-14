import React from 'react'
import styled from 'styled-components'
import {useStaticQuery} from 'gatsby'

const AuthorCardContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    -webkit-box-shadow: 0px 0px 10px 0px rgba(153,153,153,0.7);
    -moz-box-shadow: 0px 0px 10px 0px rgba(153,153,153,0.7);
    box-shadow: 0px 0px 10px 0px rgba(153,153,153,0.7);
`

const AuthorDescription = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`
const AuthorImg = styled.img`
    height: 10rem;
    width: 10rem;
    border-radius: 10px;
    border: 5px solid #1f2a51;
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
            <AuthorDescription>
                <h3>{data.allAuthorsJson.edges[props.id].node.Name}</h3>
                <p>{data.allAuthorsJson.edges[props.id].node.Description}</p>
            </AuthorDescription>
        </AuthorCardContainer>
    )
}

export default AuthorCard