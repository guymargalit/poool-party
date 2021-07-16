import React, { useState } from 'react';
import styled from 'styled-components';
import { signIn, signOut, useSession } from 'next-auth/client';
import Router from 'next/router';
import Logo from './Logo';

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  @media (min-width: 744px) {
    padding-left: 40px;
    padding-right: 40px;
  }

  @media (min-width: 375px) {
    padding-left: 24px;
    padding-right: 24px;
  }

  padding-left: 14px;
    padding-right: 14px;
  z-index: 10;
`;

const Login = styled.div`
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1),
    0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  display: inline-flex;
  text-align: inherit;
  text-decoration: none;
  user-select: auto;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 21px;
  height: 32px;
  position: relative;
  transition: all 0.25s ease 0s;
  min-width: 80px;
  z-index: 10;
  color: ${({ theme }) => theme.colors.primary};
  :hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  font-size: 15px;
  font-weight: 500;
`;

const WrapMenu = styled.div`
  position: relative;
  display: flex;
`;

const Menu = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  width: 220px;
  right: 0;
  left: auto;
  border-radius: 11px;
  margin-top: 52px;
  z-index: 10;
  background-color: ${({ theme }) => theme.colors.white};
  align-items: center;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1),
    0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  padding: 10px 0px;
`;

const MenuItem = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  user-select: none;
  padding: 0 20px;
  width: 100%;
  height: 40px;
  cursor: pointer;
  font-size: 14px;
  font-weight: ${({ bold }) => (bold ? 500 : 400)};
  color: ${({ theme }) => theme.colors.primary};
  transition: all 0.25s ease 0s;
  :hover {
    background-color: #ebebeb;
  }
`;

const Divider = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  height: 1px;
  background-color: #ebebeb;
  margin: 5px 0;
`;

const MenuIcon = styled.svg`
  display: block;
  fill: none;
  height: 16px;
  width: 16px;
  stroke: ${({ theme }) => theme.colors.primary};
  stroke-width: 3;
  overflow: visible;
`;

const Profile = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  flex: 0 0 30px;
  height: 30px;
  margin-left: 12px;
  overflow: hidden;
  position: relative;
  width: 30px;
  z-index: 10;
`;

const ProfileIcon = styled.svg`
  display: block;
  height: 100%;
  width: 100%;
  fill: currentcolor;
`;

const MenuButton = styled.div`
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1),
    0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  padding: 5px 5px 5px 12px;
  display: flex;
  text-align: inherit;
  text-decoration: none;
  user-select: auto;
  align-items: center;
  justify-content: space-evenly;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 21px;
  height: 42px;
  position: relative;
  transition: all 0.25s ease 0s;
  min-width: 85px;
  z-index: 10;
  color: ${({ theme }) => theme.colors.primary};
  :hover {
    background-color: #ebebeb;
  }
`;

const Header = ({menu, setMenu}) => {
  const [session, loading] = useSession();
  const handleLogin = (e) => {
    e.preventDefault();
    signIn();
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setMenu(false);
    signOut();
  };

  return (
    <Container onClick={() => {menu && setMenu(false)}}>
      <Logo />
      {session?.user ? (
        <WrapMenu>
          <MenuButton onClick={() => setMenu(!menu)}>
            <MenuIcon
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="presentation"
              focusable="false"
            >
              <g fill="none" fillRule="nonzero">
                <path d="m2 16h28"></path>
                <path d="m2 24h28"></path>
                <path d="m2 8h28"></path>
              </g>
            </MenuIcon>
            <Profile>
              <ProfileIcon
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
              >
                <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path>
              </ProfileIcon>
            </Profile>
          </MenuButton>
          {menu && (
            <Menu>
              <MenuItem onClick={() => {Router.push('/spots'); setMenu(false)}} bold>
                Spots
              </MenuItem>
              <MenuItem onClick={() => {Router.push('/pools'); setMenu(false)}} bold>
                Pools
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>Log out</MenuItem>
            </Menu>
          )}
        </WrapMenu>
      ) : (
        <Login onClick={handleLogin}>
          <Text>Log in</Text>
        </Login>
      )}
    </Container>
  );
};

export default Header;
