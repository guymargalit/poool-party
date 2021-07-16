import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Toy from './Toy';
import Wave from './Wave';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  min-height: 100%;
  z-index: 1;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;

  z-index: 4;
`;

const Background = styled.div`
  display: flex;
  position: absolute;
  z-index: 1px;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  background-color: #8fd0fa;
  overflow: hidden;
`;

const Toys = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  z-index: 3;
`;

const Layout = (props) => {
  const [menu, setMenu] = useState(false);

  return (
    <Container
      onClick={() => {
        menu && setMenu(false);
      }}
    >
      <Header menu={menu} setMenu={setMenu} />
      <Content>{props.children}</Content>
      <Background>
        <Toys>
          <Toy type={'flamingo'} x={'18%'} y={'2%'} z={7} />
          <Toy type={'unicorn'} x={'60%'} y={'3%'} z={7} center={true} />
          <Toy type={'zebra'} x={'80%'} y={'8%'} z={4} center={true} />
          <Toy type={'tiger'} x={'10%'} y={'6%'} z={4} center={true} />
        </Toys>
        <Wave />
      </Background>
    </Container>
  );
};

export default Layout;
