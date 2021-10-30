import React, { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Router from 'next/router';
import Toy from './Toy';
import Wave from './Wave';
import { routes } from '../lib/routes';
import { IconAdd, IconDashboard, IconPools, IconProfile } from '../icons';
import Venmo from './Venmo';
import Expense from './Expense';
import Tooltip from './Tooltip';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  min-height: 100%;
  z-index: 1;
  margin-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  background-color: ${({ theme }) => theme.bg.wave};
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
  transition: all 0.5s ease-in;
`;

const Content = styled.div`
  position: absolute;
  flex-direction: column;
  align-items: center;
  flex: 1;
  width: 100%;
  background-color: ${({ theme }) => theme.bg.content};
  border-radius: ${({ background }) => (background ? '38px' : '0px')};
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  margin-top: 20px;
  overflow: hidden;
  transition: all 0.5s ease 0s;
  height: ${({ height }) =>
    `calc(${height} - env(safe-area-inset-top) - env(safe-area-inset-bottom))` ||
    '50%'};
  bottom: ${({ navigation }) => (navigation ? `65px` : '0px')};
  @media (min-width: 500px) and (max-height: 600px) {
    height: calc(100vh - 150px);
  }
  ${({ background }) =>
    !background &&
    css`
      height: calc(100% - 65px - env(safe-area-inset-top));
    `};
`;

const Area = styled.div`
  height: 65px;
  background-color: ${({ theme }) => theme.bg.content};
  width: 100%;
  bottom: 0;
`;

const Hero = styled.div`
  display: ${({ background }) => (background ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: flex-end;
  background-color: ${({ theme }) => theme.bg.sky};
  overflow: hidden;
  position: relative;
  height: 300px;
  @media (max-width: 675px) {
    height: calc(190px + env(safe-area-inset-top));
  }
`;

const Toys = styled.div`
  display: flex;
  width: 100%;
`;

const Navigation = styled.nav`
  align-items: center;
  background-color: ${({ theme }) => theme.nav.bg};
  border-top: ${({ visible, theme }) =>
    visible ? `1px solid ${theme.nav.border}` : '0px'};
  bottom: 0px;
  height: ${({ visible }) =>
    visible ? 'calc(65px + env(safe-area-inset-bottom))' : '0px'};
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
  color: ${({ active, theme }) =>
    active ? theme.text.primary : theme.nav.text};
  @media (hover: hover) and (pointer: fine) {
    :hover {
      color: ${({ theme }) => theme.text.primary};
    }
  }
  ${Item} {
    color: ${({ active, theme }) =>
      active ? theme.colors.purple : theme.nav.icon};
  }
  @media (hover: hover) and (pointer: fine) {
    :hover ${Item} {
      color: ${({ theme }) => theme.colors.purple};
    }
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

const WrapModal = styled.div`
  visibility: ${({ modal }) => (modal ? 'visible' : 'hidden')};
  flex-direction: column;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: fixed;
  z-index: 998;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  transition: all 0.25s ease 0s;
  background-color: ${({ modal }) =>
    modal ? ' rgba(0, 0, 0, 0.4)' : ' rgba(0, 0, 0, 0);'};
`;

const Modal = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 999;
  width: 100%;
  background-color: ${({ theme }) => theme.bg.content};
  border-radius: 18px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  overflow: hidden;
  transition: height 0.5s cubic-bezier(0, 0, 0.1, 1) 0s, visibility 0s ease 0s;
  height: ${({ modal }) => (modal ? '80%' : '0')};
`;

const TooltipContainer = styled.div`
  display: ${({ active }) => (active ? 'inline-block' : 'none')};
  z-index: 999;
`;

const WrapTooltip = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
`;

const Plus = styled(IconAdd)`
  width: 45px;
  height: 45px;
  fill: ${({ theme }) => theme.colors.white};
  transition: all 0.25s ease 0s;
  z-index: 3;
`;

const PlusFill = styled.div`
  width: 35px;
  height: 35px;
  background-color: #222;
  position: absolute;
  transition: all 0.25s ease 0s;
  border-radius: 36px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1),
    0px 2px 10px 0px rgba(0, 0, 0, 0.18);
  z-index: 2;
`;

const PlusEmpty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 37px;
  height: 37px;
  background-color: ${({ theme }) => theme.colors.white};
  position: absolute;
  transition: all 0.25s ease 0s;
  border-radius: 40px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1),
    0px 2px 10px 0px rgba(0, 0, 0, 0.18);
  z-index: 2;
`;

const WrapPlus = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 3;
  top: 0;
  right: 0;
  width: 45px;
  height: 45px;
  border-radius: 45px;
  cursor: pointer;
  margin-top: 15px;
  margin-right: 15px;
  transition: all 0.25s ease 0s;
  @media (hover: hover) and (pointer: fine) {
    :hover ${PlusFill} {
      background: ${({ theme }) => theme.colors.white};
    }
    :hover ${Plus} {
      fill: ${({ theme }) => theme.colors.purple};
    }
  }
`;

const Panel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.bg.content};
  bottom: 0px;
  width: 100%;
  height: ${({ panel }) => (panel ? '100%' : '0px')};
  transition: height 0.5s cubic-bezier(0, 0, 0.1, 1) 0s, visibility 0s ease 0s;
  user-select: none;
  position: fixed;
  z-index: ${({ panel }) => (panel ? 101 : 100)};
`;

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`;

const Loader = styled.svg`
  animation: ${rotate} 2s linear infinite;
  width: 20px;
  height: 20px;
  margin-bottom: 2px;
`;

const Circle = styled.circle`
  stroke: #222222;
  stroke-linecap: round;
  animation: ${dash} 1.5s ease-in-out infinite;
  fill: none;
  stroke-width: 8px;
`;

const Notification = styled.div`
  display: ${({ notification }) => (notification ? 'block' : 'none')};
  background-color: rgb(255, 56, 92);
  position: absolute;
  z-index: 11;
  border-radius: 50%;
  height: 10px;
  min-width: 10px;
  right: 6px;
  top: 2px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.35, 1.1) 0s;
`;

const toys = [
  {
    type: 'zebra',
    position: { x: '80%', y: '8%', z: 4 },
  },
  {
    type: 'turtle',
    position: { x: '10%', y: '9%', z: 3 },
  },
  {
    type: 'flamingo',
    position: { x: '18%', y: '4%', z: 6 },
  },
  {
    type: 'unicorn',
    position: { x: '60%', y: '3%', z: 7 },
  },
];

const fetcher = (url) => fetch(url).then((res) => res.json());

const Layout = (props) => {
  const router = useRouter();
  const { navigation, setNavigation } = props;
  const { darkMode, setDarkMode } = props;
  const [venmo, setVenmo] = useState(false);
  const [hideVenmo, setHideVenmo] = useState(false);
  const [panel, setPanel] = useState(false);
  const [expense, setExpense] = useState();
  const [submitting, setSubmitting] = useState(false);
  const [height, setHeight] = useState('50%');
  const [background, setBackground] = useState(true);
  const { mutate } = useSWR('/api/user', fetcher);

  useEffect(() => {
    setNavigation(!props?.user ? false : routes[router.pathname]?.navigation);
    setHeight(routes[router.pathname]?.height);
    setBackground(
      !props?.user
        ? routes[router.pathname]?.landing
          ? true
          : false
        : routes[router.pathname]?.background
    );
    if (props?.user && router.query.callback) {
      Router.push('/dashboard');
    }
    // Non-auth user can only access homepage
    if (!props?.user && !routes[router.pathname]?.public) {
      Router.push('/');
    }
    // Auth-user redirected from homepage to dashboard
    else if (props?.user && router.pathname === '/') {
      Router.push('/dashboard');
    } else {
      if (
        props?.user?.id &&
        !hideVenmo &&
        (!props?.user?.venmo || props?.user?.venmo?.expiredAt)
      ) {
        if (!venmo) {
          setVenmo(true);
        }
      } else if (props?.user?.id && (props?.user?.venmo || hideVenmo)) {
        setVenmo(false);
      }
    }
  }, [props?.user?.id, props?.user?.venmo, hideVenmo, router.pathname]);

  const handleExpense = async () => {
    if (props?.user?.draft) {
      setSubmitting(true);
      const response = await fetch(`/api/expenses/${props?.user?.draft?.id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      setExpense(await response.json());
      setPanel(true);
      setSubmitting(false);
    } else {
      setSubmitting(true);
      const response = await fetch(`/api/expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      setExpense(await response.json());
      setPanel(true);
      setSubmitting(false);
    }
  };

  const isInStandaloneMode = () => {
    return 'standalone' in window.navigator && window.navigator.standalone;
  };

  useEffect(() => mutate(), []);

  // 404 layout
  if (!routes[router.pathname]) {
    return (
      <Container>
        <Hero background>
          <Wave />
        </Hero>
        {props.children}
      </Container>
    );
  }

  return (
    <Container>
      <WrapModal modal={venmo}>
        <Modal modal={venmo}>
          <Venmo
            close={() => {
              setHideVenmo(true);
              setVenmo(false);
            }}
          />
        </Modal>
      </WrapModal>
      <Panel panel={panel}>
        {panel && (
          <Expense
            expense={expense}
            setExpense={setExpense}
            {...props}
            close={(promise) => {
              setSubmitting(true);
              setPanel(false);
              if (promise) {
                promise?.then(() => mutate());
                setSubmitting(false);
              } else {
                mutate();
                setSubmitting(false);
              }
            }}
          />
        )}
      </Panel>
      <Hero background={background}>
        {!routes[router.pathname]?.public && (
          <WrapTooltip>
            <TooltipContainer active={!localStorage.getItem('tooltip')}>
              <Tooltip
                content={
                  <>
                    Create an expense, <br /> make a splash!
                  </>
                }
              />
            </TooltipContainer>
            <WrapPlus>
              <Notification notification={props?.user?.draft !== null} />
              {submitting ? (
                <PlusEmpty>
                  <Loader viewBox="0 0 50 50">
                    <Circle cx="25" cy="25" r="20"></Circle>
                  </Loader>
                </PlusEmpty>
              ) : (
                <>
                  <Plus
                    onClick={() => {
                      localStorage.setItem('tooltip', 'true');
                      handleExpense();
                    }}
                  />
                  <PlusFill />
                </>
              )}
            </WrapPlus>
          </WrapTooltip>
        )}
        {!routes[router.pathname]?.public && props?.user?.toy ? (
          <Toy type={props?.user?.toy} position={{ x: '18%', y: '5%', z: 7 }} />
        ) : !props?.user && router.pathname === '/' && isInStandaloneMode() ? (
          <Toys>
            {toys.map((toy, i) => (
              <Toy key={i} {...toy} />
            ))}
          </Toys>
        ) : !props?.user &&
          routes[router.pathname]?.landing && !router.query.callback &&
          !isInStandaloneMode() ? (
          <Toy
            type={'flamingo'}
            position={{ x: '10%', y: '4%', z: 6 }}
            maxWidth={'250px'}
            width={'25%'}
          />
        ) : (
          <></>
        )}
        <Wave />
      </Hero>
      {!(props?.user && router.pathname === '/') &&
        !(!props?.user && !routes[router.pathname]?.public) && (
          <>
            {(router.pathname === '/' || routes[router.pathname]?.landing) &&
            !props?.user ? (
              <>{props.children}</>
            ) : router.pathname !== '/' &&
              (props?.user || routes[router.pathname]?.public) &&
              !routes[router.pathname]?.landing ? (
              <WrapContent>
                <Content
                  background={background}
                  navigation={navigation}
                  height={height}
                >
                  {React.cloneElement(props.children, {
                    setVenmo,
                    darkMode,
                    setDarkMode,
                  })}
                </Content>
                <Area />
              </WrapContent>
            ) : (
              <></>
            )}
            <Navigation visible={props?.user && navigation}>
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

export default Layout;
