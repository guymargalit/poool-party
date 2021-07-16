import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styled, { css, keyframes } from 'styled-components';
import prisma from '../lib/prisma';
import { signIn, signOut, useSession } from 'next-auth/client';
import Router from 'next/router';
import Layout from '../components/Layout';

const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 80px;
  @media (min-width: 744px) {
    padding-left: 40px;
    padding-right: 40px;
  }

  @media (min-width: 375px) {
    padding-left: 24px;
    padding-right: 24px;
  }
`;

const Login = styled.div`
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1),
    0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  display: inline-flex;
  text-align: inherit;
  text-decoration: none;
  user-select: auto;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 21px;
  height: 42px;
  position: relative;
  transition: all 0.25s ease 0s;
  min-width: 100px;
  z-index: 1;
  color: ${({ theme }) => theme.colors.primary};
  :hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  font-size: 15px;
  font-weight: 500;
`;

const WrapMenu = styled.div`
  position: relative;
  display: flex;
  background-color: red;
`;

const Menu = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  width: 220px;
  right: 0;
  left: auto;
  border-radius: 11px;
  margin-top: 52px;
  z-index: 8;
  background-color: ${({ theme }) => theme.colors.white};
  align-items: center;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1),
    0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  padding: 10px 0px;
`;

const MenuItem = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  user-select: none;
  padding: 0 20px;
  width: 100%;
  height: 40px;
  cursor: pointer;
  font-size: 14px;
  font-weight: ${({ bold }) => (bold ? 500 : 400)};
  color: ${({ theme }) => theme.colors.primary};
  transition: all 0.25s ease 0s;
  :hover {
    background-color: #ebebeb;
  }
`;

const Divider = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  height: 1px;
  background-color: #ebebeb;
  margin: 5px 0;
`;

const MenuIcon = styled.svg`
  display: block;
  fill: none;
  height: 16px;
  width: 16px;
  stroke: ${({ theme }) => theme.colors.primary};
  stroke-width: 3;
  overflow: visible;
`;

const Profile = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  flex: 0 0 30px;
  height: 30px;
  margin-left: 12px;
  overflow: hidden;
  position: relative;
  width: 30px;
  z-index: 1;
`;

const ProfileIcon = styled.svg`
  display: block;
  height: 100%;
  width: 100%;
  fill: currentcolor;
`;

const MenuButton = styled.div`
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1),
    0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  padding: 5px 5px 5px 12px;
  display: flex;
  text-align: inherit;
  text-decoration: none;
  user-select: auto;
  align-items: center;
  justify-content: space-evenly;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 21px;
  height: 42px;
  position: relative;
  transition: all 0.25s ease 0s;
  min-width: 85px;
  z-index: 1;
  color: ${({ theme }) => theme.colors.primary};
  :hover {
    background-color: #ebebeb;
  }
`;

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
