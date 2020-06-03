import { createGlobalStyle } from 'styled-components';

const MontserratSemiBold = '../assets/fonts/Montserrat-SemiBold.woff2';
const MontserratRegular = '../assets/fonts/Montserrat-Regular.woff2';
const InconsolataSemiBold = '../assets/fonts/Inconsolata-SemiBold.woff2';
const InconsolataRegular = '../assets/fonts/Inconsolata-Regular.woff2';

const Fonts = createGlobalStyle`
  @font-face {
    font-family: 'Montserrat';
    src: url(${MontserratRegular}) format('woff2');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'Montserrat';
    src: url(${MontserratSemiBold}) format('woff2');
    font-weight: 600;
    font-style: normal;
  }
  @font-face {
    font-family: 'Inconsolata';
    src: url(${InconsolataRegular}) format('woff2');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'Inconsolata';
    src: url(${InconsolataSemiBold}) format('woff2');
    font-weight: 600;
    font-style: normal;
  }
`;

export default Fonts;
