import React, { Fragment, useState, useEffect } from 'react';
import Router from 'next/router';
import styled, { keyframes } from 'styled-components';
import { signOut, useSession } from 'next-auth/client';
import { IconLogout, IconPopper, IconVenmo, IconVenmoLogo } from '../../icons';
import Link from 'next/link';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 20px;
  @media (max-width: 675px) {
    padding: 0 10px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0px 35px;
  height: 75px;
  border-bottom: 1px solid #eeeeee;
  user-select: none;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  color: #222;
  text-align: center;
  font-size: 24px;
  height: 50px;
  @media (max-width: 675px) {
    font-size: 20px;
  }
`;
const VenmoWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 15px 0 0;
  border-radius: 15px;
  height: 80px;
  padding: 0 15px;
  background-color: #0074de;
  user-select: none;
  cursor: ${({link}) => link ? 'pointer':'inherit'};
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  flex: 2;
`;

const WrapText = styled.div`
  display: flex;
  flex-direction: column;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  margin-right: 10px;
`;

const Name = styled.div`
  display: flex;
  font-weight: 500;
  color: ${(props) => props.theme.colors.white};
  font-size: 20px;
`;

const Label = styled.div`
  display: flex;
  font-weight: 700;
  font-size: 14px;
  color: ${(props) => props.theme.colors.white};
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 10px;
`;

const Popper = styled(IconPopper)`
  width: 20px;
  margin-left: 6px;
  margin-bottom: 2px;
  transition: all 0.25s ease 0s;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.palette.dark.abisko};
  padding: 0 10px;
  margin: 15px 0;
  border-radius: 24px;
  font-weight: 600;
  text-align: center;
  font-size: 16px;
  text-transform: capitalize;
  height: 50px;
  width: 100%;
  user-select: none;
  cursor: pointer;
  transition: all 0.25s ease 0s;
  @media (hover: hover) and (pointer: fine) {
    :hover {
      background-color: ${(props) => props.theme.palette.dark.skyGray};
    }
    &:hover ${Popper} {
      transform: rotate(-10deg);
    }
  }
  @media (max-width: 675px) {
    margin-top: 10px;
  }
`;

const VenmoIcon = styled(IconVenmo)`
  fill: #0074de;
  width: 20px;
  height: 20px;
  display: inline-block;
  font-size: 1.5rem;
  flex-shrink: 0;
  user-select: none;
  margin-right: 8px;
  transition: all 0.25s ease 0s;
`;

const VenmoButton = styled.div`
  display: flex;
  text-align: center;
  min-width: 160px;
  height: 50px;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 24px;
  font-weight: 600;
  color: #0074de;
  user-select: none;
  cursor: pointer;
  transition: all 0.25s ease 0s;
  @media (hover: hover) and (pointer: fine) {
    :hover {
      color: ${(props) => props.theme.colors.white};
      background-color: #00d791;
    }
    &:hover ${VenmoIcon} {
      fill: ${(props) => props.theme.colors.white};
    }
  }
`;

const VenmoLogo = styled(IconVenmoLogo)`
  height: 23px;
  margin-left: 10px;
`;


const Logout = styled(IconLogout)`
  width: 28px;
  cursor: pointer;
  fill: #222;
  transition: all 0.25s ease 0s;
  @media (hover: hover) and (pointer: fine) {
    :hover {
      fill: ${(props) => props.theme.palette.dark.abisko};
    }
  }
`;

const handleLogout = (e) => {
  e.preventDefault();
  signOut({ callbackUrl: process.env.APP_URL });
};

const Profile = ({ user, setVenmo }) => {
  return (
    <Fragment>
      <Header>
        <Title>
          What's up,{' '}
          {user?.venmo?.displayName?.split(' ')[0] || user?.name?.split(' ')[0]}
        </Title>
        <Logout onClick={handleLogout} />
      </Header>
      <Content>
        {user?.venmo ? (
          <Link passHref href={`venmo://users/${user?.venmo?.id}`}>
            <VenmoWrap link>
              <Info>
                <Avatar src={user?.venmo?.image} />
                <WrapText>
                  <Name>{user?.venmo?.displayName}</Name>
                  <Label>@{user?.venmo?.username}</Label>
                </WrapText>
              </Info>
            </VenmoWrap>
          </Link>
        ) : (
          <VenmoWrap>
            <Info>
              <VenmoLogo />
            </Info>
            <VenmoButton onClick={() => setVenmo(true)}>
              {' '}
              <VenmoIcon />
              Link Account
            </VenmoButton>
          </VenmoWrap>
        )}
        <Footer>
          <Button onClick={() => Router.push('/choose-a-toy')}>
            Choose a pool toy
            <Popper />
          </Button>
        </Footer>
      </Content>
    </Fragment>
  );
};

export default Profile;
