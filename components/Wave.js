import React from 'react';
import styled, { keyframes } from 'styled-components';

const swell = keyframes`
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0%);
  }
`;

const slideUp = keyframes`
  0% {
    transform: translateY(50%);
  }
  100% {
    transform: translateY(0%);
  }
`;

const Svg = styled.svg`
  width: 200%;
  animation-name: ${swell};
  animation-duration: 2s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  fill: #54c0f9;
  z-index: 2;
  position: fixed;
  animation: 1s ease-out 0s 1 ${slideUp};
`;

const Wave = (props) => {
  return (
    <Svg viewBox="0 0 12960 1120">
      <path d="M9720,320C8100,320,8100,0,6480,0S4860,320,3240,320,1620,0,0,0V1120H12960V0C11340,0,11340,320,9720,320Z">
        <animate
          dur="5s"
          repeatCount="indefinite"
          attributeName="d"
          values="
              M9720,320C8100,320,8100,0,6480,0S4860,320,3240,320,1620,0,0,0V1120H12960V0C11340,0,11340,320,9720,320Z;
              M9720,0C8100,0,8100,319,6480,319S4860,0,3240,0,1620,320,0,320v800H12960V320C11340,320,11340,0,9720,0Z;
              M9720,320C8100,320,8100,0,6480,0S4860,320,3240,320,1620,0,0,0V1120H12960V0C11340,0,11340,320,9720,320Z
            "
        />
      </path>
    </Svg>
  );
};

export default Wave;
