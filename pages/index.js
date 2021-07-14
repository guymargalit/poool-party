import Head from 'next/head'
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  z-index: 4;
`;

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.yellow};
`;

const Background = styled.div`
  display: flex;
  position: absolute;
  z-index: 3px;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  background-color: #8fd0fa;
  overflow: hidden;
`;

const swell = keyframes`
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0%);
  }
`;

const Wave = styled.svg`
  width: 200%;
  animation-name: ${swell};
  animation-duration: 2s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  fill: #54c0f9;
  z-index: 5;
`;

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Poool Party</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Content>
        <Title>poool.party</Title>
      </Content>
      <Background>
        <Wave viewBox="0 0 12960 1120">
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
        </Wave>
      </Background>
    </Container>
  );
}
