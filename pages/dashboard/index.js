import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  IconLogout,
  IconPartyFace,
  IconPopper,
  IconRightChevron,
} from '../../icons';
import { signOut } from 'next-auth/client';
import Skeleton from 'react-loading-skeleton';
import Router from 'next/router';
import Link from 'next/link';

const Content = styled.div`
  width: 100%;
  height: calc(100% - 75px - env(safe-area-inset-bottom));
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
  user-select: none;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  color: ${({ theme }) => theme.text.primary};
  text-align: center;
  font-size: 24px;
  height: 50px;
  @media (max-width: 675px) {
    font-size: 20px;
  }
`;

const Subtitle = styled.div`
  width: 100%;
  font-weight: 500;
  color: ${({ theme }) => theme.text.tertiary};
  font-size: 16px;
  margin: 10px 0;
  padding: 0 20px;
  user-select: none;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.bg.border};
`;

const Text = styled.div`
  width: 100%;
  text-align: center;
  font-weight: 500;
  color: ${({ theme }) => theme.text.secondary};
  font-size: 14px;
  margin: 5px 0;
`;

const WrapPartyFace = styled.div`
  width: 35px;
`;

const Area = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  user-select: none;
  margin: 0 0 10px;
`;

const Requests = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Items = styled.div`
  width: 100%;
  height: calc(100% - 150px - env(safe-area-inset-bottom));
  overflow-y: auto;
`;

const RightChevron = styled(IconRightChevron)`
  height: 18px;
  width: 18px;
  display: block;
  fill: ${({ loading, theme }) =>
    loading ? '#e2e2e2' : theme.text.quarternary};
  transition: all 0.25s ease 0s;
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 1px 0;
  height: 70px;
  width: 100%;
  padding: 0 20px;
  cursor: pointer;
  transition: all 0.25s ease 0s;
  border-top: 1px solid ${({ theme }) => theme.bg.border};
  color: ${({ theme, checked }) =>
    checked ? theme.colors.white : theme.text.primary};
  @media (hover: hover) and (pointer: fine) {
    :hover {
      background-color: ${({ theme }) => theme.colors.purple};
      color: ${({ theme }) => theme.colors.white};
    }
    :hover ${RightChevron} {
      fill: ${({ theme }) => theme.colors.white};
    }
  }
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  text-align: center;
  font-size: 16px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Description = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

const Total = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  text-align: center;
  font-size: 12px;
`;

const Badge = styled.div`
  font-size: 10px;
  text-transform: uppercase;
  display: inline-flex;
  text-align: center;
  padding: 0 0.2rem;
  align-items: center;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1),
    0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ active, theme }) =>
    active ? theme.colors.success : theme.colors.disabled};
  border-radius: 0.25rem;
  margin-left: 10px;
  line-height: 1rem;
  font-weight: 700;
`;

const WrapRequest = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 40px);
  border-radius: 15px;
  min-height: 65px;
  padding: 0 15px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.bg.wave};
  user-select: none;
  cursor: pointer;
`;

const Logout = styled(IconLogout)`
  width: 28px;
  cursor: pointer;
  fill: ${({ theme }) => theme.text.primary};
  transition: all 0.25s ease 0s;
  @media (hover: hover) and (pointer: fine) {
    :hover {
      fill: ${({ theme }) => theme.colors.purple};
    }
  }
`;

const handleLogout = (e) => {
  e.preventDefault();
  localStorage.clear();
  signOut({ callbackUrl: process.env.APP_URL });
};

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const intervalOptions = {
  month: 'Monthly',
  week: 'Weekly',
  [null]: 'One Time',
};

const Dashboard = ({ user }) => {
  const [requests, setRequests] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    setLoading(true);
    const getRequests = async () => {
      const response = await fetch(`/api/requests`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      setRequests(await response.json());
    };
    const getExpenses = async () => {
      const response = await fetch(`/api/expenses`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      setExpenses(await response.json());
      setLoading(false);
    };
    getRequests();
    getExpenses();
  }, []);

  return (
    <Fragment>
      <Header>
        <Title>Dashboard</Title>
        <Logout onClick={handleLogout} />
      </Header>
      <Content>
        <Section>
          <Subtitle>Requests</Subtitle>
          <Requests>
            {loading ? (
              Array(1)
                .fill(0)
                .map((u, i) => (
                  <Item key={i}>
                    <Info>
                      <Label>
                        <Skeleton width={120} />
                      </Label>
                      <Description>
                        <Skeleton width={40} />
                      </Description>
                    </Info>
                  </Item>
                ))
            ) : requests?.length > 0 ? (
              requests?.map((e, i) => (
                <Link
                  key={i}
                  passHref
                  href={`venmo://incomplete/requests`}
                >
                  <WrapRequest>
                    <Info>
                      <Label>{e?.name}</Label>
                      <Description>
                        <Total>{formatter.format(e?.amount)}</Total>
                      </Description>
                    </Info>
                  </WrapRequest>
                </Link>
              ))
            ) : !loading ? (
              <Area>
                <WrapPartyFace>
                  <IconPartyFace />
                </WrapPartyFace>
                <Text>You've got no requests!</Text>
              </Area>
            ) : (
              <></>
            )}
          </Requests>
        </Section>
        <Subtitle>Expenses</Subtitle>
        <Items>
          {loading ? (
            Array(3)
              .fill(0)
              .map((u, i) => (
                <Item key={i}>
                  <Info>
                    <Label>
                      <Skeleton width={120} />
                    </Label>
                    <Description>
                      <Skeleton width={40} />
                    </Description>
                  </Info>
                  <RightChevron loading={loading?.toString()} />
                </Item>
              ))
          ) : expenses?.length > 0 ? (
            expenses?.map((e) => (
              <Item
                onClick={() => Router.push(`/expenses/${e?.id}`)}
                key={e?.id}
              >
                <Info>
                  <Label>{e?.name}</Label>
                  <Description>
                    <Total>{formatter.format(e?.total)}</Total>
                    {e?.interval && (
                      <Badge active={e?.active}>
                        {intervalOptions[e?.interval]}
                      </Badge>
                    )}
                  </Description>
                </Info>
                <RightChevron />
              </Item>
            ))
          ) : (
            <></>
          )}
        </Items>
      </Content>
    </Fragment>
  );
};

export default Dashboard;
