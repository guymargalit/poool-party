import Router from 'next/router';
import React, { useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  z-index: 4;
  overflow: hidden;
`;

const Loading = () => {
  useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      Router.push('/');
    }, 3000);
    return () => (interval ? clearInterval(interval) : null);
  }, []);
  return <Container></Container>;
};

export default Loading;
