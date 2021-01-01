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

  .languages {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    gap: 0rem;

    & > li {
      padding: 0.25rem;
      margin: 0;

      & a {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      & svg {
        margin: 0; // This is to override the styling on the svg above
        background-color: var(--white);
      }
    }

    .contactIcon {
      svg {
        fill: var(--black);
        margin: 0rem 0.5rem;
      }
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
  & > .content {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 4rem;
    padding: 5rem;

    * {
      text-decoration: none;
    }
  }

  & > .testimonial {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
`;

const NotesContentSection = styled.section`
  & > .content {
    display: flex;
    flex-direction: column;
    padding: 2.5rem 0;

    & > a :last-child {
      > div:last-child {
        border-bottom: none;
      }
    }

    * {
      text-decoration: none;
    }
  }
`;

export { ContentSection, LandingSection, InfoBlock, HeroBackground, NotesContentSection };
