import React from 'react';
import styled, { keyframes } from 'styled-components';
import Flamingo from './toys/Flamingo';
import Unicorn from './toys/Unicorn';

const Container = styled.div`
  z-index: 3;
  max-width: ${(props) => (props.center ? '200px' : '300px')};
  min-width: 100px;
  width: ${(props) => (props.center ? '30%' : '40%')};
  transition: all 5s ease 0s;
  margin-bottom: 5%;
  right: ${(props) => (props.center ? '10%' : '30%')};
  position: relative;
`;

const floating = keyframes`
  0% { transform: translate(0,  0px) rotate(-5deg); }
  50%  { transform: translate(0, 15px) rotate(15deg); }
  100%   { transform: translate(0, 0px) rotate(-5deg); }  
`;

const Content = styled.div`
  animation-name: ${floating};
  animation-duration: ${(props) => (props.delay ? '3.5s' : '3s')};
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  z-index: 3;
`;

const Toy = ({ center, type }) => {
  return (
    <Container center={center}>
      <Content delay={type === 'unicorn'}>{type === 'unicorn' ? <Unicorn miners={1}/> : <Flamingo miners={2}/>}</Content>
    </Container>
  );
};

export default Toy;
