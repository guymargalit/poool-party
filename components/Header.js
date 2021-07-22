import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Router from 'next/router';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 80px;

  @media (max-width: 1024px) {
    display: none;
    visibility: hidden;
  }
`;

const Label = styled.div`
  overflow: hidden;
  font-size: 16px;
  line-height: 20px;
  cursor: pointer;
  display: inline-block;
  font-weight: 400;
  margin: 10px 22px;
  pointer-events: auto;
  position: relative;
  text-align: center;
  z-index: 0;
  color: #222;
  overflow: ellipsis;
`;

const WrapItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header = (props) => {
  const router = useRouter();
  return (
    <Container>
      <WrapItem onClick={() => Router.push('/dashboard')}>
        <Label>Dashboard</Label>
      </WrapItem>
      <WrapItem onClick={() => Router.push('/pools')}>
        <Label>Pools</Label>
      </WrapItem>
      <WrapItem onClick={() => Router.push('/spots')}>
        <Label>Spots</Label>
      </WrapItem>
    </Container>
  );
};

export default Header;
