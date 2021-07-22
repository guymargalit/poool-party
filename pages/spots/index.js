import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 35px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  color: #222;
  text-align: center;
  font-size: 24px;
  margin-bottom: 5px;
  height: 50px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 10px 0px;
  height: 300px;

  overflow-y: auto;
`;

const Chevron = styled.svg`
  height: 12px;
  width: 12px;
  display: block;
  fill: #333;
  transition: all 0.25s ease 0s;
`;

const Plus = styled.svg`
  display: block;
  fill: #333;
  transition: all 0.25s ease 0s;
  width: 24px;
  cursor: pointer;
  :hover {
    fill: ${(props) => props.theme.palette.dark.abisko};
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
  background-color: #eeeeee;
  color: ${(props) => (props.checked ? '#fff' : '#222')};
  :hover {
    background-color: ${(props) => props.theme.palette.dark.abisko};
    color: #fff;
  }
  :hover ${Chevron} {
    fill: #fff;
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

const Amount = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  text-align: center;
  font-size: 12px;
  margin-top: 10px;
`;

const parseName = (str) => {
  return str?.replace(/([-_][a-z])/g, (group) => group.replace('-', ' '));
};

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const Spots = ({ user, usd }) => {
  const [spots, setSpots] = useState(user?.spots);
  useEffect(
    () => user?.spots?.length > 0 && setSpots(user?.spots),
    [user?.spots]
  );
  return (
    <Container>
      <Header>
        <Title>Spots</Title>
        <Plus onClick={() => Router.push('/spots/create')} viewBox="0 0 24 24">
          <path d="M12 3a1 1 0 0 0-1 1v7H4a1 1 0 0 0 0 2h7v7a1 1 0 0 0 2 0v-7h7a1 1 0 0 0 0-2h-7V4a1 1 0 0 0-1-1z"></path>
        </Plus>
      </Header>
      <Content>
        {spots?.map((spot) => (
          <Item key={spot?.name}>
            <Info>
              <Label>{parseName(spot?.name)}</Label>
              <Amount>
                {!usd ? (
                  <Skeleton />
                ) : usd ? (
                  formatter.format(usd * spot?.total)
                ) : (
                  `${spot?.total} HNT`
                )}
              </Amount>
            </Info>
            <Chevron viewBox="0 0 18 18">
              <path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z"></path>
            </Chevron>
          </Item>
        ))}
      </Content>
    </Container>
  );
};

export default Spots;
