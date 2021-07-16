import React from 'react';
import styled, { keyframes } from 'styled-components';
import Flamingo from './toys/Flamingo';
import Unicorn from './toys/Unicorn';
import Zebra from './toys/Zebra';
import Tiger from './toys/Tiger';

const Container = styled.div`
  position: absolute;
  z-index: ${(props) => (props.z ? props.z : 4)};
  max-width: ${(props) => (props.z ? `${props.z*50}px` : '250px')};
  min-width: 10px;
  width: ${(props) => (props.z ? `${props.z*4}%` : '30%')};
  transition: all 5s ease 0s;
  transition: transform 1.5s ease-in-out 0s;
  margin-bottom: ${(props) => (props.y ? props.y : "3%")};;
  right: ${(props) => (props.x ? props.x : "10%")};
  transform: ${(props) => (props.x > "40%" ? "scaleX(-1)" : "scaleX(1)")};
  bottom: 0;
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

const Toy = ({ type, x, y, z }) => {
  return (
    <Container x={x} y={y} z={z}>
      <Content z={z}>
        {type === 'unicorn' ? (
          <Unicorn miners={1} />
        ) : type === 'zebra' ? (
          <Zebra miners={3} />
        ) : type === 'tiger' ? (
          <Tiger miners={3} />
        ) : (
          <Flamingo miners={2} />
        )}
      </Content>
    </Container>
  );
};

export default Toy;
