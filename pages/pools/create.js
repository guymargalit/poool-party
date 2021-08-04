import React, { Fragment, useState, useEffect, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import Router from 'next/router';
import {
  IconEmpty,
  IconLeftChevron,
  IconPopper,
  IconSearch,
  IconWarning,
} from '../../icons';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: rgb(255, 255, 255);
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
  height: calc(100% - 150px - env(safe-area-inset-bottom));
  overflow-y: auto;
  padding: 30px 35px 0;
  @media (max-width: 675px) {
    padding: 10px 20px 0;
  }
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

const Subtitle = styled.div`
  width: 100%;
  font-weight: 500;
  color: #444;
  font-size: 16px;
  margin-top: 10px;
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
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.palette.dark.abisko};
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
      background-color: ${(props) => props.theme.palette.dark.skyGray};
    }
    &:hover ${Popper} {
      transform: rotate(-10deg);
    }
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

const Label = styled.label`
  font-weight: 500;
  font-size: 15px;
  width: 100%;
  margin: 10px 0px;
  color: #333;
`;

const WrapInput = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: 400;
  align-items: center;
  width: 100%;
  background-color: #eeeeee;
  padding: 13px 10px;
  margin: 10px 0;
  min-height: 1px;
  border-radius: 8px;
`;

const Search = styled(IconSearch)`
  width: 16px;
  height: 16px;
  fill: #666;
`;

const Input = styled.input`
  width: 100%;
  outline: none;
  border: none;
  color: inherit;
  background-color: transparent;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
  appearance: none;
  margin-left: 5px;
`;

const Warning = styled(IconWarning)`
  width: 16px;
  height: 16px;
  fill: ${({ theme }) => theme.colors.error};
  margin-right: 5px;
`;

const Chevron = styled(IconLeftChevron)`
  width: 24px;
  cursor: pointer;
  fill: #222;
  transition: all 0.25s ease 0s;
  @media (hover: hover) and (pointer: fine) {
    :hover {
      fill: ${(props) => props.theme.palette.dark.abisko};
    }
  }
`;

const Empty = styled(IconEmpty)`
  width: 28px;
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
  stroke: #fff;
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
  color: ${({ theme }) => theme.palette.dark.monteverde};
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

const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: solid #ddd 1px;
  height: 50px;
  padding: 0 15px;
  cursor: pointer;
  transition: all 0.25s ease 0s;
  background-color: #eeeeee;
  color: ${(props) => (props.checked ? '#fff' : '#222')};
  @media (hover: hover) and (pointer: fine) {
    :hover {
      background-color: ${(props) => props.theme.palette.dark.abisko};
      color: #fff;
    }
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  margin-left: 10px;
`;

const Image = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 35px;
`;

const FullName = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 15px;
  color: #333;
`;

const Username = styled.div`
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 12px;
  color: #666;
`;

const WrapList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
`;

const List = styled.div`
  max-height: 150px;
  width: 100%;
  overflow-y: auto;
`;

const PartyList = styled.div`
  display: flex;
  width: 100%;
  margin: 10px 0 0;
  overflow-x: auto;
`;

const WrapAvatar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 15px;
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 12px;
  color: #555;
  margin: 5px 0 0;
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 60px;
`;

const WrapFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(255, 255, 255);
  border-top: 1px solid rgb(221, 221, 221);
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

const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      timer = null;
      fn(...args);
    }, delay);
  };
};

const PoolCreate = () => {
  const [name, setName] = useState('');
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);
  const [users, setUsers] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const changeHandler = (e) => {
    queryUsers(e);
  };

  const debouncedChangeHandler = useMemo(
    () => debounce(changeHandler, 300),
    []
  );

  const submitData = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const body = { name, users };
      const response = await fetch('/api/pools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!response?.ok) {
        setError(await response.text());
      } else {
        Router.push('/pools')
      }
      setSubmitting(false);
    } catch (err) {
      setSubmitting(false);
    }
  };

  const queryUsers = async (query) => {
    const body = {
      query: query,
    };
    const result = await fetch('/api/venmo/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const response = await result?.json();
    setResult(response?.data || []);
  };

  const addUser = (user) => {
    if (user.id) {
      setUsers([...users, user]);
      setQuery('');
      setResult([]);
    }
  };

  return (
    <Container>
      <Header>
        <Chevron onClick={() => Router.push('/pools')} />
        <Title>New Pool</Title>
        <Empty />
      </Header>
      <Content>
        <Label>
          Pool Name
          <WrapInput>
            <Input
              autoFocus
              onChange={(e) => setName(e.target.value)}
              placeholder="What should we call it?"
              type="text"
              value={name}
            />
          </WrapInput>
        </Label>
        <Label>
          Add partiers to your pool
          <WrapInput>
            <Search />
            <Input
              onChange={(e) => {
                debouncedChangeHandler(e.target.value);
                setQuery(e.target.value);
              }}
              placeholder="Find them on venmo"
              type="text"
              value={query}
            />
          </WrapInput>
        </Label>
        <WrapList>
          <List>
            {result?.map((u) => (
              <Item onClick={() => addUser(u)} key={u?.id}>
                <Image alt="profile_picture" src={u?.profile_picture_url} />
                <Info>
                  <FullName>{u?.display_name}</FullName>
                  <Username>@{u?.username}</Username>
                </Info>
              </Item>
            ))}
          </List>
        </WrapList>
        {users?.length > 0 && <Subtitle>Your Party</Subtitle>}
        <PartyList>
          {users.map((u) => (
            <WrapAvatar key={u?.id}>
              <Avatar src={u?.profile_picture_url} />
              <Name>{u?.first_name}</Name>
            </WrapAvatar>
          ))}
        </PartyList>
      </Content>
      <WrapFooter>
        <Footer>
          <Button onClick={submitData}>
            {submitting ? (
              <Loader viewBox="0 0 50 50">
                <Circle cx="25" cy="25" r="20"></Circle>
              </Loader>
            ) : (
              <>
                Create Pool <Popper />
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
    </Container>
  );
};

export default PoolCreate;
