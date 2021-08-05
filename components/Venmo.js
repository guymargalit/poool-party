import React, { Fragment, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { IconVenmo, IconWarning, IconVenmoLogo } from '../icons';
import Router from 'next/router';
import useSWR from 'swr';

const Title = styled.div`
  width: 100%;
  font-weight: 600;
  color: ${({theme}) => theme.text.secondary};
  text-align: center;
  font-size: 24px;
  margin: 20px 0 5px;
`;

const Subtitle = styled.div`
  width: 100%;
  font-weight: 400;
  color: ${({theme}) => theme.text.tertiary};
  text-align: center;
  font-size: 16px;
  max-width: 400px;
  margin: 0 0 20px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 30px;
  background-color: #008cff;
`;

const Form = styled.form`
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
  padding-top: 10px;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  width: 100%;
  margin: 10px 0px;
  color: ${({theme}) => theme.text.primary};
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid ${({theme}) => theme.bg.border};
  outline: none;
  padding: 13px 10px;
  min-height: 1px;
  margin-top: 2px;
  border-radius: 8px;
  color: inherit;
  background-color: transparent;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
  appearance: none;
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
  stroke: ${({theme}) => theme.colors.white};
  stroke-linecap: round;
  animation: ${dash} 1.5s ease-in-out infinite;
  fill: none;
  stroke-width: 8px;
`;

const Spacer = styled.div`
  height: 20px;
`;

const VenmoLogo = styled(IconVenmoLogo)`
  height: 25px;
`;

const VenmoIcon = styled(IconVenmo)`
  fill: ${({theme}) => theme.colors.white};
  width: 20px;
  height: 20px;
  display: inline-block;
  font-size: 1.5rem;
  flex-shrink: 0;
  user-select: none;
  margin-right: 10px;
  transition: all 0.25s ease 0s;
`;

const VenmoButton = styled.div`
  display: flex;
  text-align: center;
  width: 100%;
  height: 50px;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  background-color: ${({ disabled }) => (disabled ? '#aaa' : '#008cff')};
  border-radius: 24px;
  font-weight: 600;
  color: #fff;
  user-select: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.25s ease 0s;
  @media (hover: hover) and (pointer: fine) {
    :hover {
      background-color: ${({ disabled }) => !disabled && '#00d791'};
    }
  }
  :disabled {
    cursor: not-allowed;
    pointer-events: all !important;
  }
`;

const Caption = styled.div`
  font-weight: 600;
  font-size: 10px;
  text-transform: uppercase;
  width: 100%;
  margin: 10px 0px;
  color: ${({theme}) => theme.text.quarternary};
  cursor: pointer;
  text-align: center;
  transition: all 0.25s ease 0s;
  @media (hover: hover) and (pointer: fine) {
    :hover {
      color: ${({ theme }) => theme.text.hover};
    }
  }
`;

const Warning = styled(IconWarning)`
  width: 16px;
  height: 16px;
  fill: ${({ theme }) => theme.colors.error};
  margin-right: 5px;
`;

const Error = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
  font-size: 14px;
  margin-top: 5px;
`;

const Venmo = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOTP] = useState(undefined);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deviceId, setDeviceId] = useState('');
  const { mutate } = useSWR('/api/user');
  useEffect(async () => {
    const fpPromise = FingerprintJS.load();
    const fp = await fpPromise;
    const result = await fp.get();
    setDeviceId(result.visitorId);
  }, []);

  const getToken = async () => {
    setError('');
    setLoading(true);
    const body = {
      username: username,
      password: password,
      deviceId: deviceId,
      otp: otp,
    };
    const result = await fetch('/api/venmo/account/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const response = await result?.json();
    if (response?.error) {
      // Check if two factor error
      if (response?.error?.code === 81109) {
        setError('');
        setSuccess(true);
      } else {
        setError(response.error?.message);
      }
      setLoading(false);
    } else if (response?.user) {
      await mutate(response?.user);
      setLoading(false);
      Router.push('/profile');
    }
  };

  return (
    <Fragment>
      <Header>
        <VenmoLogo />
      </Header>
      {success ? (
        <Form>
          <Title>Confirm your Identity</Title>
          <Subtitle>Enter the code sent to your device.</Subtitle>
          <Label>
            ENTER CODE
            <Input
              autoFocus
              onChange={(e) => setOTP(e.target.value)}
              placeholder=""
              type="text"
              name="token"
              id="token"
              inputmode="numeric"
              pattern="[0-9]*"
              autocomplete="one-time-code"
              value={otp || ''}
            />
          </Label>
          <VenmoButton
            disabled={!otp || otp?.length < 6}
            onClick={() => (!otp || otp?.length < 6 ? null : getToken())}
          >
            {loading ? (
              <Loader viewBox="0 0 50 50">
                <Circle cx="25" cy="25" r="20"></Circle>
              </Loader>
            ) : (
              <>Submit Code</>
            )}
          </VenmoButton>
          {error && (
            <Error>
              <Warning />
              {error}
            </Error>
          )}
        </Form>
      ) : (
        <Form>
          <Spacer />
          <Label>
            EMAIL, MOBILE, OR USERNAME
            <Input
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
              placeholder="EMAIL, MOBILE, OR USERNAME"
              type="text"
              value={username}
              autoComplete="username"
            />
          </Label>
          <Label>
            PASSWORD
            <Input
              onChange={(e) => setPassword(e.target.value)}
              placeholder="PASSWORD"
              type="password"
              value={password}
              autoComplete="current-password"
            />
          </Label>
          <VenmoButton onClick={getToken}>
            {loading ? (
              <Loader viewBox="0 0 50 50">
                <Circle cx="25" cy="25" r="20"></Circle>
              </Loader>
            ) : (
              <>
                <VenmoIcon /> Link Venmo Account
              </>
            )}
          </VenmoButton>
          {error && (
            <Error>
              <Warning />
              {error}
            </Error>
          )}
          <Caption onClick={() => props.close()}>I'll do it later</Caption>
        </Form>
      )}
    </Fragment>
  );
};

export default Venmo;
