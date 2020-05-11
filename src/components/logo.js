import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import logo from '../../static/profileImgs/CM-Logo-2019.svg';

const LogoImg = styled.svg`
  height: ${props => props.height};
  fill: var(--body-font-color);
  transform: scale(1, -1);
`;

const Logo = ({ height }) => (
  <Link to="/" aria-label="Home">
    <LogoImg version="1.1" id="svg2" xmlSpace="preserve" height={height} viewBox="0 0 600 600">
      <path
        style={{
          opacity: 1,
          fillOpacity: 1,
          stroke: 'none',
          strokeWidth: 37.5,
          strokeMiterlimit: 4,
          strokeDasharray: 'none',
          strokeOpacity: 1,
        }}
        d="m 172.21662,425.46608 c -69.18466,0 -125.468362,-56.2833 -125.468362,-125.46388 0,-69.18059 56.283702,-125.46826 125.468362,-125.46826 34.21695,0 66.18901,13.52454 90.02926,38.0874 l -28.79738,27.95508 c -16.21732,-16.69904 -37.96163,-25.8999 -61.23188,-25.8999 -47.05036,0 -85.325662,38.27532 -85.325662,85.32568 0,47.04633 38.275302,85.3213 85.325662,85.3213 19.6053,0 34.68203,-2.71297 50.40961,-9.0835 17.39355,-7.04892 33.91155,-18.32117 49.09717,-33.50684 l 87.8306,-87.82324 c 22.51962,-22.53165 59.16116,-22.52362 81.67676,0 l 0.87891,0.87598 70.99951,91.16601 v -159.5039 h 40.14258 V 377.9568 c 0,12.59652 -8.00443,23.80455 -19.91455,27.89502 -11.93018,4.10652 -25.1134,0.1606 -32.84473,-9.77051 L 412.11259,282.59693 c -6.91243,-6.16983 -17.54727,-5.93308 -24.17871,0.69434 l -87.8262,87.82618 c -19.00313,19.01121 -40.00538,33.2531 -62.4126,42.32519 -20.5326,8.31741 -40.72298,12.02344 -65.47846,12.02344 z"
      />
    </LogoImg>
  </Link>
);

Logo.propTypes = {
  height: PropTypes.string.isRequired,
};

export default Logo;
