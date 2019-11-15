//Importing dependcies from other sources to be worked with.
import React from 'react'
import Sidebar from './sidebar'
import 'normalize.css' // Installing Normalize css
import styled from 'styled-components'
import '../styles/global.css'

if (typeof window !== "undefined") {
  // eslint-disable-next-line global-require
  require("smooth-scroll")('a[href*="#"]')
}

const LayoutContainer = styled.div`
  display: grid;
  grid-template-areas: 'sidebar main ';
  grid-template-columns: 17.5vw auto ;
`

const MainSectionContainer = styled.div`
  grid-area: main;
    margin: 5rem 15rem;
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
