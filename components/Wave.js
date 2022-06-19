import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const swell = keyframes`
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0%);
  }
`;

const webkitSwell = keyframes`
  0% {
    -webkit-transform: translateX(-100vw);
  }
  100% {
    -webkit-transform: translateX(0%);
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
  @media (-webkit-animation) {
    animation: none;
    @media (max-width: 1000px) {
      /* CSS to use if animations are supported */
      -webkit-animation-name: ${webkitSwell};
      -webkit-animation-duration: 2s;
      -webkit-animation-fill-mode: forwards;
      -webkit-animation-iteration-count: infinite;
      -webkit-animation-timing-function: linear;
    }
  }
  fill: ${({ theme, color }) => (color ? color : theme.bg.wave)};
  z-index: ${({ zIndex }) => (zIndex ? zIndex : 2)};
  position: absolute;
  bottom: -1px;
  /* animation: 1s ease-out 0s 1 ${slideUp}; */
`;

const Wave = (props) => {
  useEffect(() => {
    let resizeTimer;
    function handleResize() {
      document.body.classList.add('resize-animation-stopper');
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
      }, 500);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Svg {...props} viewBox="0 0 12960 1120">
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
