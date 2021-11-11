import React from 'react';
import styled from 'styled-components';
import { Logo } from '../../icons';
import Router from 'next/router';
import Footer from '../../components/Footer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 3;
  height: 100%;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  top: 0;
  position: absolute;
`;

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 75px;
  width: 100%;
  transition: all 0.5s ease 0s;
  border-bottom: 1px solid ${({ theme }) => theme.bg.border};
  position: absolute;
  background-color: ${({ theme }) => theme.bg.content};
  padding: 0 10px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  color: ${({ theme }) => theme.text.primary};
  text-align: center;
  font-size: 24px;
  height: 50px;
`;

const Subtitle = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  color: ${({ theme }) => theme.text.primary};
  text-align: center;
  font-size: 18px;
`;

const TextTitle = styled.h1`
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
  font-size: 20px;
`;

const Text = styled.p`
  font-weight: 400;
  color: ${({ theme }) => theme.text.primary};
  font-size: 14px;
`;

const WrapContent = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 85px 10px 20px;
  color: ${({ theme }) => theme.text.primary};
  font-size: 18px;
`;

const WrapLogo = styled(Logo)`
  height: 60px;
  margin: 20px 25px;
  @media (max-width: 675px) {
    height: 50px;
    margin: 15px 20px;
  }
  transition: all 0.25s ease 0s;
  cursor: pointer;
`;

const Panel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.bg.content};
  bottom: 0px;
  width: calc(100% - 35px);
  height: calc(100% - 215px);
  margin-top: 75px;
  transition: height 0.5s cubic-bezier(0, 0, 0.1, 1) 0s, visibility 0s ease 0s;
  user-select: none;
  overflow: hidden;
  border-radius: 24px;
  padding: 0px 15px;

  @media (max-width: 675px) {
    width: calc(100% - 20px);
    height: calc(100% - 200px);
  }
`;

const Items = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const WrapItem = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.bg.border};
`;

const Item = styled.div`
  color: ${({ theme }) => theme.text.primary};
  font-size: 18px;
  font-weight: 600;
`;

const FAQ = () => {
  return (
    <Container>
      <Header>
        <WrapLogo onClick={() => Router.push('/')} fill={'#fff'} />
      </Header>
      <Panel>
        <WrapContent>
          <Heading>
            <Title>FAQs</Title>
          </Heading>
          <Content>
            <Items>
              <WrapItem>
                <Item>How do I create an expense?</Item>
                <Text>
                  You can click the "Plus" button in the upper right corner for
                  general expenses or click the "New Expense" button in one of
                  your pools. For general expenses, you can search and user on
                  Venmo whereas pool expenses will be a selection on existing
                  pool users.
                </Text>
              </WrapItem>
              <WrapItem>
                <Item>Do my friends need an account?</Item>
                <Text>
                  If they have a Venmo account, they have Poool Party! All Venmo
                  users are searchable on Poool Party so no need to ask your
                  friends to make accounts.
                </Text>
              </WrapItem>
              <WrapItem>
                <Item>What information does Poool Party collect?</Item>
                <Text>
                  Anything that's public on your Venmo profile is stored on Poool Party. 
                </Text>
              </WrapItem>
              <WrapItem>
                <Item>Can Poool Party send payments on my behalf?</Item>
                <Text>
                  Nope. We will only send requests on your behalf for security purposes. 
                </Text>
              </WrapItem>
              <WrapItem>
                <Item>Is Poool Party free?</Item>
                <Text>
                  For now, yes. We will be adding "premium" features in the future.
                </Text>
              </WrapItem>
            </Items>
          </Content>
        </WrapContent>
      </Panel>
      <Footer fixed />
    </Container>
  );
};

export default FAQ;
