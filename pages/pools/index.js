import React, { Fragment, useState, useEffect } from 'react';
import Router from 'next/router';
import styled, { keyframes } from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import { IconAdd, IconPartyFace, IconRightChevron } from '../../icons';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0px 35px;
  height: 75px;
  border-bottom: 1px solid #eeeeee;
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

const Content = styled.div`
  width: 100%;
  height: calc(100% - 75px - env(safe-area-inset-bottom));
  overflow-y: auto;
`;

const Chevron = styled(IconRightChevron)`
  height: 18px;
  width: 18px;
  display: block;
  fill: ${({ loading }) => (loading ? '#e2e2e2' : '#555')};
  transition: all 0.25s ease 0s;
`;

const Plus = styled(IconAdd)`
  display: block;
  fill: #333;
  transition: all 0.25s ease 0s;
  width: 32px;
  height: 32px;
  cursor: pointer;
  @media (hover: hover) and (pointer: fine) {
    :hover {
      fill: ${(props) => props.theme.palette.dark.abisko};
    }
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 1px 0;
  height: 70px;
  width: 100%;
  padding: 0 35px;
  cursor: pointer;
  transition: all 0.25s ease 0s;
  border-bottom: 1px solid #eeeeee;
  color: ${(props) => (props.checked ? '#fff' : '#222')};
  @media (hover: hover) and (pointer: fine) {
    :hover {
      background-color: ${(props) => props.theme.palette.dark.abisko};
      color: #fff;
    }
    :hover ${Chevron} {
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

const Info = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Description = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  text-align: center;
  font-size: 12px;
  margin-top: 5px;
`;

const WrapAvatar = styled.div`
  display: inline-flex;
  margin-right: 5px;
`;

const Avatar = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 25px;
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

const WrapPartyFace = styled.div`
  min-width: 35px;
  max-width: 55px;
  width: 10%;
  margin-top: 20px;
`;

const Area = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  user-select: none;
`;

const WrapLoader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;
  height: 100%;
`;

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`;

const Loader = styled.svg`
  animation: ${rotate} 2s linear infinite;
  width: 20px;
  height: 20px;
  margin-left: 6px;
  margin-bottom: 2px;
`;

const Circle = styled.circle`
  stroke: #222;
  stroke-linecap: round;
  animation: ${dash} 1.5s ease-in-out infinite;
  fill: none;
  stroke-width: 8px;
`;

const Pools = ({ user }) => {
  const getPools = async () => {
    const response = await fetch('/api/pools', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    setPools(await response.json());
    setLoading(false);
  };

  const [pools, setPools] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getPools();
  }, []);

  return (
    <Fragment>
      <Header>
        <Title>Pools</Title>
        {user?.venmo && <Plus onClick={() => Router.push('/pools/create')} />}
      </Header>
      <Content>
        {loading ? (
          Array(4)
            .fill(0)
            .map((p, i) => (
              <Item key={i}>
                <Info>
                  <Label>
                    <Skeleton width={100 + 30 * (i % 3)} />
                  </Label>
                  <Description>
                    {Array(2 + (i === 3 ? 2 : i % 2))
                      .fill(0)
                      .map((u, j) => (
                        <WrapAvatar key={j}>
                          <Skeleton circle={true} height={25} width={25} />
                        </WrapAvatar>
                      ))}
                  </Description>
                </Info>
                <Chevron loading={loading?.toString()} />
              </Item>
            ))
        ) : pools?.length > 0 ? (
          pools?.map((pool) => (
            <Item
              onClick={() => Router.push(`/pools/${pool?.id}`)}
              key={pool?.id}
            >
              <Info>
                <Label>{pool?.name}</Label>
                <Description>
                  {pool?.users?.map((u, i) => (
                    <WrapAvatar key={i}>
                      <Avatar src={u?.venmo?.image} />
                    </WrapAvatar>
                  ))}
                </Description>
              </Info>
              <Chevron />
            </Item>
          ))
        ) : (
          <Area>
            <WrapPartyFace>
              <IconPartyFace />
            </WrapPartyFace>
            <Text>
              {user?.venmo
                ? "You've got no pools!"
                : 'Link your Venmo to start making pools!'}
            </Text>
          </Area>
        )}
      </Content>
    </Fragment>
  );
};

export default Pools;
