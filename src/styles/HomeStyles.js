import styled from 'styled-components';

const LandingSection = styled.section`
  width: 1200px;
  display: grid;
  grid-template-columns: 50% 0.75fr;
  gap: 5rem;
  align-items: center;
  height: 450px;
  margin-bottom: 100px;
  justify-content: space-evenly;

  h1 {
    color: var(--white);
    font-size: 8rem;
    text-transform: uppercase;
    font-family: var(--body-font);

    span {
      display: block;
      color: var(--white);
    }
  }

  .contactBlock {
    display: grid;
    grid-template-rows: repeat(2, 0.5fr);
    row-gap: 0.25rem;

    p {
      font-size: 2rem;
      overflow-wrap: break-word;
      color: var(--white);
      max-width: 500px;
    }
  }
`;

const InfoBlock = styled.div`
  background-color: var(--white);
  width: 20vw;
  height: 35rem;
  filter: drop-shadow(var(--shadow));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
  position: relative;

  .aboutMe {
    padding: 2.5rem;
    background-color: var(--grey);
    width: calc(100% - 5rem);
    text-align: right;
    color: var(--black);
    font-family: var(--header-font);
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
      border-radius: 5px;
    }
  }
`;

const HeroBackground = styled.div`
  position: absolute;
  background-color: var(--black);
  width: 100vw;
  height: 650px;
  top: 0;
  overflow: hidden;
  left: 0;
  z-index: -1;
  filter: drop-shadow(var(--shadow));
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

  & > .content {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 4rem;
    padding: 5rem;

    * {
      text-decoration: none;
    }
  }
`;

export { ContentSection, LandingSection, InfoBlock, HeroBackground };
