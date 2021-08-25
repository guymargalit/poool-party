import React, { useState, useEffect, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  IconClose,
  IconEmpty,
  IconCheckmark,
  IconPopper,
  IconWarning,
  IconVenmo,
  IconLock,
  IconUnlock,
  IconShare,
  IconCamera,
  IconPicture,
  IconSearch,
  IconRemove,
} from '../icons';
import CurrencyInput from 'react-currency-input-field';
import currency from 'currency.js';
import RadioForm from './RadioForm';
import { useS3Upload } from 'next-s3-upload';
import imageCompression from 'browser-image-compression';
import { debounce } from '../lib/utils';
import Image from 'next/image';
import Pusher from 'pusher-js';

const FileType = require('file-type/browser');

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.bg.content};
`;

const WrapContent = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.bg.content};
`;

const Content = styled.div`
  width: 100%;
  height: calc(100% - 125px);
  overflow-y: auto;
`;

const Subtitle = styled.div`
  width: 100%;
  font-weight: 500;
  color: ${({ theme }) => theme.text.tertiary};
  font-size: 16px;
  margin-top: 10px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0px 18px;
  height: 45px;
  transition: all 0.5s ease 0s;
`;

const WrapCamera = styled.label``;

const Camera = styled(IconCamera)`
  width: 25px;
  height: 25px;
  cursor: pointer;
  fill: ${({ theme }) => theme.text.primary};
  transition: all 0.25s ease 0s;
  @media (hover: hover) and (pointer: fine) {
    :hover {
      fill: ${({ theme }) => theme.colors.purple};
    }
  }
`;

const Picture = styled(IconPicture)`
  width: 25px;
  height: 25px;
  margin-right: 8px;
`;

const CameraInput = styled.input`
  display: none;
`;

const Share = styled(IconShare)`
  margin-top: 15px;
  width: 25px;
  height: 25px;
  cursor: pointer;
  fill: ${({ theme }) => theme.text.primary};
  transition: all 0.25s ease 0s;
  @media (hover: hover) and (pointer: fine) {
    :hover {
      fill: ${({ theme }) => theme.colors.purple};
    }
  }
`;

const Close = styled(IconClose)`
  margin-top: 15px;
  width: 25px;
  height: 25px;
  cursor: pointer;
  fill: ${({ theme }) => theme.text.primary};
  transition: all 0.25s ease 0s;
  @media (hover: hover) and (pointer: fine) {
    :hover {
      fill: ${({ theme }) => theme.colors.purple};
    }
  }
`;

const Checkmark = styled(IconCheckmark)`
  width: 24px;
  height: 24px;
  transform: ${({ visible }) => (visible ? 'scale(1)' : 'scale(0)')};
  fill: ${({ theme }) => theme.colors.success};
  position: absolute;
  right: -5px;
  transition: all 0.25s ease 0s;
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
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
  font-size: 12px;
  color: ${({ theme }) => theme.text.tertiary};
  margin: 5px 0 0;
`;

const Avatar = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 45px;
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
  margin-top: 15px;
  margin-bottom: calc(15px + env(safe-area-inset-bottom));
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
  background-color: ${({ theme }) => theme.nav.bg};
  border-top: 1px solid ${({ theme }) => theme.nav.border};
  bottom: 0px;
  width: 100%;
  position: sticky;
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

const Label = styled.div`
  display: flex;
  margin-left: 5px;
  font-weight: 500;
  font-size: 15px;
  color: ${({ theme }) => theme.text.secondary};
  flex: 6;
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
  transition: all 0.25s ease 0s;
  border: ${({ error, theme }) =>
    error ? `2px solid ${theme.colors.error}` : '2px solid transparent'};
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

const WrapSplit = styled.div`
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  margin: 10px 0 0;
`;

const Split = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: ${({ theme }) => theme.bg.item};
  padding: 8px;
`;

const WrapAmount = styled.div`
  background-color: ${({ theme }) => theme.bg.border};
  border-radius: 8px;
  min-width: 75px;
  flex: 1;
  padding: 0px;
  overflow: hidden;
  transition: all 0.25s ease 0s;
  border: ${({ error, theme }) =>
    error ? `2px solid ${theme.colors.error}` : '2px solid transparent'};
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

const Venmo = styled(IconVenmo)`
  width: 20px;
  margin-right: 5px;
`;

const Lock = styled(IconLock)`
  width: 20px;
  margin-left: 5px;
  fill: ${({ theme }) => theme.colors.purple};
  cursor: pointer;
`;

const Unlock = styled(IconUnlock)`
  width: 20px;
  margin-left: 5px;
  fill: ${({ theme }) => theme.text.secondary};
  cursor: pointer;
  @media (hover: hover) and (pointer: fine) {
    :hover {
      fill: ${({ theme }) => theme.colors.purple};
    }
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

const WrapDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text.tertiary};
  background-color: ${({ theme }) => theme.bg.border};
  border-radius: 8px;
  height: 40px;
  padding: 0 10px;
  transition: all 0.25s ease 0s;
  font-weight: 500;
  font-size: 16px;
  margin: 10px 0;
  cursor: pointer;
  @media (hover: hover) and (pointer: fine) {
    :hover {
      background-color: ${({ theme }) => theme.bg.item};
    }
  }
  text-align: center;
`;

const DateInput = styled.input`
  width: 100%;
  cursor: pointer;
  font-weight: 500;
  color: ${({ theme }) => theme.text.tertiary};
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  background-color: transparent;
  border: 0;
  outline: none;
  text-align: center;
  display: block;

  ::-webkit-datetime-edit {
    text-align: center;
  }
  ::-webkit-datetime-edit-fields-wrapper {
    background-color: transparent;
  }
  ::-webkit-datetime-edit-text {
    padding: 0 0.01em;
  }

  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
  }
  ::-webkit-calendar-picker-indicator {
    width: 100%;
    cursor: pointer;
    background: transparent;
    position: absolute;
  }
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

const Modal = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 999;
  width: 100%;
  background-color: ${({ theme }) => theme.bg.content};
  bottom: 0px;
  border-radius: 18px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  padding-top: 10px;
  transition: height 0.5s cubic-bezier(0, 0, 0.1, 1) 0s, visibility 0s ease 0s;
  height: ${({ modal }) => (modal ? '210px' : '0px')};
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

const WrapDraft = styled.div`
  visibility: ${({ modal }) => (modal ? 'visible' : 'hidden')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const Draft = styled.div`
  position: fixed;
  display: ${({ modal }) => (modal ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  z-index: 999;
  padding: 0 30px;
  background-color: ${({ theme }) => theme.bg.content};
  border-radius: 18px;
  padding-top: 10px;
  height: 100px;
  transition: all 0.1s ease 0s;
`;

const DraftTitle = styled.div`
  width: 100%;
  font-weight: 500;
  color: ${({ theme }) => theme.text.tertiary};
  text-align: center;
  font-size: 16px;
  margin: 10px 0 20px;
`;

const WrapButtons = styled.div`
  display: flex;
`;

const SaveButton = styled.div`
  display: flex;
  text-align: center;
  width: 75px;
  height: 30px;
  padding-bottom: 2px;
  margin-left: 8px;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1),
    0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  color: ${({ theme }) => theme.colors.white};
  border-radius: 1.5rem;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  background-color: ${({ theme }) => theme.colors.purple};
  transition: all 0.25s ease 0s;
  @media (hover: hover) and (pointer: fine) {
    :hover {
      background-color: #042759;
    }
  }
`;

const DiscardButton = styled.div`
  display: flex;
  text-align: center;
  width: 80px;
  height: 30px;
  padding-bottom: 2px;
  margin-right: 8px;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1),
    0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  color: ${({ theme }) => theme.colors.white};
  border-radius: 1.5rem;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  background-color: ${({ theme }) => theme.colors.error};
  transition: all 0.25s ease 0s;
  @media (hover: hover) and (pointer: fine) {
    :hover {
      background-color: #d1435b;
    }
  }
`;

const Tab = styled.div`
  background-color: #e2e2e2;
  width: 60px;
  height: 4px;
  border-radius: 8px;
  min-height: 4px;
`;

const Search = styled(IconSearch)`
  width: 16px;
  height: 16px;
  fill: ${({ theme }) => theme.text.quarternary};
`;

const WrapList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
`;

const SearchList = styled.div`
  max-height: 150px;
  width: 100%;
  overflow-y: auto;
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: solid 1px ${({ theme }) => theme.bg.border};
  height: 50px;
  padding: 0 15px;
  cursor: pointer;
  transition: all 0.25s ease 0s;
  background-color: ${({ theme }) => theme.bg.border};
  color: ${({ theme, checked }) =>
    checked ? theme.colors.white : theme.text.primary};
  @media (hover: hover) and (pointer: fine) {
    :hover {
      background-color: ${({ theme }) => theme.colors.purple};
      color: ${({ theme }) => theme.colors.white};
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

const FullName = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 15px;
  color: ${({ theme }) => theme.text.secondary};
`;

const Username = styled.div`
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 12px;
  color: ${({ theme }) => theme.text.quarternary};
`;

const Remove = styled(IconRemove)`
  width: 20px;
  height: 20px;
  fill: ${({ theme }) => theme.colors.error};
  position: absolute;
  right: -5px;
  transition: all 0.25s ease 0s;
  cursor: pointer;
`;

const intervalOptions = {
  month: 'Monthly',
  week: 'Weekly',
  [null]: 'One Time',
};

const Expense = ({ pool, expense, setExpense, close }) => {
  const [name, setName] = useState(expense?.metadata?.name || '');
  const [frequency, setFrequency] = useState(
    expense?.metadata?.interval
      ? intervalOptions[expense?.metadata?.interval]
      : intervalOptions[null]
  );
  const [date, setDate] = useState(
    expense?.metadata?.startDate
      ? new Date(expense?.metadata?.startDate).toISOString().substr(0, 10)
      : new Date().toISOString().substr(0, 10)
  );
  const [users, setUsers] = useState(
    expense?.metadata?.users
      ? [...expense?.metadata?.users]
      : pool
      ? [...pool?.users]
      : []
  );
  const [total, setTotal] = useState(expense?.metadata?.total || '');
  const [user, updatingUser] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);
  const [draft, setDraft] = useState(false);
  const [error, setError] = useState('');
  const [modal, setModal] = useState(false);
  const [viewImage, setViewImage] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(expense?.metadata?.image || '');
  const { uploadToS3 } = useS3Upload();

  useEffect(() => {
    if (!expense?.metadata?.users) {
      changeUsers({
        users: pool?.users,
      });
    } else if (expense?.metadata?.locked) {
      updateLockedAmount(expense?.metadata?.locked);
    }
  }, [expense?.id]);

  const handleSave = async (body) => {
    if (expense?.id) {
      const response = await fetch(`/api/expenses/${expense?.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await response.json();
    }
  };

  const deleteDraft = async () => {
    if (expense?.id) {
      close(
        fetch(`/api/expenses/${expense?.id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        })
      );
    }
  };

  const changeHandler = async (e) => {
    setSaving(true);
    await handleSave(e);
    setSaving(false);
  };

  const changeInterval = useMemo(() => debounce(changeHandler, 500), []);

  const changeUsers = useMemo(() => debounce(changeHandler, 500), []);

  const changeName = useMemo(() => debounce(changeHandler, 500), []);

  const changeDate = useMemo(() => debounce(changeHandler, 500), []);

  const changeLocked = useMemo(() => debounce(changeHandler, 500), []);

  const searchHandler = (e) => {
    queryUsers(e);
  };

  const debouncedChangeHandler = useMemo(
    () => debounce(searchHandler, 300),
    []
  );

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
      const list = [
        ...users,
        {
          id: user.id,
          venmo: {
            id: user.id,
            image: user.profile_picture_url,
            displayName: user.display_name,
            username: user.username,
          },
        },
      ];
      setUsers(list);
      changeUsers({
        users: list,
      });
      setQuery('');
      setResult([]);
    }
  };

  const removeUser = (user) => {
    if (user.id) {
      const index = users.findIndex((u) => u?.id === user?.id);
      const updatedUsers = [
        ...users.slice(0, index),
        ...users.slice(index + 1),
      ];
      setUsers(updatedUsers);
      setQuery('');
      setResult([]);
    }
  };

  const handleFileChange = async ({ target }) => {
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1020,
      useWebWorker: true,
    };
    const urls = [];
    const files = Array.from(target.files);
    setUploading(true);
    for (let index = 0; index < files.length; index++) {
      try {
        const file = files[index];
        const compressedFile = await imageCompression(file, options);
        const type = await FileType.fromBlob(compressedFile);
        compressedFile.name = `expense-${expense?.receipt?.id}.${type?.ext}`;
        const { url } = await uploadToS3(compressedFile);
        setUploading(false);
        setImage(url);
        handleSave({
          image: url,
        });
        urls.push(url);
      } catch (error) {
        setUploading(false);
      }
    }
  };

  const currentTotal = users?.reduce(
    (a, b) => a + (parseFloat(b['amount']) || 0),
    0
  );
  const lockedTotal = users?.reduce(
    (a, b) => a + (b['locked'] ? parseFloat(b['amount']) : 0),
    0
  );
  const unlockedUsers = users?.reduce((a, b) => a + (b['locked'] ? 0 : 1), 0);

  useEffect(() => {
    if (total !== '' && user) {
      const amounts =
        unlockedUsers > 1
          ? currency(
              total - (parseFloat(user?.amount) || 0) - lockedTotal
            )?.distribute(unlockedUsers - 1)
          : [];
      let i = 0;
      const updatedUsers = [
        ...users?.map((u) => ({
          ...u,
          amount: u?.locked
            ? parseFloat(u?.amount) || 0
            : unlockedUsers === 1
            ? parseFloat(total - lockedTotal)
            : u?.venmo?.id === user?.venmo?.id
            ? parseFloat(user?.amount) || 0
            : amounts?.length > 0
            ? parseFloat(amounts[i++]?.value)
            : 0,
        })),
      ];
      setUsers(updatedUsers);
      changeUsers({
        users: updatedUsers,
      });
      updatingUser(null);
    }
  }, [user]);

  const selectUser = (usr) => {
    const index = users.findIndex((u) => u?.venmo?.id === usr?.venmo?.id);
    if (index !== -1) {
      let updatedUsers = [...users.slice(0, index), ...users.slice(index + 1)];
      setUsers(updatedUsers);
      changeUsers({
        users: updatedUsers,
      });
    } else {
      let updatedUsers = [...users, usr];
      setUsers(updatedUsers);
      changeUsers({
        users: updatedUsers,
      });
    }
    updatingUser(usr);
  };

  const updateTotal = (t) => {
    if (!t) {
      t = 0;
    }
    setTotal(t);
    const amounts = currency(parseFloat(t) - lockedTotal)?.distribute(
      unlockedUsers
    );
    let i = 0;
    let updatedUsers = [
      ...users?.map((u) => ({
        ...u,
        amount: u?.locked
          ? parseFloat(u?.amount) || 0
          : amounts?.length > 0
          ? parseFloat(amounts[i++]?.value)
          : 0,
      })),
    ];
    setUsers(updatedUsers);
    changeUsers({
      total: parseFloat(t),
      users: updatedUsers,
    });
  };

  const updateAmount = (usr, amt) => {
    if (unlockedUsers > 1) {
      const index = users.findIndex((u) => u?.venmo?.id === usr?.venmo?.id);
      let updatedUsers = [
        ...users.slice(0, index),
        {
          ...users[index],
          amount: parseFloat(amt),
        },
        ...users.slice(index + 1),
      ];
      const amounts = currency(total - lockedTotal)?.distribute(unlockedUsers);
      let i = 0;
      updatedUsers = [
        ...updatedUsers?.map((u) => ({
          ...u,
          amount: u?.locked
            ? parseFloat(u?.amount) || 0
            : amounts?.length > 0
            ? parseFloat(amounts[i++]?.value)
            : 0,
        })),
      ];
      setUsers(updatedUsers);
      changeUsers({
        users: updatedUsers,
      });
      updatingUser({
        ...usr,
        amount: parseFloat(amt),
      });
    }
  };

  const updateLock = (usr) => {
    const index = users.findIndex((u) => u?.venmo?.id === usr?.venmo?.id);
    let updatedUsers = [
      ...users.slice(0, index),
      { ...users[index], locked: !users[index]?.locked },
      ...users.slice(index + 1),
    ];
    const lockedUsers = updatedUsers.filter((u) => u.locked === true);
    updateLockedAmount(updatedUsers);
    changeLocked({ locked: lockedUsers });
  };

  const updateLockedAmount = (lockedUsers) => {
    let updatedUsers = [];
    for (const usr of users) {
      const index = lockedUsers.findIndex(
        (u) => u?.venmo?.id === usr?.venmo?.id && u?.locked === true
      );
      if (index > -1) {
        updatedUsers.push(lockedUsers[index]);
      } else {
        updatedUsers.push({ ...usr, locked: false });
      }
    }
    const currentLockedTotal = updatedUsers?.reduce(
      (a, b) => a + (b['locked'] ? parseFloat(b['amount']) : 0),
      0
    );
    const currentUnlockedUsers = updatedUsers?.reduce(
      (a, b) => a + (b['locked'] ? 0 : 1),
      0
    );
    const amounts = currency(total - currentLockedTotal)?.distribute(
      currentUnlockedUsers
    );
    let i = 0;
    updatedUsers = [
      ...updatedUsers?.map((u) => ({
        ...u,
        amount: u?.locked
          ? parseFloat(u?.amount) || 0
          : amounts?.length > 0
          ? parseFloat(amounts[i++]?.value)
          : 0,
      })),
    ];
    setUsers(updatedUsers);
    changeUsers({
      users: updatedUsers,
    });
  };

  const submitData = async () => {
    if (expense?.id) {
      setSubmitting(true);
      try {
        const body = {
          poolId: pool?.id,
          name,
          ...(frequency !== 'One Time' && {
            interval: Object.keys(intervalOptions).find(
              (key) => intervalOptions[key] === frequency
            ),
          }),
          image: image,
          ...(frequency !== 'One Time' && {
            date: date,
          }),
          users: users.map((u) => ({
            id: u?.id,
            venmoId: u?.venmo?.id,
            amount: parseFloat(Math.abs(u?.amount)),
            venmo: {
              id: u?.venmo?.id,
              username: u?.venmo?.username,
              displayName: u?.venmo?.displayName,
              image: u?.venmo?.image,
            },
          })),
          total,
        };
        const response = await fetch(`/api/expenses/${expense?.id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        if (!response?.ok) {
          setError(await response.text());
        } else {
          close();
        }
        setSubmitting(false);
      } catch (err) {
        setSubmitting(false);
      }
    }
  };

  const handleFocus = (event) => event.target.select();

  useEffect(() => {
    if (expense?.id) {
      // Initialize Channels client
      const channels = new Pusher('abfb154d0b50e40e4d64', {
        cluster: 'mt1',
      });

      // Subscribe to the appropriate channel
      const channel = channels.subscribe(`expense-${expense?.id}`);

      // Bind a callback function to an event within the subscribed channel
      channel.bind('locked', async (response) => {
        updateLockedAmount(response?.metadata?.locked);
      });
    }
  }, [expense?.id]);

  return (
    <Container>
      <Header>
        <Close onClick={() => setDraft(true)} />
        {navigator?.share && (
          <Share
            onClick={async () => {
              if (navigator?.share) {
                await navigator.share({
                  url: `https://poool.party/receipts/${expense?.receipt?.id}`,
                });
              }
            }}
          />
        )}
      </Header>
      <WrapContent>
        <Content>
          <Section>
            <Subtitle>Who's Paying?</Subtitle>
            {!pool && (
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
            )}
            <WrapList>
              <SearchList>
                {result?.map((u) => (
                  <Item onClick={() => addUser(u)} key={u?.id}>
                    <Avatar
                      alt="profile_picture"
                      src={u?.profile_picture_url}
                    />
                    <Info>
                      <FullName>{u?.display_name}</FullName>
                      <Username>@{u?.username}</Username>
                    </Info>
                  </Item>
                ))}
              </SearchList>
            </WrapList>
            <List>
              {pool?.users
                ? pool?.users?.map((usr, i) => (
                    <WrapAvatar key={i} onClick={() => selectUser(usr)}>
                      <Checkmark
                        visible={users?.some(
                          (u) => usr?.venmo?.id === u?.venmo?.id
                        )}
                      />
                      <Avatar src={usr?.venmo?.image} />
                      <Name>{usr?.venmo?.displayName?.split(' ')[0]}</Name>
                    </WrapAvatar>
                  ))
                : users?.map((usr, i) => (
                    <WrapAvatar key={usr?.id}>
                      {!usr?.creator && (
                        <Remove onClick={() => removeUser(usr)} />
                      )}
                      <Avatar src={usr?.venmo?.image} />
                      <Name>{usr?.venmo?.displayName?.split(' ')[0]}</Name>
                    </WrapAvatar>
                  ))}
            </List>
          </Section>
          <Section>
            <Subtitle>How Much?</Subtitle>
            <WrapInput
              error={
                total < 0 ||
                currentTotal < 0 ||
                currentTotal > total ||
                currentTotal < total
              }
            >
              <Amount
                intlConfig={{ locale: 'en-US', currency: 'USD' }}
                prefix="$"
                placeholder="$0"
                allowNegativeValue={false}
                allowDecimals={true}
                decimalsLimit={2}
                value={total}
                onValueChange={(v) => updateTotal(v)}
                step={1}
                decimalScale={2}
              />
              <CameraInput
                accept="image/*"
                id="icon-button-file"
                type="file"
                capture="environment"
                onChange={handleFileChange}
                multiple
              />
              {uploading ? (
                <Loader viewBox="0 0 50 50">
                  <Circle cx="25" cy="25" r="20"></Circle>
                </Loader>
              ) : (
                <WrapCamera htmlFor="icon-button-file">
                  <Camera />
                </WrapCamera>
              )}
            </WrapInput>
            {image && (
              <WrapSelect onClick={() => setViewImage(true)}>
                <Picture />
                View Image
              </WrapSelect>
            )}
            <WrapSplit>
              {users?.map((u, i) => (
                <Split key={i}>
                  <Label>@{u?.venmo?.username}</Label>
                  <WrapAmount
                    error={
                      parseFloat(u?.amount) < 0 ||
                      parseFloat(u?.amount) > parseFloat(total)
                    }
                  >
                    <Amount
                      intlConfig={{ locale: 'en-US', currency: 'USD' }}
                      prefix="$"
                      placeholder="$0"
                      allowNegativeValue={false}
                      decimalsLimit={2}
                      allowDecimals={true}
                      value={u?.amount || ''}
                      onValueChange={(v) => updateAmount(u, v)}
                      onFocus={handleFocus}
                      step={1}
                      decimalScale={2}
                    />
                  </WrapAmount>
                  {u?.locked ? (
                    <Lock onClick={() => updateLock(u)} />
                  ) : (
                    <Unlock onClick={() => updateLock(u)} />
                  )}
                </Split>
              ))}
            </WrapSplit>
          </Section>
          <Section>
            <Subtitle>What is it?</Subtitle>
            <WrapInput>
              <Input
                onChange={(e) => {
                  changeName({ name: e.target.value });
                  setName(e.target.value);
                }}
                placeholder="Name of the expense..."
                type="text"
                value={name}
              />
            </WrapInput>
          </Section>
          <Section>
            <Subtitle>How Often?</Subtitle>
            <WrapSelect onClick={() => setModal(true)}>{frequency}</WrapSelect>
          </Section>
          {frequency !== 'One Time' && (
            <Section>
              <Subtitle>When Should We Start?</Subtitle>
              <WrapDate>
                <DateInput
                  type="date"
                  value={date}
                  onChange={(e) => {
                    changeDate({
                      startDate: new Date(e.target.value)
                        .toISOString()
                        .substr(0, 10),
                    });
                    setDate(
                      new Date(e.target.value).toISOString().substr(0, 10)
                    );
                  }}
                />
              </WrapDate>
            </Section>
          )}
          <WrapDraft onClick={() => setDraft(false)} modal={draft}>
            <Draft modal={draft}>
              <DraftTitle>Save Expense as Draft?</DraftTitle>
              <WrapButtons>
                <DiscardButton onClick={deleteDraft}>Discard</DiscardButton>
                <SaveButton onClick={() => close(false)}>Save</SaveButton>
              </WrapButtons>
            </Draft>
          </WrapDraft>
          <WrapModal onClick={() => setViewImage(false)} modal={viewImage}>
            <WrapImage modal={viewImage}>
              {image && (
                <Image
                  alt="receipt"
                  src={image}
                  layout="fill"
                  objectFit="contain"
                />
              )}
            </WrapImage>
          </WrapModal>
          <WrapModal onClick={() => setModal(false)} modal={modal}>
            <Modal modal={modal}>
              <Tab />
              <RadioForm
                handleOptionChange={(e) => {
                  setFrequency(e?.target?.value);
                  changeInterval({
                    interval: Object.keys(intervalOptions).find(
                      (key) => intervalOptions[key] === e.target.value
                    ),
                  });
                  setModal(false);
                }}
                selected={frequency}
                options={Object.values(intervalOptions)}
              />
            </Modal>
          </WrapModal>
        </Content>
      </WrapContent>

      <WrapFooter>
        <Footer>
          <Button
            disabled={
              !total ||
              name === '' ||
              (frequency !== 'One Time' && !date) ||
              submitting ||
              saving ||
              total < 0 ||
              currentTotal < 0 ||
              currentTotal > total ||
              currentTotal < total ||
              users?.some((u) => u.amount < 0) ||
              users?.some((u) => u.amount > total)
            }
            onClick={() =>
              !total ||
              name === '' ||
              submitting ||
              saving ||
              total < 0 ||
              currentTotal < 0 ||
              currentTotal > total ||
              currentTotal < total ||
              users?.some((u) => u.amount < 0) ||
              users?.some((u) => u.amount > total)
                ? null
                : submitData()
            }
          >
            {submitting || saving ? (
              <Loader viewBox="0 0 50 50">
                <Circle cx="25" cy="25" r="20"></Circle>
              </Loader>
            ) : (
              <>
                <Venmo /> Send Requests
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

export default Expense;
