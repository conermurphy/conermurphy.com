import React from 'react';
import styled from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';
import { graphql, useStaticQuery } from 'gatsby';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  & > div {
    grid-column: 1 / span 2;

    & > p {
      max-width: 100%;
      margin-top: 0;
    }

    & > .gatsby-image-wrapper {
      display: block;
      float: ${(props) => (props.reverse ? 'right' : 'left')};
      width: clamp(300px, 40vw, 400px);
      height: max-content;
      margin: auto;
    }
  }
`;

export function ImageText({ reverse, image, alt, text }) {
  const data = useStaticQuery(graphql`
    query {
      images: allFile(filter: { internal: { mediaType: { regex: "/image/i" } } }) {
        edges {
          node {
            id
            name
            childImageSharp {
              gatsbyImageData
              internal {
                type
              }
            }
          }
        }
      }
    }
  `);

  const { images } = data;

  const [imageToDisplay] = images.edges.filter(({ node }) => node.name === image);

  return (
    <Container reverse={reverse}>
      <div>
        <GatsbyImage image={imageToDisplay.node.childImageSharp.gatsbyImageData} alt={alt} />
        <p>{text}</p>
      </div>
    </Container>
  );
}
