import React from 'react';
import styled from 'styled-components';
import { Logo } from '../icons';
import Router from 'next/router';
import Footer from './Footer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 3;
  height: 100%;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  top: 0;
  position: absolute;
  background-color: ${({ theme }) => theme.bg.header};
  z-index: 999;
`;

const Area = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  flex: 1;
`;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  border-bottom: 1px solid ${({ border, theme }) => border ? theme.bg.border : 'transparent'};
  background-color: ${({ theme }) => theme.bg.content};
  margin-top: 65px;
  padding: 10px 0;
`;

const WrapContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  width: 100%;
  padding: 0px 15px 30px;
  color: ${({ theme }) => theme.text.primary};
  font-size: 18px;
  max-width: 800px;
`;

const WrapLogo = styled(Logo)`
  height: 45px;
  margin: 10px 15px;
  transition: all 0.25s ease 0s;
  cursor: pointer;
`;

const Panel = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.bg.content};
  transition: height 0.5s cubic-bezier(0, 0, 0.1, 1) 0s, visibility 0s ease 0s;
  overflow-y: auto;

  width: 100%;
  height: 100%;
  border-radius: 0;
`;

const Page = ({ children, heading, darkMode, setDarkMode }) => {
  return (
    <Container>
      <Header>
        <WrapLogo onClick={() => Router.push('/')} fill="#fff" />
      </Header>
      <Panel>
        <WrapContent>
          <Area>
            <Heading border={!!heading}>{heading}</Heading>
            <Content>{children}</Content>
          </Area>
          <Footer darkMode={darkMode} setDarkMode={setDarkMode} />
        </WrapContent>
      </Panel>
    </Container>
  );
};

export default Page;
