import React from 'react';
import { MdPersonPin, MdLocationOn, MdLanguage, MdContacts } from 'react-icons/md';
import { Link } from 'gatsby';
import { ContentSection, HeroBackground, InfoBlock, LandingSection } from '../styles/HomeStyles';

export default function HomePage() {
  return (
    <>
      <HeroBackground />
      <LandingSection>
        <div className="contactBlock">
          <h1>
            Hey, <span>I'm Coner.</span>
          </h1>
          <p>XXXXXXX XXXXXXXXXXXX XXXXXXXX</p>
          <button type="button">Say Hi!</button>
          {/* Add in subscribe to email list field */}
        </div>
        <InfoBlock>
          <div className="aboutMe">
            <h3>About Me</h3>
          </div>
          <img src="" alt="Selfie" />
          <ul>
            <li>
              Coner Murphy <MdPersonPin />
            </li>

            <li>
              Norwich, United Kingdom <MdLocationOn />
            </li>
            <li>
              {/* TODO: Come back and add in a map for each language in a sub list */}
              Languages <MdLanguage />
            </li>
            <li>
              {/* TODO: Come back and add in a list of contact methods with links */}
              Social Media <MdContacts />
            </li>
          </ul>
        </InfoBlock>
      </LandingSection>
      <ContentSection>
        <div className="contentTitle">
          <h3>Blog</h3>
          <Link to="/blog">View All</Link>
        </div>
        <div className="content">{/* TODO: Add in Blog Posts and create custom template for them */}</div>
      </ContentSection>
      <ContentSection>
        <div className="contentTitle">
          <h3>Notes</h3>
          <Link to="/notes">View All</Link>
        </div>
        <div className="content">{/* TODO: Add in Blog Posts and create custom template for them */}</div>
      </ContentSection>
      <ContentSection>
        <div className="contentTitle">
          <h3>Portfolio</h3>
          <Link to="/portfolio">View All</Link>
        </div>
        <div className="content">{/* TODO: Add in Blog Posts and create custom template for them */}</div>
      </ContentSection>
      <ContentSection>
        <div className="contentTitle">
          <h3>testimonials</h3>
        </div>
        <div className="content">{/* TODO: Add in Blog Posts and create custom template for them */}</div>
      </ContentSection>
    </>
  );
}
