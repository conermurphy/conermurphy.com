import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primaryBg: #FFFFFF;
    --secondaryBg: #F9F9FB;
    --accent: #4E66A6;
    --primaryText: #000000;
    --headerText: #323B49;
    --accentText: #FAFAFC;
    --shadow: 0px 2px 4px rgba(0,0,0,0.25);
    --scrollBarWidth: 6px;
    --lh: 2.5rem;
    --borderRadius: 1rem;
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
