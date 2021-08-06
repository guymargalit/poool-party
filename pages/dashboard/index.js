import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import { IconPartyFace, IconPopper } from '../../icons';

const Content = styled.div`
  width: 100%;
  height: calc(100% - 75px - env(safe-area-inset-bottom));
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
  border-bottom: 1px solid ${({theme}) => theme.bg.border};
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  color: ${({theme}) => theme.text.primary};
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
  color: ${({theme}) => theme.text.tertiary};
  text-align: center;
  font-size: 18px;
  max-width: 400px;
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

const WrapPopper = styled.div`
  width: 20px;
  margin-left: 5px;
  transition: all 0.25s ease 0s;
`;

const Dashboard = ({ user }) => {
  // const [requests, setRequests] = useState([]);
  // useEffect(() => {
  //   const getRequests = async () => {
  //     const response = await fetch(`/api/venmo/requests`, {
  //       method: 'GET',
  //       headers: { 'Content-Type': 'application/json' },
  //     });
  //     setRequests(await response.json());
  //   };
  //   getRequests();
  // }, []);
  return (
    <Fragment>
      <Header>
        <Title>Dashboard</Title>
      </Header>
      <Content>
        <Area>
          <WrapPartyFace>
            <IconPartyFace />
          </WrapPartyFace>
          <Text>
            {user?.venmo
              ? "Mazal Tov! You've got no pools partying!"
              : 'Link your Venmo to start making pools!'}
          </Text>
        </Area>
      </Content>
    </Fragment>
  );
};

export default Dashboard;
