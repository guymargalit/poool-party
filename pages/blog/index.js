import React from 'react';
import styled from 'styled-components';
import { getSortedPostsData } from '../../lib/posts';
import Link from 'next/link';
import Page from '../../components/Page';
import moment from 'moment';

const Title = styled.div`
  font-weight: 700;
  font-size: 32px;
`;

const Text = styled.p`
  font-weight: 400;
  font-size: 18px;
`;

const Subtitle = styled.h2`
  font-weight: 400;
  font-size: 14px;
`;

const Items = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-top: -15px;
`;

const WrapItem = styled(Link)``;

const Item = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.bg.border};
  color: ${({ theme }) => theme.text.primary};
  transition: all 0.25s ease 0s;
  @media (hover: hover) and (pointer: fine) {
    :hover {
      color: ${({ theme }) => theme.text.tertiary};
    }
  }
  :active {
    color: ${({ theme }) => theme.text.tertiary};
  }
`;

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

const Blog = ({ darkMode, setDarkMode, allPostsData }) => {
  return (
    <Page darkMode={darkMode} setDarkMode={setDarkMode}>
      <Items>
        {allPostsData.map(({ id, date, title, description }, index) => (
          <WrapItem href={`/blog/${id}`} key={index}>
            <Item>
              <Subtitle>{moment(date).format('MMMM D, YYYY')}</Subtitle>
              <Title>{title}</Title>
              <Text>{description}</Text>
            </Item>
          </WrapItem>
        ))}
      </Items>
    </Page>
  );
};

export default Blog;
