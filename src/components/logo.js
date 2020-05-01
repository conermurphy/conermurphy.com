import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import logo from '../../static/profileImgs/CM-Logo-2019.svg';

const LogoImg = styled.img`
  height: ${props => props.height};
`;

const Logo = ({ height }) => <LogoImg src={logo} alt="Coner Murphy Creative Logo " height={height} />;

Logo.propTypes = {
  height: PropTypes.string.isRequired,
};

export default Logo;
