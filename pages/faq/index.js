import React from 'react';
import styled from 'styled-components';
import Page from '../../components/Page';

const Title = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  color: ${({ theme }) => theme.text.primary};
  text-align: center;
  font-size: 24px;
  padding: 10px 15px;
`;

const Text = styled.p`
  font-weight: 400;
  color: ${({ theme }) => theme.text.primary};
  font-size: 14px;
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

const FAQ = ({ darkMode, setDarkMode }) => {
  return (
    <Page
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      heading={<Title>FAQs</Title>}
    >
      <Items>
        <WrapItem>
          <Item>How do I create an expense?</Item>
          <Text>
            You can click the "Plus" button in the upper right corner for
            general expenses or click the "New Expense" button in one of your
            pools. For general expenses, you can search and user on Venmo
            whereas pool expenses will be a selection on existing pool users.
          </Text>
        </WrapItem>
        <WrapItem>
          <Item>Do my friends need an account?</Item>
          <Text>
            If they have a Venmo account, they have Poool Party! All Venmo users
            are searchable on Poool Party so no need to ask your friends to make
            accounts.
          </Text>
        </WrapItem>
        <WrapItem>
          <Item>What information does Poool Party collect?</Item>
          <Text>
            Anything that's public on your Venmo profile is stored on Poool
            Party.
          </Text>
        </WrapItem>
        <WrapItem>
          <Item>Can Poool Party send money on my behalf?</Item>
          <Text>
            Nope. It will only ask for money (charge users) on your behalf
            for security purposes.
          </Text>
        </WrapItem>
      </Items>
    </Page>
  );
};

export default FAQ;
