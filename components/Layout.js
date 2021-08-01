import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';
import { useSession, getSession } from 'next-auth/client';
import Router from 'next/router';
import Toy from './Toy';
import Wave from './Wave';
import { routes } from '../lib/routes';
import { IconDashboard, IconPools, IconProfile } from '../icons';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  min-height: 100%;
  z-index: 1;
  background-color: #54c0f9;
  overflow: hidden;
`;

const WrapContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  z-index: 4;
  position: sticky;
  visibility: ${({ isLoading }) => (isLoading ? 'hidden' : 'visible')};
  opacity: ${({ isLoading }) => (isLoading ? 0 : 1)};
  transition: all 0.5s ease-in;
`;

const Content = styled.div`
  position: absolute;
  flex-direction: column;
  align-items: center;
  flex: 1;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ background }) => (background ? '38px' : '0px')};
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  margin-top: 20px;
  overflow: hidden;
  transition: all 0.5s ease 0s;
  height: ${({ height }) => height || '50%'};
  bottom: ${({ navigation }) => (navigation ? '65px' : '0px')};
  @media (min-width: 500px) and (max-height: 600px) {
    height: calc(100vh - 100px);
  }
  ${({ background }) =>
    !background &&
    css`
      height: calc(100% - 65px);
    `};
`;

const Panel = styled.div`
  height: 65px;
  background-color:${({ theme }) => theme.colors.white};
  width: 100%;
  bottom: 0;
`;

const Hero = styled.div`
  display: ${({ background }) => (background ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: flex-end;
  background-color: #8fd0fa;
  overflow: hidden;
  position: relative;
  height: 300px;
  @media (max-width: 675px) {
    height:  ${({ home }) => home ? '200px':'130px'};
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
  height: ${({ visible }) => (visible ? '65px' : '0px')};
  left: 0px;
  overflow: hidden;
  position: fixed;
  right: 0px;
  z-index: 100;
  user-select: none;
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  transition: all 0.5s ease 0s;
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
  transition: all 0.25s ease 0s;
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

const WrapItem = styled.div`
  outline: none;
  align-items: center;
  border-radius: 8px;
  color: ${(props) =>
    props.active ? `rgb(34, 34, 34)` : `rgb(113, 113, 113)`};
  :hover {
    color: rgb(34, 34, 34);
  }
  ${Item} {
    color: ${(props) =>
      props.active
        ? `${props.theme.palette.dark.abisko}`
        : `rgb(176, 176, 176)`};
  }
  :hover ${Item} {
    color: ${(props) => props.theme.palette.dark.abisko};
  }
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
  transition: all 0.25s ease 0s;
  user-select: none;
`;

const toys = [
  {
    type: 'zebra',
    position: { x: '80%', y: '8%', z: 4 },
  },
  {
    type: 'tiger',
    position: { x: '10%', y: '6%', z: 4 },
  },
  {
    type: 'flamingo',
    position: { x: '18%', y: '2%', z: 7 },
  },
  {
    type: 'unicorn',
    position: { x: '60%', y: '3%', z: 7 },
  },
];

const Layout = (props) => {
  const router = useRouter();
  const [session, loading] = useSession();
  const [isAuth, setIsAuth] = useState(false);

  const [height, setHeight] = useState('50%');
  const [navigation, setNavigation] = useState(true);
  const [background, setBackground] = useState(false);

  const [toy, setToy] = useState(props.user?.toy);
  useEffect(
    () => props.user?.toy && setToy(props.user?.toy),
    [props.user?.toy]
  );

  const isLoading = typeof window !== 'undefined' && loading;

  useEffect(() => {
    setNavigation(routes[router.pathname]?.navigation);
    setHeight(routes[router.pathname]?.height);
    setBackground(routes[router.pathname]?.background);
    // Non-auth user can only access homepage
    if (!isLoading && !session && router.pathname !== '/') {
      Router.push('/');
    }
    // Auth-user redirected from homepage to dashboard
    else if (!isLoading && session && router.pathname === '/') {
      Router.push('/dashboard');
    }
    // Non venmo user redirected to connect venmo
    else if (
      !isLoading &&
      session &&
      props?.user &&
      (!props?.user?.venmo || props?.user?.venmo?.expiredAt) &&
      router.pathname !== '/connect/venmo'
    ) {
      Router.push('/connect/venmo');
    } else if (session && props?.user?.venmo) {
      setIsAuth(true);
    }
  }, [props?.user, props?.user?.venmo, isLoading, session, router.pathname]);

  return (
    <Container>
      <Hero home={router.pathname === '/'} background={background}>
        {props?.user ? (
          <Toy type={toy} position={{ x: '18%', y: '5%', z: 7 }} />
        ) : !isLoading && !session && router.pathname === '/' ? (
          <Toys>
            {toys.map((toy, i) => (
              <Toy key={i} {...toy} />
            ))}
          </Toys>
        ) : (
          <></>
        )}
        <Wave />
      </Hero>
      {!isLoading &&
        !(session && router.pathname === '/') &&
        !(!session && router.pathname !== '/') && (
          <>
            {router.pathname === '/' ? (
              <>{props.children}</>
            ) : (
              <WrapContent>
                <Content
                  background={background}
                  navigation={navigation}
                  height={height}
                >
                  {props.children}
                </Content>
                <Panel />
              </WrapContent>
            )}
            <Navigation visible={isAuth && navigation}>
              <Bar>
                <WrapItem
                  active={router.pathname === '/dashboard'}
                  onClick={() => Router.push('/dashboard')}
                >
                  <Item>
                    <IconDashboard />
                  </Item>
                  <Label>Dashboard</Label>
                </WrapItem>
                <WrapItem
                  active={router.pathname.includes('/pools')}
                  onClick={() => Router.push('/pools')}
                >
                  <Item>
                    <IconPools />
                  </Item>
                  <Label>Pools</Label>
                </WrapItem>
                <WrapItem
                  active={router.pathname.includes('/profile')}
                  onClick={() => Router.push('/profile')}
                >
                  <Item>
                    <IconProfile />
                  </Item>
                  <Label>Profile</Label>
                </WrapItem>
              </Bar>
            </Navigation>
          </>
        )}
    </Container>
  );
};

export async function getServerSideProps(ctx) {
  return { session: await getSession(ctx) };
}

export default Layout;
