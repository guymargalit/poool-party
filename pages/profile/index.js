import React, { Fragment, useState, useEffect } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import {
  IconLogout,
  IconMoon,
  IconPopper,
  IconSun,
  IconVenmo,
  IconVenmoLogo,
} from '../../icons';
import Link from 'next/link';

const Content = styled.div`
  width: 100%;
  height: calc(100% - 75px - env(safe-area-inset-bottom));
  overflow-y: auto;
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
  border-bottom: 1px solid ${({ theme }) => theme.bg.border};
  transition: all 0.5s ease 0s;
  user-select: none;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  color: ${({ theme }) => theme.text.primary};
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
  min-height: 80px;
  padding: 0 15px;
  background-color: #0074de;
  user-select: none;
  cursor: ${({ link }) => (link ? 'pointer' : 'inherit')};
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
  color: ${({ theme }) => theme.colors.white};
  font-size: 20px;
`;

const Label = styled.div`
  display: flex;
  font-weight: 700;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.white};
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
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.purple};
  padding: 0 10px;
  margin-top: 15px;
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
      background-color: ${({ theme }) => theme.button.hover};
    }
    &:hover ${Popper} {
      transform: rotate(-10deg);
    }
  }
  :active {
    background-color: ${({ theme }) => theme.button.hover};
  }
  &:active ${Popper} {
    transform: rotate(-10deg);
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
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 24px;
  font-weight: 600;
  color: #0074de;
  user-select: none;
  cursor: pointer;
  transition: all 0.25s ease 0s;
  @media (hover: hover) and (pointer: fine) {
    :hover {
      color: ${({ theme }) => theme.colors.white};
      background-color: #00d791;
    }
    &:hover ${VenmoIcon} {
      fill: ${({ theme }) => theme.colors.white};
    }
  }
  :active {
    color: ${({ theme }) => theme.colors.white};
    background-color: #00d791;
  }
  &:active ${VenmoIcon} {
    fill: ${({ theme }) => theme.colors.white};
  }
`;

const VenmoLogo = styled(IconVenmoLogo)`
  height: 23px;
  margin-left: 10px;
`;

const WrapSunIcon = styled.div`
  position: absolute;
  top: 3px;
  left: 3px;
  width: 24px;
  height: 24px;
`;
const WrapMoonIcon = styled.div`
  position: absolute;
  top: 4px;
  left: 32px;
  width: 22px;
  height: 22px;
`;
const CheckBoxWrapper = styled.div`
  display: flex;
  position: relative;
`;
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 3px;
  left: 4px;
  width: 58px;
  height: 30px;
  border-radius: 15px;
  background: #111236;
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 58px;
  height: 30px;
  &:checked + ${CheckBoxLabel} {
    background: #8fd0fa;
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      margin-left: 30px;
      transition: 0.2s;
    }
  }
`;

const Profile = ({ user, setVenmo, darkMode, setDarkMode }) => {
  return (
    <Fragment>
      <Header>
        <Title>
          What's up
          {!user?.venmo?.displayName?.split(' ')[0] &&
          !user?.name?.split(' ')[0]
            ? '!'
            : ','}{' '}
          {user?.venmo?.displayName?.split(' ')[0] || user?.name?.split(' ')[0]}
        </Title>
        <CheckBoxWrapper>
          <CheckBox
            checked={darkMode}
            id="checkbox"
            type="checkbox"
            onChange={setDarkMode}
          />
          <CheckBoxLabel htmlFor="checkbox">
            {darkMode ? (
              <WrapSunIcon>
                <IconSun />
              </WrapSunIcon>
            ) : (
              <WrapMoonIcon>
                <IconMoon />
              </WrapMoonIcon>
            )}
          </CheckBoxLabel>
        </CheckBoxWrapper>
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
