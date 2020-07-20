import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import Img from 'gatsby-image';
import device from '../device';
import CornerArt from './cornerArt';

const CardContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: relative;

  width: 80vw;
  max-width: 22rem;
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
    color: var(--body-font-color);
    background-color: var(--background-color);
    padding: 1rem;
    border-bottom-left-radius: 10px;
    box-shadow: 0px 0px 3px var(--drop-shadows);
    position: absolute;
    top: 0rem;
    right: 0px;
  }
`;

const ImgContainer = styled.div`
  width: 80vw;
  max-width: 22rem;
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

const cardContainerVariants = {
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
  hidden: {
    opacity: 0,
    y: 0,
    scale: 0,
  },
};

const PortfolioContentCard = ({ data }) => {
  const { link, technologies, title, date, description, repo, image } = data;

  const portfolioImg = image.childImageSharp.fluid;

  return (
    <CardContainer
      whileHover={{ y: -10, scale: 0.95 }}
      layoutTransition={{ ease: 'easeInOut', type: 'spring', damping: 100, stiffness: 500 }}
      initial="hidden"
      animate="visible"
      variants={cardContainerVariants}
    >
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
          <CornerArt adjustments={['15vh', 0, 0, 0]} />
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
