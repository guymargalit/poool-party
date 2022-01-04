import React from 'react';
import styled from 'styled-components';
import { Logo } from '../icons';
import Router from 'next/router';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  z-index: 4;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  top: 0;
  position: fixed;
`;

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  left: 100px;
  position: absolute;
  align-items: flex-start;
  max-width: 500px;
  @media (max-width: 675px) {
    position: relative;
    align-items: center;
    left: 0px;
  }
`;

const Subtitle = styled.div`
  text-align: left;
  font-size: 50px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  @media (max-width: 675px) {
    text-align: center;
    max-width: 400px;
    font-size: 40px;
  }
`;

const Caption = styled.div`
  text-align: left;
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.white};
  margin: 20px 0px;
  @media (max-width: 675px) {
    text-align: center;
    font-size: 18px;
  }
`;

const WrapLogo = styled(Logo)`
  height: 60px;
  margin: 20px 25px;
  @media (max-width: 675px) {
    height: 50px;
    margin: 15px 20px;
  }
  transition: all 0.25s ease 0s;
  cursor: pointer;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  background-color: ${({ theme }) => theme.bg.sky};
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

const Page404 = () => {
  return (
    <Container>
      <Header>
        <WrapLogo onClick={() => Router.push('/')} fill={'#fff'} />
      </Header>
      <Hero>
        <Subtitle>Uh oh.</Subtitle>
        <Caption>This page doesn't exist.</Caption>
      </Hero>
      <Footer>
        <Item onClick={() => Router.push('/privacy')}>Privacy</Item>
      </Footer>
    </Container>
  );
};

export default Page404;
