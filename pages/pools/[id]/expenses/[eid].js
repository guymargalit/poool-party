import React, { Fragment, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Router from 'next/router';
import { useRouter } from 'next/router';
import Expense from '../../../../components/Expense';
import {
  IconEmpty,
  IconLeftChevron,
  IconPartyFace,
  IconPlus,
  IconPopper,
  IconRightChevron,
  IconSettings,
} from '../../../../icons';
import currency from 'currency.js';
import Skeleton from 'react-loading-skeleton';
import moment from 'moment';

const WrapContent = styled.div`
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  width: 100%;
  height: calc(100% - 155px - env(safe-area-inset-bottom));
  overflow-y: auto;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  color: #222;
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
  color: #444;
  font-size: 16px;
  margin: 10px 0;
  padding: 0 35px;
  @media (max-width: 675px) {
    padding: 0 20px;
  }
`;

const Text = styled.div`
  width: 100%;
  text-align: center;
  font-weight: 500;
  color: #333;
  font-size: 18px;
  margin-top: 5px;
  @media (max-width: 675px) {
    font-size: 16px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0px 35px;
  height: 75px;
  border-bottom: 1px solid #eeeeee;
  user-select: none;
`;

const LeftChevron = styled(IconLeftChevron)`
  width: 28px;
  cursor: pointer;
  fill: #222;
  transition: all 0.25s ease 0s;
  @media (hover: hover) and (pointer: fine) {
    :hover {
      fill: ${(props) => props.theme.palette.dark.abisko};
    }
  }
`;

const Settings = styled(IconEmpty)`
  width: 28px;
  height: 28px;
  /* cursor: pointer; */
  fill: #222;
  transition: all 0.25s ease 0s;
  /* :hover {
    fill: ${(props) => props.theme.palette.dark.abisko};
  } */
`;

const Plus = styled(IconPlus)`
  width: 24px;
  height: 24px;
  fill: #555;
  transition: all 0.25s ease 0s;
`;

const WrapPlus = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 40px;
  border: 1px solid #555;
  cursor: pointer;
  @media (hover: hover) and (pointer: fine) {
    :hover {
      background: ${(props) => props.theme.palette.dark.abisko};
      border: 2px solid ${(props) => props.theme.palette.dark.abisko};
    }
    :hover ${Plus} {
      fill: #fff;
    }
  }
  transition: all 0.25s ease 0s;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: 1px solid #eeeeee;
`;

const List = styled.div`
  display: flex;
  width: 100%;
  margin: 0 0 10px;
  overflow-x: auto;
  padding: 0 35px;
  @media (max-width: 675px) {
    padding: 0 20px;
  }
`;

const WrapAvatar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 15px;
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 12px;
  color: #555;
  margin: 5px 0 0;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 40px;
`;

const Panel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(255, 255, 255);
  bottom: 0px;
  width: 100%;
  height: ${({ panel }) => (panel ? '100%' : '80px')};
  position: ${({ panel }) => (panel ? 'fixed' : 'absolute')};
  transition: height 0.5s cubic-bezier(0, 0, 0.1, 1) 0s, visibility 0s ease 0s;
  user-select: none;
`;

const Footer = styled.div`
  display: flex;
  padding: 0 35px calc(env(safe-area-inset-bottom));
  @media (max-width: 675px) {
    padding: 0 10px calc(env(safe-area-inset-bottom));
  }
  flex: 1;
  justify-content: center;
  border-top: 1px solid rgb(221, 221, 221);
`;

const Popper = styled(IconPopper)`
  width: 20px;
  margin-left: 6px;
  margin-bottom: 2px;
  transition: all 0.25s ease 0s;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.palette.dark.abisko};
  padding: 0 10px;
  margin: 15px 0;
  border-radius: 24px;
  font-weight: 600;
  text-align: center;
  font-size: 16px;
  text-transform: capitalize;
  height: 50px;
  width: 100%;
  user-select: none;
  cursor: pointer;
  transition: all 0.25s ease 0s;
  max-width: 1040px;
  @media (hover: hover) and (pointer: fine) {
    :hover {
      background-color: ${(props) => props.theme.palette.dark.skyGray};
    }
    &:hover ${Popper} {
      transform: rotate(-10deg);
    }
  }
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
  fill: ${({ loading }) => (loading ? '#e2e2e2' : '#555')};
  transition: all 0.25s ease 0s;
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 1px 0;
  height: 70px;
  width: 100%;
  padding: 0 35px;
  @media (max-width: 675px) {
    padding: 0 20px;
  }
  cursor: pointer;
  transition: all 0.25s ease 0s;
  border-top: 1px solid #eeeeee;
  color: ${(props) => (props.checked ? '#fff' : '#222')};
  @media (hover: hover) and (pointer: fine) {
    :hover {
      background-color: ${(props) => props.theme.palette.dark.abisko};
      color: #fff;
    }
    :hover ${RightChevron} {
      fill: #fff;
    }
  }
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  text-align: center;
  font-size: 16px;
  text-transform: capitalize;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Description = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  text-align: center;
  font-size: 12px;
  margin-top: 5px;
`;

const Status = styled.div`
  font-size: 12px;
  text-transform: uppercase;
  display: inline-flex;
  text-align: center;
  padding: 0 0.375rem;
  align-items: center;
  box-shadow: 
    0px 1px 2px 0px rgba(0, 0, 0, 0.1),
    0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  color: #fefefe;
  background-color: ${({ status }) => {
    switch (status) {
      case 'pending':
        return '#ffb54d';
      case 'failed':
        return '#ed5f74';
      case 'succeeded':
        return '#00C851';
      default:
        return '#e1ddec';
    }
  }};
  border-radius: 0.25rem;
  margin: 0;
  line-height: 1rem;
  font-weight: 700;
`;

const Date = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  text-align: center;
  font-size: 12px;
  margin-top: 5px;
`;

const WrapPartyFace = styled.div`
  min-width: 35px;
  max-width: 55px;
  width: 10%;
  margin-top: 5px;
`;

const Area = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  user-select: none;
`;

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const PoolExpense = (props) => {
  const router = useRouter();
  const { id, eid } = router.query;
  const [expense, setExpense] = useState(props?.expense);
  const [loading, setLoading] = useState(true);
  const [panel, setPanel] = useState(false);

  const getPoolExpense = async () => {
    const response = await fetch(`/api/expenses/${eid}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    setExpense(await response.json());
    setLoading(false);
  };
  useEffect(() => {
    getPoolExpense();
  }, []);

  return (
    <Fragment>
      <Header>
        <LeftChevron onClick={() => Router.push(`/pools/${id}`)} />
        {loading ? (
          <Skeleton height={20} width={150} />
        ) : (
          <Title>{expense?.name}</Title>
        )}
        <Settings />
      </Header>
      <WrapContent>
        <Content>
          <Section>
            <Subtitle>Expense</Subtitle>
            {loading ? (
              <Item>
                <Left>
                  <Label>
                    <Skeleton width={120} />
                  </Label>
                  <Description>
                    <Skeleton width={40} />
                  </Description>
                </Left>
              </Item>
            ) : (
              <Item key={expense?.id}>
                <Left>
                  <Label>{expense?.name}</Label>
                  <Description>{formatter.format(expense?.total)}</Description>
                </Left>
              </Item>
            )}
          </Section>
          <Subtitle>Requests</Subtitle>
          <Items>
            {loading ? (
              Array(3)
                .fill(0)
                .map((u, i) => (
                  <Item key={i}>
                    <Left>
                      <Label>
                        <Skeleton width={120} />
                      </Label>
                      <Description>
                        <Skeleton width={40} />
                      </Description>
                    </Left>
                  </Item>
                ))
            ) : expense?.users?.length > 0 ? (
              expense?.users?.map((u) =>
                u?.requests?.map((r) => (
                  <Item onClick={() => {}} key={u?.id}>
                    <Left>
                      <Label>{u?.user?.venmo?.displayName}</Label>
                      <Description>{formatter.format(u?.amount)}</Description>
                    </Left>
                    <Right>
                      <Status status={r?.status}>{r?.status}</Status>
                      <Date>{moment(r?.createdAt).format('M/D/YY h:mmA')}</Date>
                    </Right>
                  </Item>
                ))
              )
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
          </Items>
        </Content>
      </WrapContent>
    </Fragment>
  );
};

export default PoolExpense;
