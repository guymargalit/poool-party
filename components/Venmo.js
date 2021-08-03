import React, { Fragment, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { IconVenmo } from '../icons';
import Router from 'next/router';
import useSWR from 'swr';

const Title = styled.div`
  width: 100%;
  font-weight: 600;
  color: #333;
  text-align: center;
  font-size: 24px;
  margin: 20px 0 5px;
`;

const Subtitle = styled.div`
  width: 100%;
  font-weight: 400;
  color: #444;
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
  color: #222;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid #b0b0b0;
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
  stroke: #fff;
  stroke-linecap: round;
  animation: ${dash} 1.5s ease-in-out infinite;
  fill: none;
  stroke-width: 8px;
`;

const Spacer = styled.div`
  height: 20px;
`;

const VenmoLogo = styled.svg`
  height: 25px;
`;

const VenmoIcon = styled(IconVenmo)`
  fill: ${(props) => props.theme.colors.white};
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
  color: #888;
  cursor: pointer;
  text-align: center;
`;

const Venmo = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOTP] = useState(undefined);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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
      setError(response.error);
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
        <VenmoLogo viewBox="0 0 211 41">
          <path
            d="M34.5771 0.822021C35.9974 3.16733 36.6377 5.58301 36.6377 8.63451C36.6377 18.3672 28.3277 31.0107 21.5832 39.8888H6.17825L0 2.95296L13.4887 1.67258L16.7552 27.9548C19.8074 22.9834 23.5738 15.171 23.5738 9.84453C23.5738 6.92902 23.0743 4.94318 22.2935 3.30806L34.5771 0.822021Z"
            fill="#FFFFFF"
          />
          <path
            d="M52.0595 17.0887C54.5417 17.0887 60.7907 15.9534 60.7907 12.4024C60.7907 10.6973 59.5848 9.84676 58.1637 9.84676C55.6776 9.84676 52.415 12.8275 52.0595 17.0887ZM51.7751 24.1214C51.7751 28.4573 54.1865 30.1584 57.3834 30.1584C60.8647 30.1584 64.1979 29.3078 68.5303 27.1065L66.8985 38.1852C63.846 39.6763 59.0888 40.6713 54.4713 40.6713C42.7584 40.6713 38.5664 33.5693 38.5664 24.6908C38.5664 13.1834 45.3853 0.9646 59.4436 0.9646C67.1837 0.9646 71.5117 5.30013 71.5117 11.3371C71.5124 21.0695 59.0188 24.051 51.7751 24.1214Z"
            fill="#FFFFFF"
          />
          <path
            d="M110.439 9.34835C110.439 10.7687 110.224 12.8289 110.009 14.1753L105.962 39.7474H92.8275L96.5196 16.3059C96.5896 15.6701 96.8048 14.3901 96.8048 13.6799C96.8048 11.9747 95.7393 11.5493 94.4583 11.5493C92.7568 11.5493 91.0513 12.3298 89.9155 12.8997L85.7278 39.7477H72.5195L78.5537 1.46185H89.9855L90.1302 4.51773C92.8272 2.74224 96.3785 0.822022 101.417 0.822022C108.093 0.821292 110.439 4.2319 110.439 9.34835Z"
            fill="#FFFFFF"
          />
          <path
            d="M149.432 5.15577C153.194 2.45936 156.746 0.9646 161.643 0.9646C168.387 0.9646 170.733 4.37521 170.733 9.49167C170.733 10.9121 170.518 12.9723 170.304 14.3187L166.261 39.8907H153.123L156.886 15.9538C156.955 15.3139 157.101 14.5334 157.101 14.0383C157.101 12.1184 156.035 11.6926 154.754 11.6926C153.123 11.6926 151.492 12.4028 150.281 13.043L146.094 39.8911H132.96L136.722 15.9541C136.791 15.3143 136.933 14.5338 136.933 14.0387C136.933 12.1188 135.866 11.693 134.59 11.693C132.885 11.693 131.183 12.4735 130.047 13.0434L125.856 39.8915H112.652L118.686 1.60552H129.978L130.333 4.80176C132.96 2.88628 136.508 0.966057 141.265 0.966057C145.384 0.964599 148.08 2.74045 149.432 5.15577Z"
            fill="#FFFFFF"
          />
          <path
            d="M196.869 16.3076C196.869 13.1821 196.087 11.0512 193.746 11.0512C188.563 11.0512 187.498 20.2133 187.498 24.9003C187.498 28.456 188.493 30.6566 190.834 30.6566C195.733 30.6566 196.869 20.9942 196.869 16.3076ZM174.15 24.3345C174.15 12.2608 180.539 0.963379 195.238 0.963379C206.314 0.963379 210.363 7.49985 210.363 16.522C210.363 28.4556 204.043 40.814 188.989 40.814C177.842 40.814 174.15 33.497 174.15 24.3345Z"
            fill="#FFFFFF"
          />
        </VenmoLogo>
      </Header>
      {error ? (
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
            />
          </Label>
          <Label>
            PASSWORD
            <Input
              onChange={(e) => setPassword(e.target.value)}
              placeholder="PASSWORD"
              type="password"
              value={password}
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
          <Caption onClick={() => props.close()}>not now</Caption>
        </Form>
      )}
    </Fragment>
  );
};

export default Venmo;
