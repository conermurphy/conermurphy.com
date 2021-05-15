import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primaryBg: ${({ theme }) => theme.primaryBg};
    --secondaryBg: ${({ theme }) => theme.secondaryBg};
    --accent: ${({ theme }) => theme.accent};
    --primaryText: ${({ theme }) => theme.primaryText};
    --headerText: ${({ theme }) => theme.headerText};
    --accentText: ${({ theme }) => theme.accentText};
    --shadow: ${({ theme }) => theme.shadow};
    --scrollBarWidth: ${({ theme }) => theme.scrollBarWidth};
    --lh: ${({ theme }) => theme.lh};
    --borderRadius: ${({ theme }) => theme.borderRadius};
    --maxWidth: ${({ theme }) => theme.maxWidth};
  }


   html {
       font-size: 10px;
       overflow-x: hidden;
   } 

   body {
       font-size: 2rem;
   }

   .postLinks {
     text-decoration: none;
   }

   .callToAction {
    background-color: var(--accent);
    padding: 1.5rem 5rem;
    color: var(--accentText);
    border-radius: var(--borderRadius);
    display: flex;
    align-items: center;
    gap: 1rem;
    text-decoration: none;
    font-weight: 600;
    filter: drop-shadow(var(--shadow));
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
