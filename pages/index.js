import React, { useState } from 'react';
import Head from 'next/head';
import styled, { keyframes } from 'styled-components';
import { signIn } from 'next-auth/client';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  z-index: 4;
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
  font-size: 50px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
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
  text-transform: capitalize;
  animation: 1s ease-out 0s 1 ${slide};
  align-items: center;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1),
    0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  color: ${({ theme }) => theme.colors.white};
  border-radius: 1.5rem;
  margin-top: 20px;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  user-select: none;
  background-color: ${({ theme }) => theme.palette.dark.kolkata};
  transition: all 0.25s ease 0s;
  :hover {
    background-color: ${({ theme }) => theme.palette.dark.bunol};
  }
`;

const Svg = styled.svg`
  animation: ${rotate} 2s linear infinite;
  width: 25px;
  height: 25px;
  margin-left: 10px;
`;

const Circle = styled.circle`
  stroke: #fff;
  stroke-linecap: round;
  animation: ${dash} 1.5s ease-in-out infinite;
  fill: none;
  stroke-width: 8px;
`;

const Home = (props) => {
  const [loading, setLoading] = useState(false);
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    signIn('apple', { callbackUrl: `${process.env.APP_URL}/dashboard` });
  };

  return (
    <>
      <Head>
        <title>Poool Party</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Content>
        <Title>poool.party</Title>
        <Button onClick={handleLogin}>
          Get Started{' '}
          {loading && (
            <Svg viewBox="0 0 50 50">
              <Circle cx="25" cy="25" r="20"></Circle>
            </Svg>
          )}
        </Button>
      </Content>
    </>
  );
};

export default Home;
