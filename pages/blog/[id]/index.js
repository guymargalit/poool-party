import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Page from '../../../components/Page';
import { getAllPostIds, getPostData } from '../../../lib/posts';

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  max-width: 100%;
  color: ${({ theme }) => theme.text.primary};
  font-size: 18px;
  margin-bottom: 40px;
  white-space: pre-wrap;
  overflow-wrap: break-word;

  h1 {
    font-size: 24px;
    line-height: 24px;
  }

  blockquote {
    font-style: italic;
    overflow-wrap: break-word;
  }

  a {
    color: #0070f3;
    text-decoration: underline;
  }

  img {
    display: block;
    margin: 0 auto;
    max-width: 100%;
  }

  code,
  kbd,
  pre,
  samp {
    font-family: monospace, monospace;
    font-size: 16px;
    white-space: pre-wrap;
  }

  pre > code {
    display: block;
    color: ${({ theme }) => theme.text.code};
    background-color: ${({ theme }) => theme.bg.code};
    border-radius: 4px;
    font-size: 16px;
    padding: 1rem 1.5rem;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1),
      0px 2px 10px 0px rgba(0, 0, 0, 0.08);
    white-space: pre-wrap;
    overflow-wrap: break-word;
  }
`;

const Title = styled.div`
  width: 100%;
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
  text-align: left;
  font-size: 3.2rem;
  padding: 0.2rem 0.8rem;
  @media (max-width: 675px) {
    font-size: 2.4rem;
  }
`;

const Caption = styled.div`
  font-weight: 400;
  color: ${({ theme }) => theme.text.tertiary};
  text-align: left;
  font-size: 18px;
  margin: 0.2rem 0.8rem;
  margin-top: 20px;
  @media (max-width: 800px) {
    margin-top: 0px;
  }
  @media (max-width: 675px) {
    font-size: 14px;
  }
`;

const Post = ({ darkMode, setDarkMode, postData }) => {
  return (
    <Page
      heading={
        <>
          <Caption>{moment(postData.date).format('MMMM D, YYYY')}</Caption>
          <Title>{postData.title}</Title>
        </>
      }
      darkMode={darkMode}
      setDarkMode={setDarkMode}
    >
      <Content dangerouslySetInnerHTML={{ __html: postData?.contentHtml }} />
    </Page>
  );
};

export default Post;
