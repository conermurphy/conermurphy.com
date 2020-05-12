import { createGlobalStyle } from 'styled-components';

const MontserratSemiBold = 'src/assets/fonts/Montserrat-SemiBold.ttf';
const MontserratRegular = 'src/assets/fonts/Montserrat-Regular.ttf';

const Fonts = createGlobalStyle`
  @font-face {
    font-family: 'Montserrat';
    src: url(${MontserratRegular}) format('tff');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'Montserrat';
    src: url(${MontserratSemiBold}) format('tff');
    font-weight: 600;
    font-style: normal;
  }
`;

export default Fonts;
