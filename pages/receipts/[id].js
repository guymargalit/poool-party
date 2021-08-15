import React, { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({theme}) => theme.bg.content};
  bottom: 0px;
  width: 100%;
  height: 100%;
  padding-top: env(safe-area-inset-top);
  position: fixed;
  transition: height 0.5s cubic-bezier(0, 0, 0.1, 1) 0s, visibility 0s ease 0s;
  user-select: none;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0px 35px;
  height: 75px;
  transition: all 0.5s ease 0s;
  border-bottom: 1px solid ${({ theme }) => theme.bg.border};
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  color: ${({ theme }) => theme.text.primary};
  text-align: center;
  font-size: 24px;
  @media (max-width: 675px) {
    font-size: 20px;
  }
`;

const Subtitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-weight: 300;
  color: ${({ theme }) => theme.text.tertiary};
  text-align: center;
  font-size: 18px;
  max-width: 400px;
`;

const Text = styled.div`
  width: 100%;
  text-align: center;
  font-weight: 500;
  color: ${({ theme }) => theme.text.secondary};
  font-size: 18px;
  margin-top: 5px;
  @media (max-width: 675px) {
    font-size: 16px;
  }
`;

const Area = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  user-select: none;
`;

const Receipt = () => {
  const router = useRouter();
  const { id } = router.query;
  const [receipt, setReceipt] = useState({});
  useEffect(() => {
    const getReceipt = async () => {
      const response = await fetch(`/api/receipts/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      setReceipt(await response.json());
    };
    getReceipt();
  }, [id]);
  return (
    <Container>
      <Header>
        <Title>Receipt</Title>
      </Header>
      <Content>
        <Area>
          <Text>{JSON.stringify(receipt)}</Text>
        </Area>
      </Content>
    </Container>
  );
};

export default Receipt;
