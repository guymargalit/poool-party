import React, { Fragment, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Router from 'next/router';
import { useRouter } from 'next/router';
import {
  IconEmpty,
  IconLeftChevron,
  IconPartyFace,
  IconPlus,
  IconPopper,
  IconRightChevron,
  IconSettings,
} from '../../icons';
import currency from 'currency.js';
import Skeleton from 'react-loading-skeleton';
import moment from 'moment';

const WrapContent = styled.div`
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  width: 100%;
  height: calc(100% - 75px - env(safe-area-inset-bottom));
  overflow-y: auto;
`;

const Title = styled.div`
  font-weight: 700;
  text-align: center;
  color: ${({ theme }) => theme.text.primary};
  font-size: 24px;
  line-height: 24px;
  width: 50%;
  @media (max-width: 675px) {
    font-size: 20px;
  }
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Subtitle = styled.div`
  width: 100%;
  font-weight: 500;
  color: ${({ theme }) => theme.text.tertiary};
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
  color: ${({ theme }) => theme.text.secondary};
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
  transition: all 0.5s ease 0s;
  border-bottom: 1px solid ${({ theme }) => theme.bg.border};
  user-select: none;
`;

const LeftChevron = styled(IconLeftChevron)`
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

const Settings = styled(IconEmpty)`
  width: 28px;
  height: 28px;
  /* cursor: pointer; */
  fill: ${({ theme }) => theme.text.primary};
  transition: all 0.25s ease 0s;
`;

const Plus = styled(IconPlus)`
  width: 24px;
  height: 24px;
  fill: ${({ theme }) => theme.text.tertiary};
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
      background: ${({ theme }) => theme.colors.purple};
      border: 2px solid ${({ theme }) => theme.colors.purple};
    }
    :hover ${Plus} {
      fill: ${({ theme }) => theme.colors.white};
    }
  }
  transition: all 0.25s ease 0s;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.bg.border};
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

const Popper = styled(IconPopper)`
  width: 20px;
  margin-left: 6px;
  margin-bottom: 2px;
  transition: all 0.25s ease 0s;
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

const Card = styled.div`
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
  transition: all 0.25s ease 0s;
  color: ${({ theme, checked }) =>
    checked ? theme.colors.white : theme.text.primary};
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
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1),
    0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ status, theme }) => {
    switch (status) {
      case 'pending':
        return theme.colors.pending;
      case 'failed':
        return theme.colors.error;
      case 'succeeded':
        return theme.colors.success;
      default:
        return theme.colors.disabled;
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

const CheckBoxWrapper = styled.div`
  display: flex;
  position: relative;
`;
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 3px;
  left: 4px;
  width: 58px;
  height: 30px;
  border-radius: 15px;
  background: ${({ theme }) => theme.bg.input};
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 58px;
  height: 30px;
  &:checked + ${CheckBoxLabel} {
    background: ${({ theme }) => theme.colors.success};
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      margin-left: 30px;
      transition: 0.2s;
    }
  }
`;

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const Expense = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const [expense, setExpense] = useState(props?.expense);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(true);

  const getExpense = async () => {
    setLoading(true);
    const response = await fetch(`/api/expenses/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    setExpense(await response.json());
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      getExpense();
    }
  }, [id]);

  useEffect(() => {
    setActive(expense?.active);
  }, [expense?.active]);

  const toggleActive = async () => {
    setActive(!active);
    const body = {
      active: !active,
    };
    await fetch(`/api/expenses/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  };

  return (
    <Fragment>
      <Header>
        <LeftChevron onClick={() => Router.back()} />
        {loading ? (
          <Skeleton height={20} width={150} />
        ) : (
          <Title>{expense?.name}</Title>
        )}
        {expense?.interval ? (
          <CheckBoxWrapper>
            <CheckBox
              checked={active}
              id="checkbox"
              type="checkbox"
              onChange={toggleActive}
            />
            <CheckBoxLabel htmlFor="checkbox"></CheckBoxLabel>
          </CheckBoxWrapper>
        ) : (
          <Settings />
        )}
      </Header>
      <WrapContent>
        <Content>
          <Section>
            {loading ? (
              <Card>
                <Left>
                  <Label>
                    <Skeleton width={120} />
                  </Label>
                  <Description>
                    <Skeleton width={40} />
                  </Description>
                </Left>
              </Card>
            ) : (
              <Card key={expense?.id}>
                <Left>
                  <Label>{expense?.name}</Label>
                  <Description>{formatter.format(expense?.total)}</Description>
                </Left>
              </Card>
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
                      <Label>{u?.venmo?.displayName}</Label>
                      <Description>{formatter.format(u?.amount)}</Description>
                    </Left>
                    <Right>
                      <Status status={r?.status}>
                        {r?.status === 'succeeded' ? 'paid' : r?.status}
                      </Status>
                      <Date>{moment(r?.updatedAt).format('M/D/YY h:mmA')}</Date>
                    </Right>
                  </Item>
                ))
              )
            ) : !loading ? (
              <Area>
                <WrapPartyFace>
                  <IconPartyFace />
                </WrapPartyFace>
                <Text>You've got no expense requests!</Text>
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

export default Expense;
