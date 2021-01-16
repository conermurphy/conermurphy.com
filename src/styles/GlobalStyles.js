import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --green: #498B41;
    --red: #ED6E78;
    --black: #2e2e2e;
    --grey: hsl(0, 0%, 93%);
    --white: #ffffff;
    --scrollBarWidth: 6px;
    --layoutWidth: 1080px;
    --shadow: 0px 4px 6px rgba(0,0,0,0.22);
    --borderRadius: 10px;
    --lh: 2.5rem;
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
    background-color: var(--black) ;
  }

  .grvsc-container {
    border-radius: 0 !important; // To override the styling coming from the padding-left

    @media (max-width: 600px) {
      padding: 0 !important;
      overflow-wrap: anywhere !important;
    }
    
  }

`;

export default GlobalStyles;
