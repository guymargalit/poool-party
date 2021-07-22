import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Router from 'next/router';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  flex: 1;
  padding: 0 35px;
  @media (max-width: 675px) {
    padding: 0 10px;
  }
`;

const Title = styled.div`
  width: 100%;
  font-weight: 700;
  color: #222;
  text-align: center;
  font-size: 30px;
`;

const Subtitle = styled.div`
  width: 100%;
  font-weight: 300;
  color: #444;
  text-align: center;
  font-size: 16px;
  max-width: 400px;
  margin-top: 5px;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.palette.dark.abisko};
  padding: 0 10px;
  margin-top: 30px;
  border-radius: 10px;
  font-weight: 600;
  text-align: center;
  font-size: 16px;
  text-transform: capitalize;
  height: 50px;
  width: 100%;
  user-select: none;
  cursor: pointer;
  transition: all 0.25s ease 0s;
  :hover {
    background-color: ${(props) => props.theme.palette.dark.skyGray};
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 10px 35px;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid #b0b0b0;
  outline: none;
  padding: 13px 10px;
  margin: 26px 12px 0px;
  min-height: 1px;
  border-radius: 8px;
  color: inherit;
  background-color: transparent;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
  appearance: none;
`;

const Chevron = styled.svg`
  width: 24px;
  cursor: pointer;
  fill: #222;
  transition: all 0.25s ease 0s;
  :hover {
    fill: ${(props) => props.theme.palette.dark.abisko};
  }
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

const Loader = styled.svg`
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

const Success = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.dark.monteverde};
  text-align: center;
  font-size: 14px;
  margin-top: 5px;
`;

const Error = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.dark.panjin};
  text-align: center;
  font-size: 14px;
  margin-top: 5px;
`;

const SpotCreate = () => {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const submitData = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const body = { address };
      const response = await fetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!response?.ok) {
        setError(await response.text());
      } else {
        setSuccess('Spot added successfully');
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <Chevron onClick={() => Router.push('/spots')} viewBox="0 0 24 24">
          <path d="M16.207 4.299a1 1 0 0 1 0 1.414l-6.293 6.293 6.293 6.293a1 1 0 0 1-1.414 1.414l-7-7a1 1 0 0 1 0-1.414l7-7a1 1 0 0 1 1.414 0z"></path>
        </Chevron>
      </Header>
      <Content>
        <Title>Add Spot</Title>
        <Subtitle>Enter the address of the Helium hotspot</Subtitle>
        <Input
          autoFocus
          onChange={(e) => setAddress(e.target.value)}
          placeholder="HNT Address"
          type="text"
          value={address}
        />
        <Button onClick={submitData}>
          Add spot{' '}
          {loading && (
            <Loader viewBox="0 0 50 50">
              <Circle cx="25" cy="25" r="20"></Circle>
            </Loader>
          )}
        </Button>
        {success ? (
          <Success>{success}</Success>
        ) : error ? (
          <Error>{error}</Error>
        ) : (
          <></>
        )}
      </Content>
    </Container>
  );
};

export default SpotCreate;
