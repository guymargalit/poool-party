import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { signIn, useSession } from 'next-auth/client';
import Router from 'next/router';
import { IconApple, IconEmpty, IconGoogle } from '../icons';

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
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.white};
  margin: 5px 15px 10px;
`;

const Caption = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.white};
  margin: 20px 0 50px;
`;

const slide = keyframes`
  0% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0);
  }
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

const AppleIcon = styled(IconApple)`
  width: 20px;
  height: 20px;
  display: inline-block;
  font-size: 1.5rem;
  flex-shrink: 0;
  user-select: none;
  transition: all 0.25s ease 0s;
`;

const GoogleIcon = styled(IconGoogle)`
  width: 20px;
  height: 20px;
  display: inline-block;
  font-size: 1.5rem;
  flex-shrink: 0;
  user-select: none;
  transition: all 0.25s ease 0s;
`;

const Empty = styled(IconEmpty)`
  width: 20px;
`;

const Home = () => {
  const [apple, setApple] = useState(false);
  const [google, setGoogle] = useState(false);
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

  const handleAddToHomescreenClick = () => {
    alert(`
      1. Open Share menu in Safari
      2. Tap on "Add to Home Screen"`);
  };

  const isIos = () => {
    var t = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(t);
  };

  const isInStandaloneMode = () => {
    return 'standalone' in window.navigator && window.navigator.standalone;
  };

  return (
    <Content>
      <Title>Poool Party</Title>
      <Subtitle>Recurring and easy splitting with Venmo*</Subtitle>
      <Caption>*but like actually</Caption>
      {typeof window !== 'undefined' && isIos() && !isInStandaloneMode() ? (
        <Button onClick={handleAddToHomescreenClick}>
          <AppleIcon />
          Get the App <Empty />
        </Button>
      ) : (
        <>
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
        </>
      )}
    </Content>
  );
};

export default Home;
