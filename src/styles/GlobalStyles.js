import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --green: #498B41;
    --red: #ED6E78;
    --black: #2e2e2e;
    --grey: hsl(0, 0%, 93%);
    --white: #ffffff;
    --scrollBarWidth: 12px;
    --layoutWidth: 1080px;
    --shadow: 0px 4px 6px rgba(0,0,0,0.22);
    --borderRadius: 10px;
  }

   html {
       font-size: 10px;
       overflow-x: hidden;
   } 

   body {
       font-size: 2rem;
   }

   /* Scrollbar Styles */
  body::-webkit-scrollbar {
    width: var(--scrollBarWidth);
  }
  html {
    scrollbar-width: thin;
    scrollbar-color: var(--black) var(--white);
  }
  body::-webkit-scrollbar-track {
    background: var(--white);
  }
  body::-webkit-scrollbar-thumb {
    background-color: var(--green) ;
    border-radius: 6px;
    border: 3px solid var(--white);
  }

  .headerTitleSeperator {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 0 2rem;
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

    & > h1, h2, h3, h4, h5, h6 {
      font-size: 2.5rem;
      text-transform: uppercase;
      font-family: var(--body-font);
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
      font-weight: bold;
    }
  }

`;

export default GlobalStyles;
