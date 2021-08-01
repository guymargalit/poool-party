import { createGlobalStyle, ThemeProvider } from 'styled-components';
import React, { useEffect } from 'react';
import { Provider } from 'next-auth/client';
import Layout from '../components/Layout';
import useSWR from 'swr';
import Head from 'next/head';
import { SkeletonTheme } from 'react-loading-skeleton';

const GlobalStyle = createGlobalStyle`
  html, body {
    padding: 0;
    margin: 0;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  background-color: #8fd0fa;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
  a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}
`;

const theme = {
  colors: {
    primary: '#0a2540',
    blue: '#54c0f9',
    yellow: '#FEF7CB',
    error: '#ed5f74',
    success: '#00C851',
    white: '#FFFFFF',
  },
  palette: {
    light: {
      skyBlueTint01: '#6d9feb',
      skyBlueTint02: '#9dc0f2',
      skyBlueTint03: '#cddff8',
      glencoe: '#73cec6',
      sagano: '#d0eeec',
      erfoud: '#ffb54d',
      bagan: '#ffebd0',
      petra: '#ffab95',
      nara: '#ffe7e0',
      valensole: '#a59bc8',
      tochigi: '#e1ddec',
      hillier: '#e18b96',
      harbour: '#f6dde1',
    },
    dark: {
      skyBlue: '#0770e3',
      skyBlueShade01: '#084eb2',
      skyBlueShade02: '#042759',
      skyBlueShade03: '#02122c',
      monteverde: '#00a698',
      kolkata: '#ff9400',
      bunol: '#ff7b59',
      abisko: '#5a489b',
      panjin: '#d1435b',
      skyGray: '#111236',
    },
  },
};

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function App({ Component, pageProps }) {
  const initialData = pageProps.user;
  const { data } = useSWR('/api/user', fetcher, { initialData });
  return (
    <Provider session={pageProps.session}>
      <Head>
        <title>Poool Party</title>
        <link rel="icon" href="/favicon.png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
        />
        <meta name="theme-color" content="#5a489b" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-title" content="Poool Party" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        ></meta>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <SkeletonTheme color="#e2e2e2" highlightColor="#e9e9e9">
          <Layout user={data} {...pageProps}>
            <Component user={data} {...pageProps} />
          </Layout>
        </SkeletonTheme>
      </ThemeProvider>
    </Provider>
  );
}

export async function getServerSideProps() {
  const user = await fetcher('/api/user');
  return { props: { user } };
}
