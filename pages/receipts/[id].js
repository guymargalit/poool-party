import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled, { keyframes } from 'styled-components';
import {
  IconCheckmark,
  IconLock,
  IconPartyFace,
  IconPicture,
  IconPopper,
  IconWarning,
} from '../../icons';
import CurrencyInput from 'react-currency-input-field';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import Head from 'next/head';
import Pusher from 'pusher-js';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.bg.content};
  bottom: 0px;
  width: 100%;
  height: 100%;
  padding-top: env(safe-area-inset-top);
  position: fixed;
  transition: height 0.5s cubic-bezier(0, 0, 0.1, 1) 0s, visibility 0s ease 0s;
  user-select: none;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-top: 10px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0px 35px;
  height: 75px;
  transition: all 0.5s ease 0s;
  border-bottom: 1px solid ${({ theme }) => theme.bg.border};
`;

const Title = styled.div`
  width: 100%;
  font-weight: 600;
  color: ${({ theme }) => theme.text.tertiary};
  font-size: 24px;
  margin: 10px 0;
  text-align: center;
`;

const Subtitle = styled.div`
  width: 100%;
  font-weight: 500;
  color: ${({ theme }) => theme.text.tertiary};
  font-size: 18px;
  margin-top: 10px;
`;

const Text = styled.div`
  width: 100%;
  text-align: center;
  font-weight: 500;
  color: ${({ theme }) => theme.text.secondary};
  font-size: 18px;
  margin-top: 5px;
  @media (max-width: 675px) {
    font-size: 16px;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 20px 10px;
  border-bottom: 1px solid ${({ theme }) => theme.bg.border};
`;

const List = styled.div`
  display: flex;
  width: 100%;
  margin: 10px 0 0;
  overflow-x: auto;
`;

const WrapAvatar = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  margin-right: 15px;
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 15px;
  color: ${({ theme }) => theme.text.tertiary};
  margin: 5px 0 0;
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 60px;
`;

const Checkmark = styled(IconCheckmark)`
  width: 26px;
  height: 26px;
  transform: ${({ visible }) => (visible ? 'scale(1)' : 'scale(0)')};
  fill: ${({ theme }) => theme.colors.success};
  position: absolute;
  right: -5px;
  transition: all 0.25s ease 0s;
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
`;

const Lock = styled(IconLock)`
  width: 25px;
  height: 25px;
  transition: all 0.25s ease 0s;
  fill: ${({ theme }) => theme.colors.purple};
`;

const WrapInput = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: 400;
  align-items: center;
  width: 100%;
  color: ${({ theme }) => theme.text.secondary};
  background-color: ${({ theme }) => theme.bg.border};
  padding: 13px 10px;
  margin: 10px 0 0;
  min-height: 1px;
  border-radius: 8px;
  overflow: hidden;
`;

const Amount = styled(CurrencyInput)`
  color: ${({ theme }) => theme.text.secondary};
  padding-left: 5px;
  background-color: transparent;
  font-size: 16px;
  font-weight: 400;
  min-height: 1px;
  width: 100%;
  border: 0;
  :focus {
    outline: none !important;
  }
`;

const WrapSelect = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text.tertiary};
  background-color: ${({ theme }) => theme.bg.border};
  border-radius: 8px;
  height: 40px;
  transition: all 0.25s ease 0s;
  font-weight: 500;
  font-size: 16px;
  margin: 10px 0 0;
  cursor: pointer;
  @media (hover: hover) and (pointer: fine) {
    :hover {
      background-color: ${({ theme }) => theme.bg.item};
    }
  }
`;

const Picture = styled(IconPicture)`
  width: 25px;
  height: 25px;
  margin-right: 8px;
`;

const WrapModal = styled.div`
  visibility: ${({ modal }) => (modal ? 'visible' : 'hidden')};
  flex-direction: column;
  justify-content: flex-end;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: ${({ modal }) =>
    modal ? ' rgba(0, 0, 0, 0.4)' : ' rgba(0, 0, 0, 0);'};
  transition: all 0.25s ease 0s;
`;

const WrapImage = styled.div`
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 0 auto;
  width: 80%;
  height: 100%;
  visibility: ${({ modal }) => (modal ? 'visible' : 'hidden')};
  transition: height 0.5s cubic-bezier(0, 0, 0.1, 1) 0s, visibility 0s ease 0s;
`;

const Popper = styled(IconPopper)`
  width: 20px;
  margin-left: 8px;
  margin-bottom: 2px;
  transition: all 0.25s ease 0s;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ disabled, theme }) =>
    disabled ? theme.colors.disabled : theme.colors.purple};
  padding: 0 10px;
  border-radius: 24px;
  font-weight: 600;
  text-align: center;
  font-size: 16px;
  text-transform: capitalize;
  height: 50px;
  width: 100%;
  user-select: none;
  cursor: pointer;
  transition: all 0.25s ease 0s;
  @media (hover: hover) and (pointer: fine) {
    :hover {
      background-color: ${({ disabled, theme }) =>
        !disabled && theme.button.hover};
    }
    &:hover ${Popper} {
      transform: rotate(-10deg);
    }
  }
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  :disabled {
    cursor: not-allowed;
    pointer-events: all !important;
  }
`;

const Warning = styled(IconWarning)`
  width: 16px;
  height: 16px;
  fill: ${({ theme }) => theme.colors.error};
  margin-right: 5px;
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
  margin-left: 6px;
  margin-bottom: 2px;
`;

const Circle = styled.circle`
  stroke: ${({ theme }) => theme.colors.white};
  stroke-linecap: round;
  animation: ${dash} 1.5s ease-in-out infinite;
  fill: none;
  stroke-width: 8px;
`;

const Error = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
  font-size: 14px;
  margin-top: 5px;
`;

const WrapFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.bg.content};
  bottom: 0px;
  width: 100%;
  padding-bottom: env(safe-area-inset-bottom);
  position: absolute;
  transition: all 0.5s cubic-bezier(0, 0, 0.1, 1) 0s, visibility 0s ease 0s;
  user-select: none;
  border-top: ${({ visible, theme }) =>
    visible ? `1px solid ${theme.nav.border}` : '0px'};
  height: ${({ visible }) =>
    visible ? 'calc(80px + env(safe-area-inset-bottom))' : '0px'};
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  flex: 1;
  max-width: 1040px;
  justify-content: center;
`;

const WrapPartyFace = styled.div`
  min-width: 35px;
  max-width: 55px;
  width: 10%;
`;

const Area = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  user-select: none;
`;

const SuccessCheckmark = styled(IconCheckmark)`
  fill: ${({ theme }) => theme.colors.success};
  width: 130px;
  height: 130px;
`;

const SuccessText = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 25px;
  color: ${({ theme }) => theme.text.secondary};
  margin-bottom: 100px;
`;

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const Receipt = () => {
  const router = useRouter();
  const { id } = router.query;
  const [receipt, setReceipt] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState();
  const [amount, setAmount] = useState('');
  const [viewImage, setViewImage] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const getReceipt = async () => {
      if (id) {
        const response = await fetch(`/api/receipts/${id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const result = await response?.json();
        setReceipt(result?.expense);
        setLoading(false);
      }
    };
    getReceipt();
  }, [id]);

  useEffect(() => {
    if (receipt?.id) {
      // Initialize Channels client
      const channels = new Pusher('abfb154d0b50e40e4d64', {
        cluster: 'mt1',
      });

      // Subscribe to the appropriate channel
      const channel = channels.subscribe(`expense-${receipt?.id}`);

      // Bind a callback function to an event within the subscribed channel
      channel.bind('update', (response) => {
        setReceipt(response);
      });
    }
  }, [receipt?.id]);

  const submitData = async () => {
    if (receipt?.id) {
      setSubmitting(true);
      const u = { ...user, amount: parseFloat(amount) };
      const index = receipt?.metadata?.locked?.findIndex(
        (u) => u?.venmo?.id === user?.venmo?.id
      );
      let updatedLocked = [
        ...(receipt?.metadata?.locked?.slice(0, index) || []),
        { ...u, locked: true },
        ...(receipt?.metadata?.locked?.slice(index + 1) || []),
      ];
      try {
        const body = {
          locked: updatedLocked,
          lockedUser: true,
        };
        const response = await fetch(`/api/expenses/${receipt?.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        if (!response?.ok) {
          setError(await response.text());
        } else {
          setSuccess("Cool, we're done!");
        }
        setSubmitting(false);
      } catch (err) {
        setSubmitting(false);
      }
    }
  };

  if (success) {
    return (
      <Container>
        <Confetti width={width} height={height} />
        <Area>
          <SuccessCheckmark />
          <SuccessText>All done!</SuccessText>
        </Area>
      </Container>
    );
  }

  return (
    <Container>
      <Head>
        <title>Receipt · Poool Party</title>
        <link rel="icon" href="/favicon.png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover"
        />
        <link href="/favicon.png" rel="apple-touch-icon" />
      </Head>
      {!loading &&
      !receipt &&
      (!receipt?.metadata?.users || !receipt?.metadata?.total) ? (
        <Content>
          <Area>
            <WrapPartyFace>
              <IconPartyFace />
            </WrapPartyFace>
            <Text>Looks like we're waiting on some info... </Text>
            <Text>Come back soon!</Text>
          </Area>
        </Content>
      ) : (
        <Content>
          <Section>
            {loading ? (
              <Title>
                <Skeleton width={220} />
              </Title>
            ) : (
              <Title>
                The total is
                {!receipt?.metadata?.total
                  ? "n't there yet..."
                  : ` ${formatter.format(receipt?.metadata?.total)}`}
              </Title>
            )}
          </Section>
          {receipt?.metadata?.image && (
            <Section>
              <WrapSelect onClick={() => setViewImage(true)}>
                <Picture />
                View Receipt
              </WrapSelect>
            </Section>
          )}
          {receipt?.metadata?.users && (
            <Section>
              <Subtitle>Who are you?</Subtitle>
              <List>
                {loading
                  ? Array(3)
                      .fill(0)
                      .map((u, i) => (
                        <WrapAvatar key={i}>
                          <Skeleton circle={true} height={60} width={60} />
                          <Name>
                            <Skeleton width={40} />
                          </Name>
                        </WrapAvatar>
                      ))
                  : receipt?.metadata?.users?.map((usr, i) => (
                      <WrapAvatar
                        key={i}
                        onClick={() => {
                          setUser(usr);
                          setAmount(usr?.amount);
                        }}
                      >
                        <Checkmark visible={usr?.id === user?.id} />

                        <Avatar src={usr?.venmo?.image} />
                        <Name>{usr?.venmo?.displayName?.split(' ')[0]}</Name>
                      </WrapAvatar>
                    ))}
              </List>
            </Section>
          )}{' '}
          {receipt?.metadata?.total && user ? (
            <Section>
              <Subtitle>How much are you paying?</Subtitle>
              <WrapInput>
                <Amount
                  intlConfig={{ locale: 'en-US', currency: 'USD' }}
                  prefix="$"
                  placeholder="$0"
                  allowNegativeValue={false}
                  decimalsLimit={2}
                  value={amount}
                  onValueChange={(v) => setAmount(v)}
                />
              </WrapInput>
            </Section>
          ) : (
            user && (
              <Section>
                <Subtitle>Waiting for the total...</Subtitle>
              </Section>
            )
          )}
          <WrapModal onClick={() => setViewImage(false)} modal={viewImage}>
            <WrapImage modal={viewImage}>
              {receipt?.metadata?.image && (
                <Image
                  alt="receipt"
                  src={receipt?.metadata?.image}
                  layout="fill"
                  objectFit="contain"
                />
              )}
            </WrapImage>
          </WrapModal>
          <WrapFooter visible={amount && user && receipt?.metadata?.total}>
            {amount && user && receipt?.metadata?.total && (
              <Footer>
                <Button
                  disabled={!amount || !user || !receipt?.metadata?.total}
                  onClick={() =>
                    !amount || !user || !receipt?.metadata?.total || submitting
                      ? null
                      : submitData()
                  }
                >
                  {submitting || loading ? (
                    <Loader viewBox="0 0 50 50">
                      <Circle cx="25" cy="25" r="20"></Circle>
                    </Loader>
                  ) : (
                    <>
                      Done <Popper />
                    </>
                  )}
                </Button>
                {error ? (
                  <Error>
                    <Warning />
                    {error}
                  </Error>
                ) : (
                  <></>
                )}
              </Footer>
            )}
          </WrapFooter>
        </Content>
      )}
    </Container>
  );
};

export default Receipt;
