import React from 'react';
import styled from 'styled-components';
import { Logo } from '../../icons';
import Router from 'next/router';
import Footer from '../../components/Footer';
import { getSortedPostsData } from '../../lib/posts';
import Link from 'next/link';

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
  height: calc(100% - 165px);
  margin-top: 35px;
  transition: height 0.5s cubic-bezier(0, 0, 0.1, 1) 0s, visibility 0s ease 0s;
  user-select: none;
  overflow: hidden;
  border-radius: 24px;
  padding: 0px 15px;

  @media (max-width: 675px) {
    width: 100%;
    height: 100%;
    margin-top: 75px;
    border-radius: 0;
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

const Item = styled(Link)`
  color: ${({ theme }) => theme.text.primary};
  font-size: 18px;
  font-weight: 600;
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
    <Container>
      <Header>
        <WrapLogo onClick={() => Router.push('/')} fill={'#fff'} />
      </Header>
      <Panel>
        <WrapContent>
          <Heading>
            <Title>Blog</Title>
          </Heading>
          <Content>
            <Items>
              {allPostsData.map(({ id, date, title }, index) => (
                <WrapItem>
                  <Item href={`/blog/${id}`}>{title}</Item>
                  <Text>{date}</Text>
                </WrapItem>
              ))}
            </Items>
          </Content>
        </WrapContent>
      </Panel>
      <Footer darkMode={darkMode} setDarkMode={setDarkMode} fixed />
    </Container>
  );
};

export default Blog;
