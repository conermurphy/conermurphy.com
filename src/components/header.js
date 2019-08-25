import React from "react"
import { Link } from "gatsby"
import headerStyles from "./header.module.css"


const ListLink = props => (
    <Link to={props.to} className={headerStyles.headerLinks}>{props.children}</Link>
  )

export default () => {
    return (
        <div className={headerStyles.header}>
            <div className={headerStyles.logo}></div>
            <div className={headerStyles.nav}>
                <ListLink to="/">Home</ListLink>
                <ListLink to="#about">About</ListLink>
                <ListLink to="/projects">Projects</ListLink>
                <ListLink to="/writing">Writing</ListLink>
                <ListLink to="#contact">Contact</ListLink>
            </div>
        </div>
    )
}