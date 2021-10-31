import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 264px;
  height: 533px;
  padding: 8px;
  border-radius: 36px;
  background: #f6f9fc;
  box-shadow: 0 50px 100px -20px rgb(50 50 93 / 25%),
    0 30px 60px -30px rgb(0 0 0 / 30%), inset 0 -2px 6px 0 rgb(10 37 64 / 35%);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-size: 16px;
`;

const Content = styled.div`
  position: relative;
  height: 100%;
  border-radius: 34px;
  background-color: #8fd0fa;
`;

const Phone = (props) => {
  return (
    <Container>
      <Content></Content>
    </Container>
  );
};

export default Phone;
