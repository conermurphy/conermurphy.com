import styled from 'styled-components';

const LandingSection = styled.section`
  width: 1200px;
  display: grid;
  grid-template-columns: 50% 0.75fr;
  gap: 5rem;
  align-items: center;
  margin-top: 140px;
  margin-bottom: 80px;
  justify-content: space-evenly;

  h1 {
    color: var(--white);
    font-size: 8rem;
    text-transform: uppercase;
    font-family: var(--body-font);

    span {
      display: table;
      background-color: var(--green);
      color: var(--white);
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
      border: 3px solid var(--green);
      background-color: var(--white);
      border-radius: 40px;
      color: var(--black);
    }
  }
`;

const InfoBlock = styled.div`
  background-color: var(--white);
  border-radius: 40px;
  width: 25vw;
  height: 35rem;
  filter: var(--dropShadow);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
  position: relative;

  .aboutMe {
    padding: 2.5rem;
    background-color: var(--green);
    width: calc(100% - 5rem);
    text-align: right;
    color: var(--white);
  }

  img {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    border: 0.5rem solid var(--green);
    position: absolute;
    top: 4rem;
    left: 2.5rem;
  }

  ul {
    list-style: none;
    text-align: right;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;

    li {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: 2rem;
      padding: 1rem 2.5rem;
    }

    svg {
      background-color: var(--grey);
      padding: 0.75rem;
      margin: 0.25rem;
      margin-left: 1rem;
      border-radius: 10px;
    }
  }
`;

const HeroBackground = styled.div`
  position: absolute;
  background-color: var(--black);
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

const ContentSection = styled.section`
  margin-bottom: 5rem;
  .contentTitle {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 0 2rem;
    padding-bottom: 2rem;
    position: relative;

    ::after,
    ::before {
      border-bottom: 2px solid var(--grey);
      width: 100%;
      content: '';
      position: absolute;
      bottom: 0;
    }

    h3 {
      font-size: 2.5rem;
      text-transform: uppercase;
      font-family: var(--body-font);
      position: relative;

      ::before {
        border-bottom: 2px solid var(--green);
        width: 100%;
        content: '';
        position: absolute;
        bottom: -2rem;
        z-index: 2;
      }
    }

    a {
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export { ContentSection, LandingSection, InfoBlock, HeroBackground };
