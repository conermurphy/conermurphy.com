import { createGlobalStyle } from 'styled-components';

import jostLight from '../assets/fonts/Jost-Light.woff2';
import jostRegular from '../assets/fonts/Jost-Regular.woff2';
import jostMedium from '../assets/fonts/Jost-Medium.woff2';
import openSansLight from '../assets/fonts/Open-Sans-Light.woff2';
import openSansSemiBold from '../assets/fonts/Open-Sans-Semi-Bold.woff2';

const Typography = createGlobalStyle`
    @font-face {
    font-family: "Jost";
    src: url(${jostLight}) format("woff2");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
    }
    @font-face {
    font-family: "Jost";
    src: url(${jostRegular}) format("woff2");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
    }
    @font-face {
    font-family: "Jost";
    src: url(${jostMedium}) format("woff2");
    font-weight: 500;
    font-style: normal;
    font-display: swap;
    }
    @font-face {
    font-family: "Open Sans";
    src: url(${openSansLight}) format("woff2");
    font-weight: 300;
    font-style: normal;
    font-display: swap;
    }
    @font-face {
    font-family: "Open Sans";
    src: url(${openSansSemiBold}) format("woff2");
    font-weight: 600;
    font-style: normal;
    font-display: swap;
    }

    html {
    font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    font-weight: 300;
    color: var(--black);
  }

  h1,h2,h3,h4,h5,h6 {
    font-family: 'Jost', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    font-weight: 500;
  }

  a {
    color: var(--black);
    text-decoration-color: var(--green);
  }

  p, li, ul {
    font-size: 1.75rem;
    line-height: var(--lh);
    
  }

  ul {
    list-style: none;
    padding-left: 0;
  }

  ol, ul {
    & > li {
      padding: 0.5rem 0;
    }
  }

  .center {
      text-align: center;
  }

`;

export default Typography;
