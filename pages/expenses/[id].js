import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import Router from 'next/router';
import { useRouter } from 'next/router';
import {
  IconEmpty,
  IconLeftChevron,
  IconPartyFace,
  IconPlus,
  IconPopper,
  IconRightChevron,
  IconTrash,
} from '../../icons';
import Skeleton from 'react-loading-skeleton';
import moment from 'moment';

const WrapContent = styled.div`
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  width: 100%;
  height: calc(100% - env(safe-area-inset-bottom));
  /* overflow-y: auto; */
`;

const Title = styled.div`
  font-weight: 700;
  text-align: center;
  color: ${({ theme }) => theme.text.primary};
  font-size: 24px;
  line-height: 24px;
  flex-grow: 1;
  @media (max-width: 675px) {
    font-size: 20px;
  }
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  :active {
    fill: ${({ theme }) => theme.colors.purple};
  }
`;

const WrapDelete = styled.div`
  visibility: ${({ modal }) => (modal ? 'visible' : 'hidden')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: ${({ modal }) =>
    modal ? ' rgba(0, 0, 0, 0.4)' : ' rgba(0, 0, 0, 0);'};
  transition: all 0.25s ease 0s;
`;

const Delete = styled.div`
  position: fixed;
  display: ${({ modal }) => (modal ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  z-index: 999;
  padding: 5px 30px;
  background-color: ${({ theme }) => theme.bg.content};
  border-radius: 18px;
  height: 100px;
  transition: all 0.1s ease 0s;
`;

const DeleteTitle = styled.div`
  width: 100%;
  font-weight: 500;
  color: ${({ theme }) => theme.text.tertiary};
  text-align: center;
  font-size: 16px;
  margin: 10px 0 20px;
`;

const WrapButtons = styled.div`
  display: flex;
`;

const CancelButton = styled.div`
  display: flex;
  text-align: center;
  width: 75px;
  height: 30px;
  padding-bottom: 2px;
  margin-left: 8px;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1),
    0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  color: ${({ theme }) => theme.colors.white};
  border-radius: 1.5rem;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  background-color: ${({ theme }) => theme.colors.purple};
  transition: all 0.25s ease 0s;
  @media (hover: hover) and (pointer: fine) {
    :hover {
      background-color: #042759;
    }
  }
  :active {
    background-color: #042759;
  }
`;

const DeleteButton = styled.div`
  display: flex;
  text-align: center;
  width: 80px;
  height: 30px;
  padding-bottom: 2px;
  margin-right: 8px;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1),
    0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  color: ${({ theme }) => theme.colors.white};
  border-radius: 1.5rem;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  background-color: ${({ theme }) => theme.colors.error};
  transition: all 0.25s ease 0s;
  @media (hover: hover) and (pointer: fine) {
    :hover {
      background-color: #d1435b;
    }
  }
  :active {
    background-color: #d1435b;
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

const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Items = styled.div`
  width: 100%;
  height: calc(100% - 145px);
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
  flex-direction: column;
  justify-content: center;
  margin: 1px 0;
  min-height: 70px;
  width: 100%;
  padding: 10px 35px;
  @media (max-width: 675px) {
    padding: 10px 20px;
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
  :active {
    background-color: ${({ theme }) => theme.colors.purple};
    color: ${({ theme }) => theme.colors.white};
  }
  :active ${RightChevron} {
    fill: ${({ theme }) => theme.colors.white};
  }
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  text-align: center;
  font-size: 16px;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
`;

const WrapBottom = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 5px;
  background-color: ${({ theme }) => theme.bg.border};
  border-radius: 8px;
  padding: 0 10px 7px;
  color: ${({ theme }) => theme.text.primary};
`;

const Description = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  text-align: center;
  font-size: 12px;
  margin-top: 5px;
`;

const Amount = styled.div`
  display: flex;
  margin-right: 10px;
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

const DeleteWrapper = styled.div`
  display: flex;
  position: relative;
  margin-right: 15px;
`;

const Trash = styled(IconTrash)`
  width: 28px;
  height: 28px;
  cursor: pointer;
  stroke: ${({ theme }) => theme.text.primary};
  transition: all 0.25s ease 0s;
  @media (hover: hover) and (pointer: fine) {
    :hover {
      stroke: ${({ theme }) => theme.colors.purple};
    }
  }
  :active {
    stroke: ${({ theme }) => theme.colors.purple};
  }
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

const Total = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  text-align: center;
  font-size: 12px;
`;

const Badge = styled.div`
  font-size: ${({ date }) => (date ? '12px' : '11px')};
  text-transform: uppercase;
  display: inline-flex;
  text-align: center;
  padding: 0 0.2rem;
  align-items: center;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1),
    0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  color: ${({ theme, date }) =>
    date ? theme.colors.primary : theme.colors.white};
  background-color: ${({ active, theme, date }) =>
    date
      ? theme.bg.border
      : active
      ? theme.colors.success
      : theme.colors.disabled};
  border-radius: 0.25rem;
  margin-left: 10px;
  line-height: 1rem;
  font-weight: ${({ date }) => (date ? '500' : '700')};
  transition: all 0.25s ease 0s;
`;

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const intervalOptions = {
  month: 'Monthly',
  week: 'Weekly',
  [null]: 'One Time',
};

const Expense = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const [expense, setExpense] = useState(props?.expense);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

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

  const deleteExpense = async () => {
    const response = await fetch(`/api/expenses/${expense?.id}/delete`, {
      method: 'GET',
    });

    if (response.ok) {
      Router.push('/dashboard');
    }
  };

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
      <WrapDelete onClick={() => setDeleting(false)} modal={deleting}>
        <Delete modal={deleting}>
          <DeleteTitle>Delete Expense?</DeleteTitle>
          <WrapButtons>
            <CancelButton onClick={() => setDeleting(false)}>
              Cancel
            </CancelButton>
            <DeleteButton onClick={deleteExpense}>Delete</DeleteButton>
          </WrapButtons>
        </Delete>
      </WrapDelete>
      <Header>
        <LeftChevron onClick={() => Router.back()} />
        {loading ? (
          <Skeleton height={20} width={150} />
        ) : (
          <Title>{expense?.name}</Title>
        )}
        <DeleteWrapper>
          <Trash onClick={() => setDeleting(true)} />
        </DeleteWrapper>
        {expense?.interval && expense?.venmo?.id === props?.user?.venmo?.id ? (
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
                <Top>
                  <Label>
                    <Skeleton width={120} />
                  </Label>
                  <Description>
                    <Skeleton width={40} />
                  </Description>
                </Top>
              </Card>
            ) : (
              <Card key={expense?.id}>
                <Top>
                  <Label>{expense?.name}</Label>
                  <Description>
                    <Total>{formatter.format(expense?.total)}</Total>
                    {expense?.interval && (
                      <Badge active={active}>
                        {intervalOptions[expense?.interval]}
                      </Badge>
                    )}
                    <Badge date>
                      {moment(expense?.startDate).format('M/D/YY h:mmA')}
                    </Badge>
                  </Description>
                </Top>
              </Card>
            )}
          </Section>
          <Items>
            {loading ? (
              Array(3)
                .fill(0)
                .map((u, i) => (
                  <Item key={i}>
                    <Top>
                      <Label>
                        <Skeleton width={120} />
                      </Label>
                    </Top>
                    <WrapBottom>
                      <Bottom>
                        <Skeleton width={'100%'} />
                      </Bottom>
                    </WrapBottom>
                  </Item>
                ))
            ) : expense?.users?.length > 0 ? (
              expense?.users?.map((u) => (
                <Item onClick={() => {}} key={u?.id}>
                  <Top>
                    <Label>{u?.venmo?.displayName}</Label>
                  </Top>
                  <WrapBottom>
                    {u?.requests?.map((r) => (
                      <Bottom key={r?.id}>
                        <Description>
                          <Amount>{formatter.format(u?.amount)}</Amount>
                          {expense?.venmo?.id === props?.user?.venmo?.id && (
                            <Status status={r?.status}>
                              {r?.status === 'succeeded' ? 'paid' : r?.status}
                            </Status>
                          )}
                        </Description>
                        <Date>
                          {moment(r?.updatedAt).format('M/D/YY h:mmA')}
                        </Date>
                      </Bottom>
                    ))}
                  </WrapBottom>
                </Item>
              ))
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
