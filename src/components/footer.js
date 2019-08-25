import React from "react"
import footerStyles from "./footer.module.css"
import {FaTwitter} from 'react-icons/fa';
import {FaInstagram} from 'react-icons/fa';
import {FaEnvelope} from 'react-icons/fa';
import {FaMediumM} from 'react-icons/fa';
import {FaGithub} from 'react-icons/fa';

export default () => {
    return (
        <div className={footerStyles.footer}>
              <div className={footerStyles.homeSocialBoxContainer}>
                <div className={footerStyles.homeSocialBox}><a href="https://twitter.com/ConerMMurphy" aria-label="Twitter" target="_blank" rel="noopener noreferrer"><FaTwitter/></a></div>
                <div className={footerStyles.homeSocialBox}><a href="https://www.instagram.com/conermurphy/" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><FaInstagram/></a></div>
                <div className={footerStyles.homeSocialBox}><a href="https://conermurphy.typeform.com/to/CUZ4g6" aria-label="Email" target="_blank" rel="noopener noreferrer"><FaEnvelope/></a></div>
                <div className={footerStyles.homeSocialBox}><a href="https://medium.com/@conermurphy" aria-label="Medium" target="_blank" rel="noopener noreferrer"><FaMediumM/></a></div>
                <div className={footerStyles.homeSocialBox}><a href="https://github.com/conermurphy" aria-label="Github" target="_blank" rel="noopener noreferrer"><FaGithub/></a></div>
              </div>
              <p>Copyright © 2019 Coner Murphy. All Rights Reserved.</p>
        </div>
    )
}