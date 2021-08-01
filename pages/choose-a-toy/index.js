import React, { Fragment, useState, useEffect, useRef } from 'react';
import Router from 'next/router';
import styled, { keyframes } from 'styled-components';
import useSWR from 'swr';

const Content = styled.div`
  width: 100%;
  height: calc(100% - 70px);
  overflow-y: auto;
  padding: 0 35px;
  @media (max-width: 675px) {
    padding: 0 10px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0px 35px;
  height: 75px;
  border-bottom: 1px solid #eeeeee;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  color: #222;
  text-align: center;
  font-size: 24px;
  height: 50px;
  @media (max-width: 675px) {
    font-size: 20px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 5px 10px;
  border-radius: 10px;
  width: 100%;
  margin: 10px 0px;

  overflow-y: auto;
`;

const Radio = styled.label`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 5px 0;
  height: 50px;
  border-radius: 6px;
  width: 100%;
  padding-left: 10px;
  cursor: pointer;
  transition: all 0.25s ease 0s;
  background-color: ${(props) =>
    props.checked ? `${props.theme.palette.dark.abisko}` : 'transparent'};
  color: ${(props) => (props.checked ? '#fff' : '#222')};
  :hover {
    background-color: ${(props) => props.theme.palette.dark.abisko};
    color: #fff;
  }
`;

const WrapInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-right: 20px;
  height: 50px;
`;

const Label = styled.div`
  font-weight: 600;
  text-align: center;
  font-size: 16px;
  text-transform: capitalize;
`;

const Input = styled.input`
  display: none;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 10px;
`;

const Popper = styled.svg`
  width: 20px;
  margin-left: 10px;
  margin-bottom: 3px;
  transition: all 0.25s ease 0s;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.primary};
  padding: 0 10px;
  margin: 15px 0;
  border-radius: 10px;
  font-weight: 600;
  text-align: center;
  font-size: 16px;
  text-transform: capitalize;
  height: 50px;
  width: 100%;
  user-select: none;
  cursor: pointer;
  transition: all 0.25s ease 0s;
  :hover {
    background-color: ${(props) => props.theme.palette.dark.skyGray};
  }
  &:hover ${Popper} {
    transform: rotate(-10deg);
  }
  @media (max-width: 675px) {
    margin-top: 10px;
  }
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

const Spinner = styled.svg`
  animation: ${rotate} 2s linear infinite;
  width: 25px;
  height: 25px;
  margin-left: 10px;
`;

const Circle = styled.circle`
  stroke: #fff;
  stroke-linecap: round;
  animation: ${dash} 1.5s ease-in-out infinite;
  fill: none;
  stroke-width: 8px;
`;

const Confirm = styled.svg`
  display: block;
  fill: #333;
  transition: all 0.25s ease 0s;
  width: 32px;
  height: 32px;
  cursor: pointer;
  :hover {
    fill: ${(props) => props.theme.palette.dark.monteverde};
  }
`;

const Profile = ({ user }) => {
  const { mutate } = useSWR('/api/user');
  const [submitting, setSubmitting] = useState(false);
  const [selected, setSelected] = useState(user?.toy);
  useEffect(() => user?.toy && setSelected(user?.toy), [user?.toy]);

  const scrollItem = useRef(null);
  const executeScroll = () =>
    scrollItem?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  useEffect(() => executeScroll, []);

  const handleOptionChange = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSelected(e.target.value);
    try {
      const body = { toy: e.target.value };
      const updatedUser = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await mutate(updatedUser);
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  const options = ['flamingo', 'unicorn', 'zebra', 'tiger'];

  return (
    <Fragment>
      <Header>
        <Title>Let's choose a pool floaty</Title>
        <Confirm onClick={() => Router.push(`/profile`)} viewBox="0 0 24 24">
          <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm5.237-12.324a1 1 0 0 0-1.474-1.352l-4.794 5.23-2.262-2.261a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.444-.031l5.5-6z"></path>
        </Confirm>
      </Header>
      <Content>
        <Form>
          {options.map((option) => (
            <Radio
              ref={selected === option ? scrollItem : null}
              checked={selected === option}
              key={option}
            >
              <WrapInput>
                <Label>{option}</Label>
                <Input
                  type="radio"
                  value={option}
                  checked={selected === option}
                  onChange={(e) => {
                    handleOptionChange(e);
                  }}
                />
                {submitting && selected === option && (
                  <Spinner viewBox="0 0 50 50">
                    <Circle cx="25" cy="25" r="20"></Circle>
                  </Spinner>
                )}
              </WrapInput>
            </Radio>
          ))}
        </Form>
      </Content>
    </Fragment>
  );
};

export default Profile;