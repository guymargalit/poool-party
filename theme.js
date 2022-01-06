// theme.js
const light = {
  bg: {
    sky: '#8fd0fa',
    wave: '#54c0f9',
    content: '#ffffff',
    border: '#eeeeee',
    input: '#b0b0b0',
    item: '#e2e2e2',
    code: 'rgb(221, 221, 221)',
    header:'#54c0f9',
  },
  text: {
    primary: '#222222',
    secondary: '#333333',
    tertiary: '#444444',
    quarternary: '#888888',
    hover: '#aaaaaa',
    code: '#222222',
  },
  nav: {
    bg: '#ffffff',
    border: 'rgb(221, 221, 221)',
    text: 'rgb(113, 113, 113)',
    icon: 'rgb(176, 176, 176)',
  },
  button: {
    hover: '#111236',
  },
  loader: {
    color: '#e2e2e2',
    highlight: '#e9e9e9',
  },
};

const dark = {
  bg: {
    sky: '#111236',
    wave: '#042759',
    content: '#02122c',
    border: '#111236',
    input: '#dddddd',
    item: '#5a489b',
    code: '#151718',
    header: '#18194a',
  },
  text: {
    primary: '#fefefe',
    secondary: '#f2f2f2',
    tertiary: '#e2e2e2',
    quarternary: '#dddddd',
    hover: '#ffffff',
    code: '#54c0f9',
  },
  nav: {
    bg: '#02122c',
    border: '#111236',
    text: '#eeeeee',
    icon: '#dddddd',
  },
  button: {
    hover: '#042759',
  },
  loader: {
    color: '#111236',
    highlight: '#111936',
  },
};

const defaultTheme = {
  colors: {
    disabled: '#aaaaaa',
    pending: '#ffb54d',
    error: '#ed5f74',
    success: '#00C851',
    purple: '#5a489b',
    white: '#ffffff',
  },
};

export const lightTheme = { ...defaultTheme, ...light };
export const darkTheme = { ...defaultTheme, ...dark };
