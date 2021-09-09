import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styled, { css, keyframes } from 'styled-components';

const Container = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  min-height: 100%;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  z-index: 4;
`;

const fade =  keyframes`
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
  color: ${({ theme }) => theme.colors.yellow};
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

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100px;
  justify-content: space-evenly;
  transition: all 0.25s ease 0s;
  animation: 1s ease-out 0s 1 ${fade};
`;

const slide =  keyframes`
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
  animation: ${({place}) => css`${place*0.25}s ease-out 0s 1 ${slide}`};
  -ms-flex-align: center;
  align-items: center;
  box-shadow: 
    0px 1px 2px 0px rgba(0, 0, 0, 0.1),
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

const Background = styled.div`
  display: flex;
  position: absolute;
  z-index: 3px;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  background-color: #8fd0fa;
  overflow: hidden;
`;

const swell = keyframes`
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0%);
  }
`;

const floating = keyframes`
  0% { transform: translate(0,  0px) rotate(-5deg); }
  50%  { transform: translate(0, 15px) rotate(15deg); }
  100%   { transform: translate(0, -0px) rotate(-5deg); }  
`;


const Wave = styled.svg`
  width: 200%;
  animation-name: ${swell};
  animation-duration: 2s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  fill: #54c0f9;
  z-index: 5;
  position: absolute;
`;

const WrapFlamingo = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 10%;
  padding-bottom: 5%;
`;

const Flamingo = styled.svg`
  width: 30%;
  max-width: 300px;
  min-width: 100px;
  animation-name: ${floating};
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  z-index: 6;
`;

const getTotals = async () => {
  // First, get latest helium price
  let heliumUSD = 0.0;
  const result = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=helium&vs_currencies=usd'
  );
  const response = await result.json();
  if (response.helium) {
    heliumUSD = response.helium.usd;
  }

  // Create our number formatter.
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  // Now, get the data from the hotspots
  const date = new Date();
  const spots = [
    {
      address: '112Rg8jCvVTpe5PiiyvF1NyKRYZnaVVyxVweATzF5UkKCVpqXvZP',
      name: 'Fluffy Spruce Tiger',
    },
    {
      address: '112N87rUHeUhXwh2CbFCx22xyDLZ7wsqLQuGmf9VRTsB2AYjjhat',
      name: 'Soaring Caramel Bat',
    },
    {
      address: '11wTukgHY2sPn9psyhjxSZHhS4s3QfCECHcXkixwDTT79Z5BUrC',
      name: 'Long Bamboo Dalmatian',
    },
  ];
  let total = 0;
  const hotspots = [];
  for (const spot of spots) {
    const result = await fetch(
      `https://api.helium.io/v1/hotspots/${
        spot.address
      }/rewards/sum?min_time=2021-07-01T00:00:00.000Z&max_time=${date.toISOString()}&bucket=week`
    );
    const response = await result.json();
    if (response.data && response.data.length) {
      let hotspotTotal = 0;
      for(const t of response.data) {
        hotspotTotal += parseFloat(t.total)
      }
      hotspots.push({
        name: spot.name,
        total: parseFloat(heliumUSD) * hotspotTotal,
      });
      total += hotspotTotal;
    }
  }
  // Convert to USD
  total = parseFloat(heliumUSD) * total;

  return {
    hotspots: hotspots
      .sort((a, b) => b.total - a.total)
      .map((h) => ({ ...h, total: formatter.format(h.total) })),
    total: formatter.format(total),
    each: formatter.format(total / 3),
    updated: new Date().toString(),
  };
};

const Home = (props) => {
  const [data, setData] = useState({
    hotspots: [],
    total: 0,
    each: 0,
    updated: new Date().toString(),
  });
  useEffect(async () => {
    setData(await getTotals());
    setInterval(async () => {
      setData(await getTotals());
    }, 5000);
  }, []);

  return (
    <Container>
      <Head>
        <title>Helium Poool Party</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Content>
        <List>
          {data.hotspots.map((h, i) => (
            <Badge place={i}>
              {h.name}: {h.total}
            </Badge>
          ))}
        </List>
        <Title>helium.poool.party</Title>
        <Subtitle>{data.total} USD</Subtitle>
        <Subtitle>{data.each} USD per Partier</Subtitle>
        <Footer>Last updated: {data.updated}</Footer>
      </Content>
      <Background>
        <WrapFlamingo>
          <Flamingo x="100" viewBox="0 0 629.67 631.82">
            <g id="Layer_2" data-name="Layer 2">
              <path
                fill="#eabcd5"
                d="M627.35,313.49c-4.12-2.38-31.56,65.1-47,61-3.1-.82-4.33-4.41-5-5-127.72-111.33-369.21-25-371-29-37-82,91-175,61-273-7.85-25.65-25-55-58-65C169-9.13,85.32,24.76,77.82,105.14a15.14,15.14,0,0,1-7.13,11.52,339.21,339.21,0,0,1-44.34,21.83c-5.17,2-25,25.89-25,59-.05,28.79,15.78,61.28,30,61s34-45,43-51c9.47-6.31,22-8,45-13,2.12-.46,14-2,36-4,24.07-2.19,28.34,2.92,30,5,6,7.49,2,21.81-1,25-29.26,31.16-60.21,175.4-52,239,37,287.07,524.81,178,467-52-3.27-13,11.53-17.91,19-34C629.1,350.33,633.72,317.19,627.35,313.49ZM465.88,430.35c-8.75,9.42-53.81,21-98.8,21.75-1.53,0-3.07,0-4.62,0-39.25,0-83.52-8.35-93-17.8a5.32,5.32,0,0,1-1.86-3.75c.06-5.35,11.65-15.41,88.48-22.67a99.57,99.57,0,0,1,14-.36h0c56.09,2.5,97.19,13.09,97.52,19A5.25,5.25,0,0,1,465.88,430.35Z"
                transform="translate(-0.57 -0.27)"
              />
            </g>
            <g id="Layer_7" data-name="Layer 7">
              <path
                fill="#e397bc"
                d="M267,429c50-22,125.94-28,204-2,0,0,5-10,2-15-12.82-21.37-95.78-22.29-106-22-9.18.26-102,3.06-102,27A43.6,43.6,0,0,0,267,429Z"
                transform="translate(-0.57 -0.27)"
              />
            </g>
            <g id="Layer_8" data-name="Layer 8">
              <path
                fill="#e397bc"
                d="M132,455c-.5.5-12.45,181.71,230,177,206-4,237-152,237-151,0,.71-101.08,113.49-236.5,111.5C158.5,589.5,132.5,454.5,132,455Z"
                transform="translate(-0.57 -0.27)"
              />
            </g>
            <g id="Layer_10" data-name="Layer 10">
              <path
                fill="#8d8d8d"
                d="M477.2,341l-.24.32c.88,2.83.05,7-4.64,13.13-9,11.74-28,33.39-34.87,41-8.36,9.23-15.84,14.56-30.23,13-16.69-1.83-52.08-8.73-58.19-11.06-2.19-.84-5.41-1.74-6.39-4.45l0,0c-.23-.25-.54,2,5.37,14.23a10.73,10.73,0,0,0,6.9,5.79c11.29,2.81,53.24,8.59,55.95,9.29,9.88,2.56,20.21.76,30.07-9.25,1-1,19.5-24.13,37.11-43.38C487.92,358.71,479.22,347.09,477.2,341Z"
                transform="translate(-0.57 -0.27)"
              />
              <path
                fill="#fff"
                d="M349,397.34c6.11,2.33,41.5,9.23,58.19,11.06,14.39,1.58,21.87-3.75,30.23-13,6.84-7.57,25.91-29.22,34.87-41,4.69-6.14,5.52-10.3,4.64-13.13-1.4-4.47-7.11-5.58-8.64-5.81-20.84-3.07-49.71-8.78-55-9.64-17-2.75-26.62,7.3-28.34,9.65-5,6.87-38.05,45.62-38.26,45.91-4.14,5.72-4.87,9.21-4.05,11.45C343.62,395.6,346.84,396.5,349,397.34Zm13.27-21.08c4.95-25.81,46-46.18,71.93-42.11,14.22,2.24,34.91,11.21,14,39.82-18.28,25-56.1,25.47-62.08,24.48C370.2,395.82,359.62,390.19,362.3,376.26Z"
                transform="translate(-0.57 -0.27)"
              />
              <path
                fill="#565656"
                d="M386.14,398.45c6,1,43.8.52,62.08-24.48,20.92-28.61.23-37.58-14-39.82-25.92-4.07-67,16.3-71.93,42.11C359.62,390.19,370.2,395.82,386.14,398.45Z"
                transform="translate(-0.57 -0.27)"
              />
            </g>
            <g id="Layer_11" data-name="Layer 11">
              <path
                fill="#8d8d8d"
                d="M445.81,423l-.34.22c-.17,2.95-2.41,6.56-9,10.64-12.53,7.81-38,21.34-47.09,26-11.08,5.69-20,8-32.87,1.48-15-7.61-45.64-26.57-50.53-30.91-1.76-1.56-4.45-3.54-4.41-6.42l0,0c-.12-.32-1.22,1.72,0,15.21A10.78,10.78,0,0,0,306,447c9.56,6.62,46.77,26.84,49.06,28.45,8.34,5.89,18.64,7.85,31.39,2,1.3-.6,26.78-15.68,50-27.47C449.59,443.31,445.56,429.37,445.81,423Z"
                transform="translate(-0.57 -0.27)"
              />
              <path
                fill="#fff"
                d="M306,430.4c4.89,4.34,35.56,23.3,50.53,30.91,12.91,6.56,21.79,4.21,32.87-1.48,9.07-4.66,34.56-18.19,47.09-26,6.56-4.08,8.8-7.69,9-10.64.27-4.68-4.67-7.74-6-8.49C421,404.47,396,388.93,391.37,386.25c-15-8.59-27.49-2.58-29.93-1-7.11,4.66-51.71,29.24-52,29.43-5.89,3.89-7.81,6.9-7.84,9.28C301.56,426.86,304.25,428.84,306,430.4Zm19.86-15c13.74-22.39,59.36-26.95,82.17-14,12.51,7.12,28.7,22.81-1,42.19-25.93,16.93-61.48,4-66.72,1C326.36,436.46,318.44,427.46,325.87,415.36Z"
                transform="translate(-0.57 -0.27)"
              />
              <path
                fill="#565656"
                d="M340.34,444.55c5.24,3,40.79,15.95,66.72-1,29.68-19.38,13.49-35.07,1-42.19-22.81-13-68.43-8.41-82.17,14C318.44,427.46,326.36,436.46,340.34,444.55Z"
                transform="translate(-0.57 -0.27)"
              />
            </g>
            <g id="Layer_12" data-name="Layer 12">
              <path
                fill="#8d8d8d"
                d="M373.14,378.54l-.39.11c-1,2.8-4.14,5.64-11.57,7.75-14.2,4-42.43,10-52.45,12-12.22,2.4-21.4,2.2-32-7.68-12.28-11.44-36.51-38.15-40-43.67-1.25-2-3.3-4.63-2.46-7.39,0,0,0,0,0,0,0-.34-1.65,1.31-4.2,14.62a10.72,10.72,0,0,0,2.07,8.76c7.36,9,37.52,38.73,39.27,40.92,6.39,8,15.74,12.7,29.63,10.57,1.41-.22,30.07-7.67,55.69-12.56C371.14,399.13,371.12,384.62,373.14,378.54Z"
                transform="translate(-0.57 -0.27)"
              />
              <path
                fill="#fff"
                d="M236.73,347c3.5,5.52,27.73,32.23,40,43.67,10.59,9.88,19.77,10.08,32,7.68,10-2,38.25-7.92,52.45-12,7.43-2.11,10.59-4.95,11.57-7.75,1.55-4.42-2.35-8.72-3.44-9.82-14.87-14.93-34.59-36.78-38.34-40.64-12-12.39-25.7-10.08-28.48-9.22-8.13,2.51-57.79,13.8-58.12,13.9-6.74,2.11-9.41,4.47-10.1,6.75C233.43,342.38,235.48,345,236.73,347Zm23.24-9c19.41-17.72,64.5-9.48,82.84,9.29,10.05,10.3,21.27,29.86-12.62,40.28-29.6,9.09-60.18-13.15-64.38-17.52C254.61,358.46,249.49,347.62,260,338.05Z"
                transform="translate(-0.57 -0.27)"
              />
              <path
                fill="#565656"
                d="M265.81,370.1c4.2,4.37,34.78,26.61,64.38,17.52,33.89-10.42,22.67-30,12.62-40.28-18.34-18.77-63.43-27-82.84-9.29C249.49,347.62,254.61,358.46,265.81,370.1Z"
                transform="translate(-0.57 -0.27)"
              />
            </g>
            <g id="Layer_13" data-name="Layer 13">
              <path
                fill="#eabcd5"
                d="M267,429c-2.25,16.5,47.26,57.08,96,56,57.8-1.28,108-58,108-58C358,483,267,429,267,429Z"
                transform="translate(-0.57 -0.27)"
              />
            </g>
            <g id="Layer_3" data-name="Layer 3">
              <path
                fill="#2d292a"
                d="M30,137c-45.5,17.5-32,118-1.5,123.5C42.76,263.07,74.68,209.63,75,209c1-2,.29-15.22-7.5-23.5-9.64-10.25-21.79-4.75-32-14C23,160.17,30.92,136.65,30,137Z"
                transform="translate(-0.57 -0.27)"
              />
            </g>
            <g id="Layer_4" data-name="Layer 4">
              <path
                fill="#f2deef"
                d="M75,209c.48-5.4,42.5-9.5,47.5-17.5,11.42-18.27,20-42,8-57-15.81-19.76-53-33.19-53-31,.44,19.32-33.62,22.15-49.5,32.5-9.87,6.43-2.27,27.58,7,36,10.43,9.48,25.63,5.49,33.5,15.5a13.41,13.41,0,0,1,2.93,5.86"
                transform="translate(-0.57 -0.27)"
              />
            </g>
            <g id="Layer_5" data-name="Layer 5">
              <path
                fill="#fff"
                d="M155.29,111.34a15.19,15.19,0,0,1,22.87-.9c3.14,3.4,6,8.4,7.84,17.56,2.71,13.57-6.64,30.28-17,31-10.06.7-20.43-13.61-21-27A30.51,30.51,0,0,1,155.29,111.34Z"
                transform="translate(-0.57 -0.27)"
              />
            </g>
            <g id="Layer_6" data-name="Layer 6">
              <path
                fill="#333132"
                d="M156.28,122.12a7.66,7.66,0,0,1,11.53-.46c1.58,1.72,3,4.24,3.95,8.86,1.37,6.84-3.35,15.26-8.57,15.63-5.07.35-10.3-6.86-10.59-13.62A15.33,15.33,0,0,1,156.28,122.12Z"
                transform="translate(-0.57 -0.27)"
              />
            </g>
          </Flamingo>
        </WrapFlamingo>
        <Wave viewBox="0 0 12960 1120">
          <path d="M9720,320C8100,320,8100,0,6480,0S4860,320,3240,320,1620,0,0,0V1120H12960V0C11340,0,11340,320,9720,320Z">
            <animate
              dur="5s"
              repeatCount="indefinite"
              attributeName="d"
              values="
              M9720,320C8100,320,8100,0,6480,0S4860,320,3240,320,1620,0,0,0V1120H12960V0C11340,0,11340,320,9720,320Z;
              M9720,0C8100,0,8100,319,6480,319S4860,0,3240,0,1620,320,0,320v800H12960V320C11340,320,11340,0,9720,0Z;
              M9720,320C8100,320,8100,0,6480,0S4860,320,3240,320,1620,0,0,0V1120H12960V0C11340,0,11340,320,9720,320Z
            "
            />
          </path>
        </Wave>
      </Background>
    </Container>
  );
};

export default Home;
