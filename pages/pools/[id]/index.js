import React, { Fragment, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Router from 'next/router';
import { useRouter } from 'next/router';
import Expense from '../../../components/Expense';
import {
  IconEmpty,
  IconLeftChevron,
  IconPartyFace,
  IconPlus,
  IconPopper,
  IconRightChevron,
  IconSettings,
} from '../../../icons';
import currency from 'currency.js';
import Skeleton from 'react-loading-skeleton';

const WrapContent = styled.div`
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  width: 100%;
  height: calc(100% - 155px);
  overflow-y: auto;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  color: ${({theme}) => theme.text.primary};
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
  color: ${({theme}) => theme.text.tertiary};
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
  color: ${({theme}) => theme.text.secondary};
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
  border-bottom: 1px solid ${({theme}) => theme.bg.border};
  user-select: none;
`;

const LeftChevron = styled(IconLeftChevron)`
  width: 28px;
  cursor: pointer;
  fill: ${({theme}) => theme.text.primary};
  transition: all 0.25s ease 0s;
  @media (hover: hover) and (pointer: fine) {
    :hover {
      fill: ${({theme}) => theme.colors.purple};
    }
  }
`;

const Settings = styled(IconEmpty)`
  width: 28px;
  height: 28px;
  /* cursor: pointer; */
  fill: ${({theme}) => theme.text.primary};
  transition: all 0.25s ease 0s;
  /* :hover {
    fill: ${(props) => props.theme.palette.dark.abisko};
  } */
`;

const Plus = styled(IconPlus)`
  width: 24px;
  height: 24px;
  fill: ${({theme}) => theme.text.tertiary};
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
  border-bottom: 1px solid ${({theme}) => theme.bg.border};
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
  color: ${({theme}) => theme.text.tertiary};
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
  background-color: ${({theme}) => theme.bg.content};
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
  border-top: 1px solid ${({theme}) => theme.bg.border};
  background-color: ${({theme}) => theme.bg.content};
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
  color: ${({theme}) => theme.colors.white};
  background-color: ${({theme}) => theme.colors.purple};
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
      background-color: ${({theme}) => theme.button.hover};
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
  fill: ${({ loading, theme }) => (loading ? '#e2e2e2' : theme.text.quarternary)};
  transition: all 0.25s ease 0s;
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 1px 0;
  height: 70px;
  width: 100%;
  padding: 0 35px;
  @media (max-width: 675px) {
    padding: 0 20px;
  }
  cursor: pointer;
  transition: all 0.25s ease 0s;
  border-top: 1px solid ${({theme}) => theme.bg.border};
  color: ${({theme, checked}) => (checked ? theme.colors.white : theme.text.primary)};
  @media (hover: hover) and (pointer: fine) {
    :hover {
      background-color: ${({theme}) => theme.colors.purple};
      color: ${({theme}) => theme.colors.white};
    }
    :hover ${RightChevron} {
      fill: ${({theme}) => theme.colors.white};
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

const Badge = styled.div`
  font-size: 10px;
  text-transform: uppercase;
  display: inline-flex;
  text-align: center;
  padding: 0 0.2rem;
  align-items: center;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1),
    0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  color: ${({theme}) => theme.colors.white};
  background-color: ${({ paid, theme }) => (paid ? theme.colors.success : theme.colors.disabled)};
  border-radius: 0.25rem;
  margin-left: 10px;
  line-height: 1rem;
  font-weight: 700;
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

const Pool = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const [pool, setPool] = useState(props?.pool);
  const [loading, setLoading] = useState(true);
  const [panel, setPanel] = useState(false);

  const getPool = async () => {
    setLoading(true);
    const response = await fetch(`/api/pools/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    setPool(await response.json());
    setLoading(false);
  };
  useEffect(() => {
    getPool();
  }, []);

  return (
    <Fragment>
      <Header>
        <LeftChevron onClick={() => Router.push('/pools')} />
        {loading ? (
          <Skeleton height={20} width={150} />
        ) : (
          <Title>{pool?.name}</Title>
        )}
        <Settings />
      </Header>
      <WrapContent>
        <Content>
          <Section>
            <Subtitle>Your Party</Subtitle>
            <List>
              {loading
                ? Array(2)
                    .fill(0)
                    .map((u, i) => (
                      <WrapAvatar key={i}>
                        <Skeleton circle={true} height={40} width={40} />
                        <Name>
                          <Skeleton width={40} />
                        </Name>
                      </WrapAvatar>
                    ))
                : pool?.users?.map((u, i) => (
                    <WrapAvatar key={i}>
                      <Avatar src={u?.venmo?.image} />
                      <Name>{u?.venmo?.displayName?.split(' ')[0]}</Name>
                    </WrapAvatar>
                  ))}
              {/* {!loading && <WrapPlus>
                <Plus />
              </WrapPlus>} */}
            </List>
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
                    <RightChevron loading={loading} />
                  </Item>
                ))
            ) : pool?.expenses?.length > 0 ? (
              pool?.expenses?.map((expense) => (
                <Item
                  onClick={() =>
                    Router.push(`/pools/${pool?.id}/expenses/${expense?.id}`)
                  }
                  key={expense?.id}
                >
                  <Info>
                    <Label>{expense?.name}</Label>
                    <Description>
                      <Total>{formatter.format(expense?.total)}</Total>
                      {expense?.interval && (
                        <Badge>{intervalOptions[expense?.interval]}</Badge>
                      )}
                      {expense?.paid && (
                        <Badge paid>Paid</Badge>
                      )}
                    </Description>
                  </Info>
                  <RightChevron />
                </Item>
              ))
            ) : !loading ? (
              <Area>
                <WrapPartyFace>
                  <IconPartyFace />
                </WrapPartyFace>
                <Text>You've got no expenses!</Text>
              </Area>
            ) : (
              <></>
            )}
          </Items>
        </Content>
        <Panel panel={panel}>
          {panel ? (
            <Expense
              pool={pool}
              {...props}
              close={() => {
                setPanel(false);
                getPool();
              }}
            />
          ) : (
            <Footer>
              <Button onClick={() => setPanel(true)}>
                New Expense
                <Popper />
              </Button>
            </Footer>
          )}
        </Panel>
      </WrapContent>
    </Fragment>
  );
};

export default Pool;
