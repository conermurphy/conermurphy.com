import React from 'react'
import styled from 'styled-components';
import { device } from '../components/device'

const BlogPostContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    -webkit-box-shadow: 0px 0px 10px 0px rgba(153,153,153,0.7);
    -moz-box-shadow: 0px 0px 10px 0px rgba(153,153,153,0.7);
    box-shadow: 0px 0px 10px 0px rgba(153,153,153,0.7);
    padding: 1rem;
    margin-bottom: 2rem;
    
    @media ${device.mobileL} {
        flex-wrap: wrap;
        flex-direction: row-reverse;
    }
`

const BlogPostLeftContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    flex-grow: 1;
`

const BlogPostIDCategoryContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: 1px solid #1f2a51;
`

const BlogPostInfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    & > * {
        margin-bottom: 0;
    }

    @media ${device.mobileL} {
        flex-direction: column;
        align-items: flex-start;
    }
`

const BlogPostID = styled.h4`
    width: 1.5rem;
    background-color: #1f2a51;
    padding: 0.5rem;
    text-align: center;
    color: white;
    margin-bottom: 0rem;
    line-height: 1.5rem
`

const BlogPostCategory = styled.h4`
    background-color: white;
    color: #1f2a51;
    width: fit-content;
    padding: .5rem;
    max-height: 1.5rem;  
    margin-bottom: 0rem;
    line-height: 1.5rem;
`

const BlogPostLanguagesContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;

`
const BlogPostLanguageContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #1f2a51;
    padding: 0.5rem;
    width: fit-content;
    margin-left: 1rem;
`

const BlogPostLanguage = styled.h4`
    color: white;
    margin-bottom: 0rem;
`

const BlogPostTitle = styled.h3`
    margin-bottom: 0.5rem;
    margin-top: 1rem;
`

const BlogPostRightContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`

const BlogPostDateContainer = styled.div`
    word-break: break-all;
    width: 2.5rem;
    padding: 0.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #1f2a51;
    color: white;
`

const BlogPostDate = styled.h4`
    margin: 0;
    text-align: center;
    font-size: 1rem;
`

const BlogPost = (props) => {
    
    if (props.languages !== null) {
        return (
            <BlogPostContainer>
                <BlogPostLeftContainer>
                    <BlogPostInfoContainer>
                        <BlogPostIDCategoryContainer>
                            <BlogPostID>#{props.id}</BlogPostID>
                            <BlogPostCategory>{props.category}</BlogPostCategory>
                        </BlogPostIDCategoryContainer>
                        <BlogPostLanguagesContainer>
                            {props.languages.map( lan => 
                                <BlogPostLanguageContainer>
                                    <BlogPostLanguage key={lan}>{lan}</BlogPostLanguage>
                                </BlogPostLanguageContainer>
                            )}
                        </BlogPostLanguagesContainer>
                    </BlogPostInfoContainer>
                    <BlogPostTitle>{props.title}</BlogPostTitle>
                    <p>{props.description}</p>  
                </BlogPostLeftContainer>
                <BlogPostRightContainer>
                    <BlogPostDateContainer>  
                        <BlogPostDate>{props.date}</BlogPostDate>
                    </BlogPostDateContainer>
                </BlogPostRightContainer>
            </BlogPostContainer>
        )
    } else {
        return (
            <BlogPostContainer style={{marginBottom:`0rem`}}>
                <BlogPostLeftContainer>
                    <BlogPostIDCategoryContainer>
                        
                        <BlogPostID>#{props.id}</BlogPostID>
                        <BlogPostCategory>{props.category}</BlogPostCategory>
                            
                    </BlogPostIDCategoryContainer>
                    <BlogPostTitle>{props.title}</BlogPostTitle>
                    <p>{props.description}</p>  
                </BlogPostLeftContainer>
                <BlogPostRightContainer>
                    <BlogPostDateContainer>  
                        <BlogPostDate>{props.date}</BlogPostDate>
                    </BlogPostDateContainer>
                </BlogPostRightContainer>
            </BlogPostContainer>
        )
    }
}

export default BlogPost