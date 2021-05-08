import styled from 'styled-components';

const PostContainer = styled.article`
  display: flex;
  flex-direction: column;
  margin: auto;
  padding-bottom: 0;
  width: clamp(300px, 60vw, 1000px);

  & > .heroImage {
    border-radius: var(--borderRadius);
    max-width: 1200px;
    margin: 1rem 0;
    margin-bottom: 2rem;
    filter: drop-shadow(var(--shadow));
  }

  .progress-bar {
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 999;

    & > path {
      stroke: var(--accent);
    }
  }
`;

const PostBodyContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 2rem;

  .content {
    max-width: 700px;
  }

  & > h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    position: relative;

    /* This is for the link emoji next to the headers on hover */
    & > a {
      text-decoration: none;
      width: 100%;

      :hover {
        text-decoration: underline;

        & ::before {
          content: '🔗';
          transform: translateX(-2.5rem);
          position: absolute;
          font-size: 1.6rem;
          bottom: 12.5px;

          @media (max-width: 600px) {
            display: none;
          }
        }
      }
    }
  }
`;

const BlogHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  justify-content: center;
  width: clamp(300px, 60vw, 800px);

  .postTitle {
    font-size: 4.5rem;
    text-align: center;
    margin: 1rem;
  }

  .tagContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    & > .tag {
      padding: 1.25rem 2rem;
      background-color: var(--accent);
      filter: drop-shadow(var(--shadow));
      border-radius: var(--borderRadius);
      color: var(--accentText);
      font-weight: bold;
      font-size: 1.4rem;
    }
  }
`;

export { PostContainer, PostBodyContainer, BlogHeader };
