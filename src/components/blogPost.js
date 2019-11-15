import React from 'react'
import styled from 'styled-components';

const BlogPostContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    -webkit-box-shadow: 0px 0px 10px 0px rgba(153,153,153,0.7);
    -moz-box-shadow: 0px 0px 10px 0px rgba(153,153,153,0.7);
    box-shadow: 0px 0px 10px 0px rgba(153,153,153,0.7);
    padding: 1rem;
    margin-bottom: 2rem;
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

    & > * {
        margin-bottom: 0;
    }
`

const BlogPostID = styled.h4`
    height: 1.5rem;
    width: 1.5rem;
    background-color: #1f2a51;
    padding: 0.5rem;
    text-align: center;
    color: white;
`

const BlogPostCategory = styled.h4`
    background-color: white;
    border: 1px solid #1f2a51;
    color: #1f2a51;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    padding: .5rem;
`

const BlogPostLanguages = styled.h4`
    background-color: #1f2a51;
    color: white;
    padding: 0.5rem;
    width: fit-content;
    height: 1.5rem;
    margin-left: 1rem;
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
                    <BlogPostIDCategoryContainer>
                        <BlogPostID>#{props.id}</BlogPostID>
                        <BlogPostCategory>{props.category}</BlogPostCategory>

                            {props.languages.map( lan => 
                                <BlogPostLanguages key={lan}>{lan}</BlogPostLanguages>
                            )}
                            
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
    } else {
        return (
            <BlogPostContainer>
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