import React from 'react';
import styled from 'styled-components';

const FooterBody = styled.footer`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: var(--grey);
  color: var(--white);
  filter: var(--dropShadow);

  .copyright {
    background-color: var(--black);
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 450px);
  align-items: center;
  justify-content: space-evenly;
  text-align: center;

  div {
    display: flex;
    flex-direction: center;
    align-items: flex-start;
    justify-content: center;
    margin: 2rem;
    background-color: var(--white);
    border-radius: var(--borderRadius);
    filter: var(--dropShadow);
    max-height: 400px;
    overflow-x: hidden;
  }

  h4 {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    /* background-color: var(--grey); */
    border-bottom: 2px solid var(--green);
    color: var(--black);

    span {
      border-radius: 5px;
      padding: 10px;
      font-size: 1.75rem;
    }
  }
`;

export default function Footer() {
  return (
    <FooterBody>
      <ContentGrid>
        <div>
          <h4>
            <span>Tweets</span>
          </h4>
        </div>
        <div>
          <h4>
            <span>Blog Posts</span>
          </h4>
        </div>
        <div>
          <h4>
            <span>Newsletter</span>
          </h4>
        </div>
      </ContentGrid>
      <div className="copyright">
        <p className="center">&copy; Coner Murphy {new Date().getFullYear()}</p>
      </div>
    </FooterBody>
  );
}
