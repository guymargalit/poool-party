import React, { Fragment, useEffect } from 'react';
import styled from 'styled-components';
import { IconPartyFace, IconPopper } from '../../icons';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  flex: 1;
  padding: 0 35px;
  @media (max-width: 675px) {
    padding: 0 10px;
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
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  color: #222;
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
  color: #444;
  text-align: center;
  font-size: 18px;
  max-width: 400px;
`;

const WrapPartyFace = styled.div`
  min-width: 35px;
  max-width: 55px;
  width: 10%;
  margin-top: 30px;
`;

const WrapPopper = styled.div`
  width: 20px;
  margin-left: 5px;
  transition: all 0.25s ease 0s;
`;

const Dashboard = ({ user }) => {
  return (
    <Fragment>
      <Header>
        <Title>Dashboard</Title>
      </Header>
      <Content>
        <WrapPartyFace>
          <IconPartyFace />
        </WrapPartyFace>
        <Title>Mazal Tov!</Title>
        <Subtitle>
          You've got no pools partying
          <WrapPopper>
            <IconPopper />
          </WrapPopper>
        </Subtitle>
        {JSON.stringify(user?.expenses)}
      </Content>
    </Fragment>
  );
};

export default Dashboard;
