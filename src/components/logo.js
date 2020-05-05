import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import logo from '../../static/profileImgs/CM-Logo-2019.svg';

const LogoImg = styled.img`
  height: ${props => props.height};
`;

const Logo = ({ height }) => (
  <Link to="/">
    <LogoImg src={logo} alt="Coner Murphy Creative Logo " height={height} />
  </Link>
);

Logo.propTypes = {
  height: PropTypes.string.isRequired,
};

export default Logo;
