import { createGlobalStyle } from 'styled-components';

import montserratNormal from '../assets/fonts/Montserrat-Regular.woff2';
import montserratSemiBold from '../assets/fonts/Montserrat-SemiBold.woff2';
import inconsolataRegular from '../assets/fonts/Inconsolata-Regular.woff2';
import inconsolataSemiBold from '../assets/fonts/Inconsolata-SemiBold.woff2';

const Typography = createGlobalStyle`
    @font-face {
    font-family: "Montserrat";
    src: url(${montserratNormal}) format("woff2");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
    }
    /* @font-face {
    font-family: "Montserrat";
    src: url(${montserratSemiBold}) format("woff2");
    font-weight: 600;
    font-style: normal;
    font-display: swap;
    } */
    @font-face {
    font-family: "Inconsolata";
    src: url(${inconsolataRegular}) format("woff2");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
    }
    /* @font-face {
    font-family: "Inconsolata";
    src: url(${inconsolataSemiBold}) format("woff2");
    font-weight: 600;
    font-style: normal;
    font-display: swap;
    } */

    html {
    font-family: Inconsolata, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 400;
    color: var(--black);
  }

  h1,h2,h3,h4,h5,h6 {
    font-family: Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: normal;
    margin: 0;
  }

  a {
    color: var(--black);
    text-decoration-color: var(--red);
  }

  .center {
      text-align: center;
  }

`;

export default Typography;
