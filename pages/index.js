import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styled, { css, keyframes } from 'styled-components';
import prisma from '../lib/prisma';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 1;
  z-index: 4;
`;

const fade = keyframes`
  0% {
    opacity: 0%;
  }
  100% {
    opacity: 100%;
  }
`;

const Title = styled.div`
  font-size: 50px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
`;

const Subtitle = styled.div`
  font-size: 25px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
`;

const Footer = styled.div`
  text-align: center;
  font-size: 15px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.primary};
  width: 300px;
`;

const Error = styled.div`
  text-align: center;
  margin-top: 5px;
  font-size: 12px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.error};
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100px;
  justify-content: space-evenly;
  transition: all 0.25s ease 0s;
  animation: 1s ease-out 0s 1 ${fade};
`;

const slide = keyframes`
  0% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0);
  }
`;

const Badge = styled.div`
  display: inline-flex;
  text-align: center;
  padding: 0 0.375rem;
  text-transform: capitalize;
  animation: ${({ place }) =>
    css`
      ${place * 0.25}s ease-out 0s 1 ${slide}
    `};
  -ms-flex-align: center;
  align-items: center;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1),
    0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  color: #111236;
  background-color: ${({ place }) => {
    switch (place) {
      case 0:
        return '#ffb54d';
      case 1:
        return '#cddff8';
      case 2:
        return '#ff9400';
      default:
        return '#e1ddec';
    }
  }};
  border-radius: 0.25rem;
  margin: 0;
  font-size: 0.8rem;
  line-height: 1rem;
  font-weight: 700;
`;

const parseName = (str) => {
  if (str) {
    return str.replace(/([-_][a-z])/g, (group) => group.replace('-', ' '));
  }
};

const getTotals = async (props) => {
  // First, get latest helium price
  let heliumUSD = 0;
  let estimate = null;
  const result = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=helium&vs_currencies=usd'
  );
  const response = await result.json();
  if (response.helium) {
    heliumUSD = response.helium.usd;
  }

  if (heliumUSD == 0) {
    estimate = 12.0;
    heliumUSD = estimate;
  }

  // Now, get the data from the spots
  const date = new Date();
  let total = 0;
  let spots = [];
  for (const spot of props.spots || []) {
    const result = await fetch(
      `https://api.helium.io/v1/hotspots/${
        spot.address
      }/rewards/sum?min_time=2021-07-01T00:00:00.000Z&max_time=${date.toISOString()}&bucket=week`
    );
    const response = await result.json();
    if (response.data && response.data[0]) {
      spots.push({
        name: spot.name,
        total: parseFloat(heliumUSD) * response.data[0].total,
      });
      total += response.data[0].total;
    }
  }
  // Convert to USD
  total = parseFloat(heliumUSD) * total;

  return {
    spots: spots.sort((a, b) => b.total - a.total),
    total: total,
    each: total / 3,
    updated: new Date().toString(),
    estimate: estimate,
  };
};

const Home = (props) => {
  const [data, setData] = useState({
    spots: [],
    total: 0,
    each: 0,
    updated: new Date().toString(),
    estimate: null,
  });
  useEffect(async () => {
    setData(await getTotals(props));
    setInterval(async () => {
      setData(await getTotals(props));
    }, 5000);
  }, []);
  // Create our number formatter.
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <>
      <Head>
        <title>Poool Party</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Content>
        <List>
          {data.spots.map((h, i) => (
            <Badge key={i} place={i}>
              {parseName(h.name)}: {formatter.format(h.total)}
            </Badge>
          ))}
        </List>
        <Title>poool.party</Title>
        <Subtitle>
          {data.estimate ? '~' : ''}
          {formatter.format(data.total)} USD
        </Subtitle>
        <Subtitle>
          {data.estimate ? '~' : ''}
          {formatter.format(data.each)} USD per Partier
        </Subtitle>
        <Footer>Last updated: {data.updated}</Footer>
        {data.estimate && (
          <Error>
            Failed to fetch HNT price. Estimating ~
            {formatter.format(data.estimate)} USD
          </Error>
        )}
      </Content>
    </>
  );
};

export const getServerSideProps = async () => {
  const spots = await prisma.spot.findMany({
    select: { name: true, address: true },
  });
  return { props: { spots, index: true } };
};

export default Home;
