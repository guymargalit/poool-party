import styled, { keyframes } from 'styled-components';

export default function Phone(props) {
  return (
    <Container {...props}>
      <Content>
        <WrapPhone>
          <WrapVideo>
            <DefaultVideo />
            <Video
              loop
              muted
              playsInline
              autoPlay
              preload="auto"
              src="https://poool-party.s3.amazonaws.com/intro.mp4"
            ></Video>
          </WrapVideo>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            x="0px"
            y="0px"
            width="558px"
            height="1101px"
            viewBox="0 0 558 1101"
          >
            <g transform="matrix( 1, 0, 0, 1, 0,0) ">
              <path
                fill="#363636"
                stroke="none"
                d="
M 498.35 159.25
Q 498.35 128.05 497.45 117.4 496.15 101.4 491.35 92.05 486.75 83.05 479.6 75.85 472.5 68.7 463.5 64.15 454.1 59.35 438.15 58.05 427.55 57.15 396.3 57.15
L 161.8 57.15
Q 130.6 57.15 119.95 58.05 104 59.35 94.6 64.15 85.6 68.7 78.5 75.85 71.35 83.05 66.7 92.05 61.9 101.4 60.65 117.4 59.75 128.05 59.75 159.25
L 59.75 199.5 57.95 199.5
Q 56.75 199.5 56.75 200.7
L 56.75 233.85
Q 56.75 235.05 57.95 235.05
L 59.75 235.05 59.75 263.9 57.95 263.9
Q 56.75 263.9 56.75 265.1
L 56.75 331.35
Q 56.75 331.85 57.1 332.25 57.4 332.6 57.95 332.6
L 59.75 332.6 59.75 347.9 57.95 347.9
Q 57.4 347.9 57.1 348.3 56.75 348.65 56.75 349.2
L 56.75 415.4
Q 56.75 416.6 57.95 416.6
L 59.75 416.6 59.75 854.9
Q 59.75 886.2 60.65 896.85 61.9 912.8 66.7 922.15 71.35 931.15 78.5 938.3 85.6 945.5 94.6 950.05 104 954.8 119.95 956.15 130.6 956.95 161.8 956.95
L 396.3 956.95
Q 427.55 956.95 438.15 956.15 454.1 954.8 463.5 950.05 472.5 945.5 479.6 938.3 486.8 931.15 491.35 922.15 496.15 912.8 497.45 896.85 498.35 886.2 498.35 854.9
L 498.35 395.15 500.15 395.15
Q 500.65 395.15 501.05 394.75 501.4 394.45 501.4 393.95
L 501.4 289.65
Q 501.4 289.1 501.05 288.8 500.65 288.45 500.15 288.45
L 498.35 288.45 498.35 159.25
M 410.1 79.3
Q 430.55 79.3 437.55 79.9 447.95 80.7 454.1 83.8 466.1 90 472.35 102 475.4 108.15 476.3 118.6 476.85 125.55 476.85 146.05
L 476.85 868.2
Q 476.85 888.6 476.3 895.55 475.4 906 472.35 912.1 466.1 924.25 454.1 930.35 447.95 933.5 437.55 934.3 430.55 934.9 410.1 934.9
L 148 934.9
Q 127.55 934.9 120.55 934.3 110.15 933.5 104 930.35 92 924.25 85.75 912.1 82.7 906 81.85 895.55 81.25 888.6 81.25 868.2
L 81.25 146.05
Q 81.25 125.55 81.85 118.6 82.7 108.15 85.75 102 92 90 104 83.8 110.15 80.7 120.55 79.9 127.55 79.3 148 79.3
L 168.45 79.3
Q 169.95 79.3 170.4 79.45 171.45 79.8 171.85 80.85 172 81.3 172 82.8 172 89.95 172.15 92.35 172.35 96 173.2 98.25 174.7 102.3 177.75 105.4 180.85 108.55 184.9 109.95 187.15 110.8 190.8 111 193.3 111.15 200.35 111.15
L 357.75 111.15
Q 364.85 111.15 367.25 111 370.95 110.8 373.2 109.95 377.25 108.55 380.3 105.4 383.45 102.3 384.9 98.25 385.7 96 385.95 92.35 386.1 89.95 386.1 82.8 386.1 81.3 386.25 80.85 386.6 79.8 387.65 79.45 388.1 79.3 389.6 79.3
L 410.1 79.3 Z"
              ></path>
            </g>
          </svg>
        </WrapPhone>
      </Content>
    </Container>
  );
}

const slideUp = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0);
  }
`;

const Container = styled.div``;

const Content = styled.div`
  z-index: 1;
  position: relative;
  width: 100%;
  transform-origin: 50% 80% 0px;
  transform: none;
  overflow: hidden;
`;

const WrapPhone = styled.div`
  overflow: hidden;
  transform: translateY(0px) translateZ(0px);
  animation-name: ${slideUp};
  animation-duration: 4s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  svg {
    width: 100%;
    height: auto;
    position: relative;
    display: block;
    user-select: none;
    pointer-events: none;
    backface-visibility: hidden;
    z-index: 2;
  }
`;

const WrapVideo = styled.div`
  z-index: 1;
  display: block;
  position: absolute;
  top: 7.2%;
  left: 14.5%;
  width: 71%;
  height: 77.8%;
  overflow: hidden;
`;

const DefaultVideo = styled.div`
  display: block;
  z-index: 2;
  position: absolute;
  inset: 0px;
  overflow: hidden;
`;

const Video = styled.video`
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
