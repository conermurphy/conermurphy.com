import { createGlobalStyle } from 'styled-components';

import jostLight from '../assets/fonts/Jost-Light.woff2';
import jostRegular from '../assets/fonts/Jost-Regular.woff2';
import jostMedium from '../assets/fonts/Jost-Medium.woff2';
import openSansLight from '../assets/fonts/Open-Sans-Light.woff2';
import openSansSemiBold from '../assets/fonts/Open-Sans-Semi-Bold.woff2';
import inconsolataRegular from '../assets/fonts/Inconsolata-Regular.woff2';

const Typography = createGlobalStyle`
    @font-face {
    font-family: "Jost";
    src: url(${jostLight}) format("woff2");
    font-weight: 300;
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
    @font-face {
    font-family: "Inconsolata";
    src: url(${inconsolataRegular}) format("woff2");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
    }

<<<<<<< HEAD
    html, p, strong, a, li, ol, ul, code, span {
    font-family: 'Inconsolata', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 400;
    color: var(--black);
=======
    html {
    font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    font-weight: 300;
    color: var(--primaryText);
    letter-spacing: 0.5px;
>>>>>>> redesign-v4
  }

  /* Header Styles */

  h1,h2,h3,h4,h5,h6 {
<<<<<<< HEAD
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: normal;
    margin: 0;
    word-break: break-word;
  }

  code span {
    color: var(--white);
  }

=======
    color: var(--headerText);
  }

  h1,h2,h3 {
    font-family: 'Jost', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    font-weight: 500;
  }

  h4,h5,h6 {
    font-family: 'Jost', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    font-weight: 400;
  }

  h1 {
    font-size: 6rem;
  } 
  h2 {
    font-size: 4.5rem;
  } 
  h3 {
    font-size: 2.5rem;
  } 
  h4 {
    font-size: 2rem;
  }

  code {
    font-family: 'Inconsolata', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    font-weight: 400;
  }

  .subtitle {
    font-family: 'Jost', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    font-weight: 300;
    color: var(--primaryText);
    margin-top: 2rem;
    width: clamp(300px, 30vw, 500px);
  }

  .title {
    margin-bottom: 1rem;
    margin-top: 0;
    width: clamp(300px, 30vw, 450px);
  }

  /* Individual element Styles */

>>>>>>> redesign-v4
  a {
    color: var(--black);
    text-decoration-color: var(--green);
  }

  p, li, ul, span, button, label, a {
    font-size: 1.6rem;
    line-height: var(--lh);
    color: var(--primaryText);
    
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

<<<<<<< HEAD
  .headerTitleSeperator {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 2rem;
    position: relative;

    ::after,
    ::before {
      border-bottom: 2px solid var(--grey);
      width: 100%;
      content: '';
      position: absolute;
      bottom: 0;
    }

    @media (max-width: 1200px) {
      justify-content: space-evenly;
    }
    
    @media (max-width: 600px) {
      justify-content: center;
    }


    & > h1, h2, h3, h4, h5, h6 {
      font-size: 2.5rem;
      text-transform: uppercase;
      position: relative;


      ::before {
        border-bottom: 2px solid var(--green);
        width: 100%;
        content: '';
        position: absolute;
        bottom: -2rem;
        z-index: 2;
      }
    }
    
    a {
      text-decoration: none;
    }
  }

=======
>>>>>>> redesign-v4
`;

export default Typography;
