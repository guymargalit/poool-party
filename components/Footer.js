import Router from 'next/router';
import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  background-color: ${({ theme }) => theme.bg.sky};
  padding: 0 20px;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
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
  transition: all 0.25s ease 0s;
`;

const FooterText = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  font-weight: 600;
`;

const Footer = () => {
  return (
    <Container>
      <Content>
        <Items>
          <FooterText>© 2021 Birthday Guy, LLC</FooterText>
        </Items>
        <Items>
          <Item onClick={() => Router.push('/faq')}>FAQs</Item>
          <Item onClick={() => Router.push('/terms')}>Terms</Item>
          <Item onClick={() => Router.push('/privacy')}>Privacy</Item>
        </Items>
      </Content>
    </Container>
  );
};

export default Footer;
