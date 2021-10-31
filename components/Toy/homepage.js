import React from 'react';
import styled, { keyframes } from 'styled-components';
import Flamingo from './toys/Flamingo';

const Container = styled.div`
  position: absolute;
  width: 24%;
  max-width: 250px;
  top: 95px;
  right: 5%;
  transition: all 5s ease 0s;
  transition: transform 1.5s ease-in-out 0s;
  @media (max-width: 675px) {
    top: 50px;
    right: 10px;
    width: 28%;
    max-width: 160px;
    min-width: 130px;
  }
`;

const floating = keyframes`
  0% { transform: translate(0,  0px) rotate(-5deg); }
  50%  { transform: translate(0, 15px) rotate(15deg); }
  100%   { transform: translate(0, 0px) rotate(-5deg); }  
`;

const Content = styled.div`
  animation-name: ${floating};
  animation-duration: ${(props) => (props.z ? `${props.z}s` : '3s')};
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
`;

const Toy = () => {
  return (
    <Container>
      <Content>
        <Flamingo />
      </Content>
    </Container>
  );
};

export default Toy;
