import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function ReadsCard({ read }) {
  const { items, localFile, fields } = read;
  const {
    volumeInfo: { title, categories, authors, description, infoLink },
    id,
  } = items[0];
  const { status, start, finished, pageCount, rating } = fields;
  return (
    <div>
      <h2>{title}</h2>
    </div>
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
