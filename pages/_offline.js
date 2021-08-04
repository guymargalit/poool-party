import styled from 'styled-components';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  z-index: 4;
  @media (max-width: 675px) {
    justify-content: center;
  }
`;

const Title = styled.div`
  font-size: 45px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
`;

const Subtitle = styled.div`
  font-size: 35px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.white};
`;

export default function PageOffline() {
  return (
    <Content>
      <Title>Uh oh!</Title>
      <Subtitle>Can't loading anything.</Subtitle>
    </Content>
  );
}
