import React, { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled, { keyframes } from 'styled-components';
import {
  IconCheckmark,
  IconLock,
  IconPicture,
  IconPopper,
  IconWarning,
} from '../../icons';
import CurrencyInput from 'react-currency-input-field';
import Image from 'next/image';

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
  font-size: 18px;
  margin-top: 10px;
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
  width: 80px;
  height: 80px;
  border-radius: 80px;
`;

const Checkmark = styled(IconCheckmark)`
  width: 32px;
  height: 32px;
  transform: ${({ visible }) => (visible ? 'scale(1)' : 'scale(0)')};
  fill: ${({ theme }) => theme.colors.success};
  position: absolute;
  right: -5px;
  transition: all 0.25s ease 0s;
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
`;

const Lock = styled(IconLock)`
  width: 32px;
  height: 32px;
  position: absolute;
  right: -5px;
  transition: all 0.25s ease 0s;
  fill: ${({ theme }) => theme.colors.purple};
  background-color: ${({ theme }) => theme.colors.disabled};
  border-radius: 32px;
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
  margin-left: 6px;
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

const Success = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.success};
  text-align: center;
  font-size: 14px;
  margin-top: 5px;
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
  border-top: 1px solid ${({ theme }) => theme.bg.border};
  bottom: 0px;
  width: 100%;
  height: calc(80px + env(safe-area-inset-bottom));
  padding-bottom: env(safe-area-inset-bottom);
  position: absolute;
  transition: all 0.5s cubic-bezier(0, 0, 0.1, 1) 0s, visibility 0s ease 0s;
  user-select: none;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  flex: 1;
  max-width: 1040px;
  justify-content: center;
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
  const [user, setUser] = useState(true);
  const [amount, setAmount] = useState('');
  const [viewImage, setViewImage] = useState(false);
  useEffect(() => {
    const getReceipt = async () => {
      const response = await fetch(`/api/receipts/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      setReceipt(await response.json());
    };
    getReceipt();
  }, [id]);

  const submitData = async () => {
    setError("Feature isn't ready yet lol")
    // if (expense?.id) {
    //   setSubmitting(true);
    //   try {
    //     const body = {
    //       poolId: pool?.id,
    //       name,
    //       ...(frequency !== 'One Time' && {
    //         interval: Object.keys(intervalOptions).find(
    //           (key) => intervalOptions[key] === frequency
    //         ),
    //       }),
    //       image: image,
    //       ...(frequency !== 'One Time' && {
    //         date: date,
    //       }),
    //       users: users.map((u) => ({
    //         id: u?.id,
    //         venmoId: u?.venmo?.id,
    //         amount: u?.amount,
    //       })),
    //       total,
    //     };
    //     const response = await fetch(`/api/expenses/${expense?.id}`, {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify(body),
    //     });
    //     if (!response?.ok) {
    //       setError(await response.text());
    //     } else {
    //       close();
    //     }
    //     setSubmitting(false);
    //   } catch (err) {
    //     setSubmitting(false);
    //   }
    // }
  };
  return (
    <Container>
      <Content>
        <Section>
          <Subtitle>Who are you?</Subtitle>
          <List>
            {receipt?.expense?.metadata?.users?.map((usr, i) => (
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
        <Section>
          <Title>
            The total is {formatter.format(receipt?.expense?.metadata?.total)}
          </Title>
        </Section>
        <Section>
          {receipt?.expense?.metadata?.image && (
            <WrapSelect onClick={() => setViewImage(true)}>
              <Picture />
              View Receipt
            </WrapSelect>
          )}
        </Section>
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
        <WrapModal onClick={() => setViewImage(false)} modal={viewImage}>
          <WrapImage modal={viewImage}>
            {receipt?.expense?.metadata?.image && (
              <Image
                alt="receipt"
                src={receipt?.expense?.metadata?.image}
                layout="fill"
                objectFit="contain"
              />
            )}
          </WrapImage>
        </WrapModal>
        <WrapFooter>
          <Footer>
            <Button
              disabled={!amount || !user || !receipt?.expense?.metadata?.total}
              onClick={() =>
                !amount ||
                !user ||
                !receipt?.expense?.metadata?.total ||
                submitting
                  ? null
                  : submitData()
              }
            >
              {submitting ? (
                <Loader viewBox="0 0 50 50">
                  <Circle cx="25" cy="25" r="20"></Circle>
                </Loader>
              ) : (
                <>
                  Let's do it <Popper />
                </>
              )}
            </Button>
            {success ? (
              <Success>{success}</Success>
            ) : error ? (
              <Error>
                <Warning />
                {error}
              </Error>
            ) : (
              <></>
            )}
          </Footer>
        </WrapFooter>
      </Content>
    </Container>
  );
};

export default Receipt;
