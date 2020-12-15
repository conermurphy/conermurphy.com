import React from 'react';
import styled from 'styled-components';

const LandingSection = styled.section`
  width: 1200px;
  display: grid;
  grid-template-columns: 50% 0.75fr;
  gap: 5rem;
  margin-top: 120px;
  justify-content: space-evenly;

  h1 {
    color: var(--white);
    font-size: 8rem;
    text-transform: uppercase;
    font-family: var(--body-font);

    span {
      display: table;
      background-color: var(--white);
      color: var(--black);
      padding: 7.5px;
      filter: --drop-shadow();
      border-radius: 10px;
    }
  }

  .contactBlock {
    display: grid;
    grid-template-rows: repeat(3, 0.5fr);
    row-gap: 2.5rem;

    p {
      font-size: 3rem;
      overflow-wrap: break-word;
    }

    button {
      height: 5rem;
      width: 15rem;
      background-color: var(--blue);
      border: none;
      border-radius: 40px;
      color: var(--white);
    }
  }

  .infoBlock {
    background-color: var(--white);
    border-radius: 40px;
    filter: var(--dropShadow);
    padding: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;

    img {
      width: 5rem;
      height: 5rem;
      border-radius: 10px;
      border: 5px solid var(--blue);
    }

    ul {
      list-style: none;
      text-align: right;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      height: 100%;
      margin-bottom: 0;

      li {
        font-size: 2.5rem;
      }
    }
  }
`;

const HeroBackground = styled.div`
  position: absolute;
  background-color: var(--blue);
  width: 100vw;
  height: 750px;
  transform: skewY(-12.5deg);
  transform-origin: -45% 100%;
  top: 0;
  overflow: hidden;
  left: 0;
  z-index: -1;
  filter: var(--dropShadow);
`;

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
        </div>
        <div className="infoBlock">
          <img src="" alt="Selfie" />
          <ul>
            <li>Name</li>
            <li>Location</li>
            <li>Languages</li>
            <li>Social Media</li>
          </ul>
        </div>
      </LandingSection>
    </>
  );
}
