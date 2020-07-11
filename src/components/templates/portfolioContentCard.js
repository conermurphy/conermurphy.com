import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import CornerArt from './cornerArt';
import TagGenerator from './tagGenerator';

const CardContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: relative;

  width: 80vw;
  min-height: 20vh;
  max-width: 25rem;

  border-radius: 2vh;
  overflow: hidden;
  background-color: var(--secondary-color);
  z-index: 1;
  box-shadow: 0px 0px 10px var(--drop-shadows);
`;

const ImgContainer = styled.div`
  background-color: blue;
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

  & > p {
    margin: 0;
  }
`;

const PortfolioContentCard = ({ data }) => {
  const { link, technologies, title, date, description } = data;

  return (
    <a href={link} style={{ margin: '1rem' }}>
      <CardContainer>
        <ImgContainer>
          <img src="" alt="" />
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
      </CardContainer>
    </a>
  );
};

PortfolioContentCard.propTypes = {
  data: PropTypes.shape,
};

export default PortfolioContentCard;

// (
//     <CardLinkExternal href={link}>
//       <CardContainer
//         whileHover={{ y: -10, scale: 0.95 }}
//         transition={{ duration: 0.25, ease: 'easeInOut' }}
//         initial="hidden"
//         animate="visible"
//         variants={cardContainerVariants}
//         positionTransition
//       >
//         <LanguagesContainer>
//           {topLine.map((line, index) => (
//             <TagGenerator language={line} key={index} />
//           ))}
//         </LanguagesContainer>
//         <PostTitle>{title}</PostTitle>
//         <PostInfo>{bottomLine}</PostInfo>
//         <AuthorName>@MrConerMurphy</AuthorName>
//         <CornerArt adjustments={['17.5vh', 0, 0, 0]} />
//       </CardContainer>
//     </CardLinkExternal>
//   );
