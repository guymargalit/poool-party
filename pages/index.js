import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { signIn } from 'next-auth/client';
import {
  IconApple,
  IconClose,
  IconEmpty,
  IconGoogle,
  IconAppleShare,
  Logo,
} from '../icons';

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
  position: absolute;
`;

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  left: 100px;
  position: absolute;
  align-items: center;
  @media (max-width: 675px) {
    position: relative;
    left: 0px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  z-index: 4;
  overflow: hidden;
`;

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`;

const Title = styled.div`
  text-align: center;
  font-size: 50px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  @media (max-width: 675px) {
    margin-top: 10%;
  }
`;

const Subtitle = styled.div`
  text-align: left;
  font-size: 50px;
  width: 450px;
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
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.white};
  margin: 20px;
  max-width: 450px;
  @media (max-width: 675px) {
    text-align: center;
    max-width: 350px;
    font-size: 14px;
  }
`;

const slide = keyframes`
  0% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0);
  }
`;

const Banner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 65px;
  user-select: none;
  bottom: 0;
  position: absolute;
  background-color: ${({ theme }) => theme.bg.content};
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1),
    0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  z-index: 999;
`;

const Icon = styled.img`
  width: 40px;
`;

const Share = styled(IconAppleShare)`
  width: 25px;
`;

const Close = styled(IconClose)`
  width: 15px;
  height: 15px;
  cursor: pointer;
  fill: ${({ theme }) => theme.text.primary};
  transition: all 0.25s ease 0s;
  @media (hover: hover) and (pointer: fine) {
    :hover {
      fill: ${({ theme }) => theme.colors.purple};
    }
  }
  margin-right: 5px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

const AppTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text.primary};
`;

const AppDescription = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text.primary};
`;

const Button = styled.div`
  display: flex;
  text-align: center;
  padding: 0.7rem 1.8rem;
  animation: 1s ease-out 0s 1 ${slide};
  align-items: center;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1),
    0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  color: ${({ theme }) => theme.colors.white};
  border-radius: 1.5rem;
  margin-top: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  justify-content: space-between;
  max-width: 500px;
  width: calc(100% - 40px);
  background-color: #e789b7;
  transition: all 0.25s ease 0s;
  @media (hover: hover) and (pointer: fine) {
    :hover {
      background-color: #eb68a8;
    }
  }
  @media (max-width: 675px) {
    width: 250px;
    padding: 0.5rem 1.2rem;
  }
`;

const Step = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text.primary};
  margin: 5px 0;
`;

const GetButton = styled.div`
  display: flex;
  text-align: center;
  width: 60px;
  height: 30px;
  padding: 1px;
  margin-right: 15px;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1),
    0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  color: ${({ theme }) => theme.colors.white};
  border-radius: 1.5rem;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  background-color: #5a489b;
  transition: all 0.25s ease 0s;
  @media (hover: hover) and (pointer: fine) {
    :hover {
      background-color: #111236;
    }
  }
`;

const Svg = styled.svg`
  animation: ${rotate} 2s linear infinite;
  width: 20px;
  height: 20px;
`;

const Circle = styled.circle`
  stroke: #fff;
  stroke-linecap: round;
  animation: ${dash} 1.5s ease-in-out infinite;
  fill: none;
  stroke-width: 8px;
`;

const TitleLogo = styled(Logo)`
  height: 150px;
  margin: 25px 25px 50px;
  @media (max-width: 675px) {
    height: 120px;
    margin: 25px 25px 80px;
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
`;

const AppleIcon = styled(IconApple)`
  width: 20px;
  height: 20px;
  display: inline-block;
  font-size: 1.5rem;
  flex-shrink: 0;
  user-select: none;
  transition: all 0.25s ease 0s;
  @media (max-width: 675px) {
    margin-right: 20px;
  }
`;

const GoogleIcon = styled(IconGoogle)`
  width: 20px;
  height: 20px;
  display: inline-block;
  font-size: 1.5rem;
  flex-shrink: 0;
  user-select: none;
  transition: all 0.25s ease 0s;
  @media (max-width: 675px) {
    margin-right: 20px;
  }
`;

const Empty = styled(IconEmpty)`
  width: 20px;
`;

const WrapModal = styled.div`
  visibility: ${({ modal }) => (modal ? 'visible' : 'hidden')};
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: ${({ modal }) =>
    modal ? ' rgba(0, 0, 0, 0.4)' : ' rgba(0, 0, 0, 0);'};
  transition: all 0.25s ease 0s;
`;

const Modal = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  z-index: 999;
  width: calc(100% - 20px);
  max-width: 340px;
  margin-bottom: 150px;
  background-color: ${({ theme }) => theme.bg.content};
  border-radius: 18px;
  transition: height 0.5s cubic-bezier(0, 0, 0.1, 1) 0s, visibility 0s ease 0s;
  visibility: ${({ modal }) => (modal ? 'visible' : 'hidden')};
  padding: 15px;
`;

const Home = () => {
  const [apple, setApple] = useState(false);
  const [google, setGoogle] = useState(false);
  const [banner, setBanner] = useState(true);
  const [modal, setModal] = useState(false);
  const handleApple = (e) => {
    e.preventDefault();
    setApple(true);
    signIn('apple', { callbackUrl: 'https://poool.party/dashboard' });
  };
  const handleGoogle = (e) => {
    e.preventDefault();
    setGoogle(true);
    signIn('google', { callbackUrl: 'https://poool.party/dashboard' });
  };

  const isIos = () => {
    var t = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(t);
  };

  const isInStandaloneMode = () => {
    return 'standalone' in window.navigator && window.navigator.standalone;
  };

  if (!isInStandaloneMode()) {
    return (
      <Container>
        {typeof window !== 'undefined' && !isIos() && banner && (
          <Banner>
            <Left>
              <Close onClick={() => setBanner(false)} />
              <Icon src={'/favicon.png'} />
              <Info>
                <AppTitle>Poool Party</AppTitle>
                <AppDescription>Add to Home Screen</AppDescription>
              </Info>
            </Left>
            <Right>
              <GetButton onClick={() => setModal(true)}>Get</GetButton>
            </Right>
          </Banner>
        )}
        <Header>
          <WrapLogo fill={'#fff'} />
        </Header>
        <Hero>
          <Subtitle>Make a splash.</Subtitle>
          <Caption>
            Poool Party lets you send Venmos to your friends, with easy
            splitting and monthly requests.
          </Caption>
          <Button onClick={handleApple}>
            <AppleIcon />
            Sign In with Apple
            {apple ? (
              <Svg viewBox="0 0 50 50">
                <Circle cx="25" cy="25" r="20"></Circle>
              </Svg>
            ) : (
              <Empty />
            )}
          </Button>
          <Button onClick={handleGoogle}>
            <GoogleIcon />
            Sign In with Google
            {google ? (
              <Svg viewBox="0 0 50 50">
                <Circle cx="25" cy="25" r="20"></Circle>
              </Svg>
            ) : (
              <Empty />
            )}
          </Button>
        </Hero>
        <WrapModal onClick={() => setModal(false)} modal={modal}>
          <Modal modal={modal}>
            <Step>
              1. Open <Share /> on the bottom of Safari
            </Step>
            <Step>2. Scroll down and "Add to Home Screen"</Step>
          </Modal>
        </WrapModal>
      </Container>
    );
  }

  return (
    <Content>
      <Title>
        <TitleLogo />
      </Title>
      <Button onClick={handleApple}>
        <AppleIcon />
        Continue with Apple
        {apple ? (
          <Svg viewBox="0 0 50 50">
            <Circle cx="25" cy="25" r="20"></Circle>
          </Svg>
        ) : (
          <Empty />
        )}
      </Button>
      <Button onClick={handleGoogle}>
        <GoogleIcon />
        Continue with Google
        {google ? (
          <Svg viewBox="0 0 50 50">
            <Circle cx="25" cy="25" r="20"></Circle>
          </Svg>
        ) : (
          <Empty />
        )}
      </Button>
    </Content>
  );
};

export default Home;
