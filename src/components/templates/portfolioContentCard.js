import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import Img from 'gatsby-image';
import CornerArt from './cornerArt';

const CardContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: relative;

  width: 80vw;
  max-width: 25rem;
  margin: 1rem;

  border-radius: 2vh;
  overflow: hidden;
  background-color: var(--secondary-color);
  z-index: 1;
  box-shadow: 0px 0px 10px var(--drop-shadows);
`;

const GithubLink = styled.a`
  z-index: 2;

  & > svg {
    font-size: 1.5rem;
    position: absolute;
    top: 22.5vh;
    right: 20px;
  }
`;

const ImgContainer = styled.div`
  width: 80vw;
  max-width: 25rem;
  height: 20vh;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
  padding-top: 0;
`;

const CardInfo = styled.div`
  position: relative;

  & > h3 {
    margin-bottom: 0;
    margin-top: 1rem;
  }
  & > p {
    margin-top: 0;
    margin-bottom: 1rem;
  }
`;

const CardFooter = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1rem;

  & > p {
    margin: 0;
  }
`;

const PortfolioContentCard = ({ data }) => {
  const { link, technologies, title, date, description, repo, image } = data;

  const portfolioImg = image.childImageSharp.fluid;

  return (
    <CardContainer>
      {repo.length !== 0 ? (
        <GithubLink href={repo} target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </GithubLink>
      ) : null}
      <a href={link}>
        <ImgContainer>
          <Img fluid={portfolioImg} alt={`${title} website screenshot`} />
        </ImgContainer>
        <CardBody>
          <CardInfo>
            <h3>{title}</h3>
            <p>{description}</p>
          </CardInfo>
          <CardFooter>
            <p>{technologies.map(line => line).join(', ')}</p>
            <p>
              <b>{date}</b>
            </p>
          </CardFooter>
          <CornerArt adjustments={['17.5vh', 0, 0, 0]} />
        </CardBody>
      </a>
    </CardContainer>
  );
};

PortfolioContentCard.propTypes = {
  data: PropTypes.shape({
    link: PropTypes.string.isRequired,
    technologies: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    repo: PropTypes.string.isRequired,
    image: PropTypes.object,
  }).isRequired,
};

export default PortfolioContentCard;
