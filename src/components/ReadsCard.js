import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import Tags from './Tags';

const ReadsCardContainer = styled.div`
  display: grid;
  grid-template-columns: 130px 1fr;
  align-items: center;
  justify-content: center;
  justify-items: flex-start;
  gap: 5rem;
  border-bottom: 2px solid var(--grey);
  padding: 2rem 0;

  @media (max-width: 600px) {
    grid-template-columns: 100%;
    text-align: center;
    align-items: center;
    justify-items: center;
    padding: 3rem;

    & > div {
      margin-top: 2rem;
    }
  }

  & > .gatsby-image-wrapper {
    width: 130px;
  }

  .titleAuthor {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-end;
    gap: 1rem;

    & > h2 {
      font-size: 2.5rem;
    }

    & > h3 {
      font-size: 2rem;
    }

    @media (max-width: 600px) {
      justify-content: center;
    }
  }

  .description {
    max-height: 80px;
    white-space: wrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1.5rem;
  }
`;

const Status = styled.p`
  background-color: ${(props) => (props.status === 'Complete' ? 'var(--green)' : 'var(--red)')};
  color: var(--white);
  padding: 0.5rem 1rem;
`;

const ReadMeta = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;

  & * {
    margin: 0;
  }

  @media (max-width: 600px) {
    justify-content: center;
  }
`;

export default function ReadsCard({ read }) {
  const { items, localFile, fields } = read;
  const {
    volumeInfo: { title, categories, authors, description, infoLink },
    id,
  } = items[0];
  const { status, start, finished, pageCount, rating } = fields;

  return (
    <a href={infoLink} target="_blank" rel="noopener noreferrer">
      <ReadsCardContainer>
        <Img fluid={localFile.childImageSharp.fluid} />
        <div>
          <div className="titleAuthor">
            <h2>{title}</h2>
            <h3>by {authors.map((author) => author).join(', ')}</h3>
          </div>
          <p className="description">{description}</p>
          <ReadMeta>
            <Status status={status}>{status}</Status>
            {start !== 'Invalid date' ? <p>Start: {start}</p> : null}
            {finished !== 'Invalid date' ? <p>Finished: {finished}</p> : null}
            {categories !== null ? <Tags tags={categories} /> : null}
            <p title={`${rating} out of 5 stars`}>
              {'⭐'.repeat(rating)}
              <span style={{ filter: 'grayscale(100%)' }}>{'⭐'.repeat(5 - rating)}</span>
            </p>
          </ReadMeta>
        </div>
      </ReadsCardContainer>
    </a>
  );
}

ReadsCard.propTypes = {
  read: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape, PropTypes.oneOfType([PropTypes.string])),
    localFile: PropTypes.object,
    fields: PropTypes.shape({
      status: PropTypes.string,
      start: PropTypes.string,
      finished: PropTypes.string,
      pageCount: PropTypes.number,
      rating: PropTypes.number,
    }),
  }),
};
