//Importing dependcies from other sources to be worked with.
import React from 'react'
import Sidebar from './sidebar'
import layoutStyles from './styles/layout.module.css'
import 'normalize.css' // Installing Normalize css

if (typeof window !== "undefined") {
  // eslint-disable-next-line global-require
  require("smooth-scroll")('a[href*="#"]')
}

// What is rendered to the page
export default () => {
    return (
      <div className={layoutStyles.layoutContainer}>
        <Sidebar/>
      </div>
    )
}

