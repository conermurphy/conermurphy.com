//Importing dependcies from other sources to be worked with.
import React from 'react'
import Sidebar from './sidebar'
import 'normalize.css' // Installing Normalize css
import styled from 'styled-components'
import '../styles/global.css'
import {device} from './device'

if (typeof window !== "undefined") {
  // eslint-disable-next-line global-require
  require("smooth-scroll")('a[href*="#"]')
}

const LayoutContainer = styled.div`
    display: grid;
    grid-template-areas: 'sidebar main ';
    grid-template-columns: 17.5vw auto ;

  @media ${device.laptop} {
    display: grid;
    grid-template-areas: 'sidebar main';
    grid-template-columns: 17.5vw auto;
    };

  @media ${device.tablet} {
    display: grid;
    grid-template-areas: 'sidebar',
                          'main'
                        ;
    grid-template-columns: auto;
  };
    
`

const MainSectionContainer = styled.div`{
    grid-area: main;
    margin: 5rem 15rem;
    justify-self: center;
    width: fit-content;

  @media ${device.laptop} {
    grid-area: main;
    margin: 5rem;
    width: fit-content;
  };

  @media ${device.tablet} {
    grid-area: main;
    margin: 5rem;
    width: fit-content;
  };
    
    
`

// Template for other pages to use.
const Layout = (props) => {

    return (
      <LayoutContainer>
        <Sidebar/>
        <MainSectionContainer>
          {props.children}
        </MainSectionContainer>
      </LayoutContainer>
    )
}

export default Layout
