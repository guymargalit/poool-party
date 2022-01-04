import Router from 'next/router';
import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  position: ${({ fixed }) => (fixed ? 'fixed' : 'relative')};
  bottom: 0;
  background-color: ${({ theme }) => theme.bg.sky};
  padding: 0 20px;
  z-index: 10;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 420px) {
    flex-direction: column-reverse;
    justify-content: center;
  }
`;

const Items = styled.div`
  display: flex;
`;

const Item = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  font-weight: 600;
  padding: 3px 5px;
  cursor: pointer;
  border-radius: 5px;
  @media (hover: hover) and (pointer: fine) {
    :hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
  :active {
    background-color: rgba(255, 255, 255, 0.1);
  }
  transition: all 0.25s ease 0s;
`;

const FooterText = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  font-weight: 600;
`;

const Footer = ({ fixed }) => {
  return (
    <Container fixed={fixed}>
      <Content>
        <Items>
          <FooterText>
            <a
              href="https://birthdayguy.co"
              rel="external nofollow noopener"
              target="_blank"
            >
              © 2021 Birthday Guy, LLC
            </a>
          </FooterText>
        </Items>
        <Items>
          <Item onClick={() => Router.push('/faq')}>FAQs</Item>
          <Item>
            <a
              href="mailto:help@poool.party"
              rel="external nofollow noopener"
              target="_blank"
            >
              Help
            </a>
          </Item>
          <Item onClick={() => Router.push('/terms')}>Terms</Item>
          <Item onClick={() => Router.push('/privacy')}>Privacy</Item>
        </Items>
      </Content>
    </Container>
  );
};

export default Footer;
