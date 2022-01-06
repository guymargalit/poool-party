import Router from 'next/router';
import React from 'react';
import styled from 'styled-components';
import {
  IconMoon,
  IconSun,
} from '../icons';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  min-height: 50px;
  position: ${({ fixed }) => (fixed ? 'fixed' : 'relative')};
  bottom: 0;
  background-color: ${({ theme }) => theme.bg.sky};
  padding: 0 10px 5px;
  z-index: 10;
  @media (max-width: 500px) {
    min-height: 70px;
    height: 70px;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 500px) {
    flex-direction: column-reverse;
    justify-content: center;
  }
`;

const Items = styled.div`
  display: flex;
  align-items: center;
`;

const Item = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  font-weight: 600;
  padding: 0px 5px;
  height: 20px;
  cursor: pointer;
  border-radius: 5px;
  @media (hover: hover) and (pointer: fine) {
    :hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
  :active {
    background-color: rgba(255, 255, 255, 0.1);
  }
  transition: all 0.25s ease 0s;
`;

const FooterText = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  font-weight: 600;
`;

const WrapSunIcon = styled.div`
  position: absolute;
  top: 1px;
  left: 2px;
  width: 20px;
  height: 20px;
`;
const WrapMoonIcon = styled.div`
  position: absolute;
  top: 2px;
  left: 26px;
  width: 18px;
  height: 18px;
`;
const CheckBoxWrapper = styled.div`
  display: flex;
  position: relative;
`;
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 3px;
  left: 4px;
  width: 46px;
  height: 22px;
  border-radius: 15px;
  background: #111236;
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 2px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 46px;
  height: 22px;
  &:checked + ${CheckBoxLabel} {
    background: #8fd0fa;
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 26px;
      transition: 0.2s;
    }
  }
`;

const Footer = ({ fixed, darkMode, setDarkMode }) => {
  return (
    <Container fixed={fixed}>
      <Content>
        <Items>
          <FooterText>
            <a
              href="https://birthdayguy.co"
              rel="external nofollow noopener"
              target="_blank"
            >
              © 2021 Birthday Guy, LLC
            </a>
          </FooterText>
        </Items>
        <Items>
          <Item onClick={() => Router.push('/faq')}>FAQs</Item>
          <Item>
            <a
              href="mailto:help@poool.party"
              rel="external nofollow noopener"
              target="_blank"
            >
              Help
            </a>
          </Item>
          <Item onClick={() => Router.push('/terms')}>Terms</Item>
          <Item onClick={() => Router.push('/privacy')}>Privacy</Item>
          <Item onClick={() => Router.push('/blog')}>Blog</Item>
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
        </Items>
      </Content>
    </Container>
  );
};

export default Footer;
