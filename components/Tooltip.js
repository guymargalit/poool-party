import React, { useState } from 'react';
import styled from 'styled-components';

/* Wrapping */
const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  user-select: none;
`;

/* Absolute positioning */
const Tip = styled.div`
  position: absolute;
  border-radius: 4px;
  left: 50%;
  transform: translateX(-108%);
  padding: 6px;
  color: #ffffff;
  background: #222222;
  font-size: 14px;
  font-family: sans-serif;
  line-height: 1;
  z-index: 4;
  white-space: nowrap;

  ::before {
    content: ' ';
    left: 80%;
    border: solid transparent;
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-width: 6px;
    margin-left: calc(6px * -1);
  }

  bottom: calc(110px * -1);

  ::before {
    bottom: 100%;
    border-bottom-color: #222;
  }
`;

const Top = styled.div`
  top: calc(6px * -1);

  ::before {
    top: 100%;
    border-top-color: #222;
  }
`;

/* Absolute positioning */
const Right = styled.div`
  left: calc(100% + 30px);
  top: 50%;
  transform: translateX(0) translateY(-50%);

  ::before {
    left: calc(6px * -1);
    top: 50%;
    transform: translateX(0) translateY(-50%);
    border-right-color: #222;
  }
`;

/* Absolute positioning */
const Bottom = styled.div`
  bottom: calc(30px * -1);

  ::before {
    bottom: 100%;
    border-bottom-color: #222;
  }
`;

const Left = styled.div`
  left: auto;
  right: calc(100% + 30px);
  top: 50%;
  transform: translateX(0) translateY(-50%);

  ::before {
    left: auto;
    right: calc(6px * -2);
    top: 50%;
    transform: translateX(0) translateY(-50%);
    border-left-color: #222;
  }
`;

const Tooltip = (props) => {
  return (
    <Wrapper>
      {props.children}
      <Tip>{props.content}</Tip>
    </Wrapper>
  );
};

export default Tooltip;
