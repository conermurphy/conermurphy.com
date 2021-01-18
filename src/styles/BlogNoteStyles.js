import styled from 'styled-components';

const PostBodyContainer = styled.div`
  & > h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    position: relative;

    & > a {
      text-decoration: none;
      width: 100%;

      :hover {
        text-decoration: underline;

        & ::before {
          content: '🔗';
          transform: translateX(-2rem);
          position: absolute;
          font-size: 1.5rem;
          bottom: 12.5px;

          @media (max-width: 600px) {
            display: none;
          }
        }
      }
    }
  }
`;

const PostContainer = styled.article`
  display: flex;
  flex-direction: column;
  margin: auto;
  padding-bottom: 0;
  max-width: 700px;

  @media (max-width: 800px) {
    margin: 2.5rem;
  }

  & > .heroImage {
    border-radius: var(--borderRadius);
    max-width: 1200px;
    position: relative;
    margin: 1rem 0;
    margin-bottom: 2rem;
    filter: drop-shadow(var(--shadow));
  }
`;

export { PostContainer, PostBodyContainer };
