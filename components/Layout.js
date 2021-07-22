import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import Router from 'next/router';
import Toy from './Toy';
import Wave from './Wave';
import Header from './Header';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  min-height: 100%;
  z-index: 1;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  z-index: 4;
  background-color: ${({ transparent }) =>
    transparent ? 'transparent' : '#54c0f9'};
`;

const Background = styled.div`
  display: flex;
  position: absolute;
  z-index: 1;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  background-color: #8fd0fa;
  overflow: hidden;
`;

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: #8fd0fa;
  overflow: hidden;
  position: relative;
  height: 350px;
  @media (max-width: 675px) {
    height: 300px;
  }
`;

const Toys = styled.div`
  display: flex;
  width: 100%;
`;

const Navigation = styled.nav`
  align-items: center;
  background-color: rgb(255, 255, 255);
  border-top: 1px solid rgb(221, 221, 221);
  bottom: 0px;
  height: 65px;
  left: 0px;
  overflow: hidden;
  position: fixed;
  right: 0px;
  z-index: 100;
  transition: transform 0.2s cubic-bezier(0, 0, 0.1, 1) 0s,
    visibility 0s ease 0s;
  user-select: none;

  @media (min-width: 1024px) {
    display: none;
    visibility: hidden;
  }
`;

const Bar = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  margin: 0px auto;
  max-width: 560px;
`;

const Item = styled.div`
  height: 30px;
  margin-bottom: 2px;
  padding: 3px;
  width: 30px;
  color: ${(props) =>
    props.active ? `${props.theme.colors.primary}` : `rgb(176, 176, 176)`};
`;

const Label = styled.div`
  font-size: 10px;
  line-height: 12px;
  max-height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
  overflow-wrap: break-word;
`;

const Svg = styled.svg`
  display: block;
  height: 24px;
  width: 24px;
  fill: currentcolor;
`;

const WrapItem = styled.div`
  outline: none;
  align-items: center;
  border-radius: 8px;
  color: rgb(113, 113, 113);
  cursor: pointer;
  display: flex;
  flex: 1 1 0px;
  flex-direction: column;
  height: 64px;
  hyphens: auto;
  justify-content: center;
  max-width: 20%;
  min-width: 0px;
  padding: 0px 2px;
  text-align: center;
  text-decoration: none;
`;

const Panel = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;
  flex: 1;
  width: 100%;
  padding-top: 15px;
  background-color: ${({ transparent, theme }) =>
    transparent ? 'transparent' : theme.colors.white};
  border-radius: 38px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  margin-top: 20px;
  margin-bottom: 65px;
  max-width: 1040px;
  height: 350px;
  box-shadow: 0px 16px 32px rgb(0 0 0 / 15%), 0px 3px 8px rgb(0 0 0 / 10%);
  @media (min-width: 1024px) {
    width: calc(100% - 40px);
    margin-bottom: 20px;
    border-radius: 38px;
  }
`;

const isBrowser = () => typeof window !== 'undefined';

const Layout = (props) => {
  const router = useRouter();
  const [session, loading] = useSession();
  const isUser = !!session?.user;
  useEffect(() => {
    if (loading || !isUser) {
      return (
        <Container>
          <Background>
            <Wave />
          </Background>
        </Container>
      );
    }
  }, [isUser, loading]);

  if (isBrowser() && !isUser && !loading && router.pathname !== '/') {
    router.push('/');
  } else if (isBrowser() && isUser && !loading && router.pathname === '/') {
    router.push('/dashboard');
  }

  const [toy, setToy] = useState(props.user?.toy);
  const [spots, setSpots] = useState(props.user?.spots?.length);
  const [panel, setPanel] = useState(true);
  useEffect(
    () => props.user?.toy && setToy(props.user?.toy),
    [props.user?.toy]
  );
  useEffect(
    () => props.user?.spots?.length && setSpots(props.user?.spots?.length),
    [props.user?.spots?.length]
  );

  if (isUser && !loading && router.pathname !== '/') {
    return (
      <Container>
        <Header />
        <Hero>
          <Toy
            type={toy}
            position={{ x: '18%', y: '3%', z: 7 }}
            spots={spots}
          />
          <Wave />
        </Hero>
        <Content>
          <Panel panel={panel} setPanel={setPanel}>
            {props.children}
          </Panel>
        </Content>
        <Navigation>
          <Bar>
            <WrapItem onClick={() => Router.push('/dashboard')}>
              <Item active={router.pathname === '/dashboard'}>
                <Svg>
                  <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 16H5V9h14z"></path>
                </Svg>
              </Item>
              <Label>Dashboard</Label>
            </WrapItem>
            <WrapItem onClick={() => Router.push('/pools')}>
              <Item active={router.pathname === '/pools'}>
                <Svg>
                  <path d="M12.143 4.286a1.143 1.143 0 0 0 0-2.286 1.143 1.143 0 0 0 0 2.286zM17 6.5A1.5 1.5 0 1 1 15.5 5 1.5 1.5 0 0 1 17 6.5zM10 10a2 2 0 1 0-2-2 2 2 0 0 0 2 2zm-7 3.982a.62.62 0 0 1 .758-.55 3.88 3.88 0 0 0 .742.068 3.285 3.285 0 0 0 1.605-.373 3.454 3.454 0 0 0 .959-.798c.08-.091.159-.187.23-.273l.085-.102a3.13 3.13 0 0 1 .252-.276A.51.51 0 0 1 8 11.5a.731.731 0 0 1 .496.2 3.123 3.123 0 0 1 .29.278c.032.032.064.067.099.104.08.085.17.18.261.272a3.828 3.828 0 0 0 1.077.785A4.07 4.07 0 0 0 12 13.5a4.088 4.088 0 0 0 1.777-.36 3.812 3.812 0 0 0 1.077-.786c.09-.091.18-.187.262-.273l.097-.103a3.392 3.392 0 0 1 .291-.278.731.731 0 0 1 .496-.2.513.513 0 0 1 .37.178 3.068 3.068 0 0 1 .251.275l.085.103c.071.086.15.182.23.273a3.471 3.471 0 0 0 .959.798 3.299 3.299 0 0 0 1.605.373 3.872 3.872 0 0 0 .742-.068.62.62 0 0 1 .758.55V18a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z"></path>
                </Svg>
              </Item>
              <Label>Pools</Label>
            </WrapItem>
            <WrapItem onClick={() => Router.push('/spots')}>
              <Item active={router.pathname === '/spots'}>
                <Svg>
                  <path d="M7 5a2 2 0 1 1-2-2 2 2 0 0 1 2 2zm0 7a2 2 0 1 1-2-2 2 2 0 0 1 2 2zm-2 9a2 2 0 1 0-2-2 2 2 0 0 0 2 2zm9-16a2 2 0 1 1-2-2 2 2 0 0 1 2 2zm-2 9a2 2 0 1 0-2-2 2 2 0 0 0 2 2zm2 5a2 2 0 1 1-2-2 2 2 0 0 1 2 2zm5-12a2 2 0 1 0-2-2 2 2 0 0 0 2 2zm2 5a2 2 0 1 1-2-2 2 2 0 0 1 2 2zm-2 9a2 2 0 1 0-2-2 2 2 0 0 0 2 2z"></path>
                </Svg>
              </Item>
              <Label>Spots</Label>
            </WrapItem>
          </Bar>
        </Navigation>
      </Container>
    );
  }

  if (!isUser && !loading && router.pathname === '/') {
    const toys = [
      {
        type: 'zebra',
        position: { x: '80%', y: '8%', z: 4 },
        spots: 2,
      },
      {
        type: 'tiger',
        position: { x: '10%', y: '6%', z: 4 },
        spots: 1,
      },
      {
        type: 'flamingo',
        position: { x: '18%', y: '2%', z: 7 },
        spots: 2,
      },
      {
        type: 'unicorn',
        position: { x: '60%', y: '3%', z: 7 },
        spots: 3,
      },
    ];

    return (
      <Container>
        <Content transparent>{props.children}</Content>
        <Background>
          <Toys>
            {toys.map((toy, i) => (
              <Toy key={i} {...toy} />
            ))}
          </Toys>
          <Wave />
        </Background>
      </Container>
    );
  }
  return (
    <Container>
      <Background>
        <Wave />
      </Background>
    </Container>
  );
};

export default Layout;
