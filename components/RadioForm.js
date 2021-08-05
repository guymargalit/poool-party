import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 5px 10px;
  border-radius: 10px;
  width: 100%;
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
  background-color: ${({theme, checked}) =>
    checked ? theme.colors.purple : 'transparent'};
  color: ${({theme, checked}) => (checked ? theme.colors.white : theme.text.primary)};
  @media (hover: hover) and (pointer: fine) {
    :hover {
      background-color: ${({theme}) => theme.colors.purple};
      color: ${({theme}) => theme.colors.white};
    }
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

const RadioForm = ({ options, selected, submitting, handleOptionChange }) => {
  const scrollItem = useRef(null);
  const executeScroll = () =>
    scrollItem?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  useEffect(() => executeScroll, []);

  return (
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
  );
};

export default RadioForm;
