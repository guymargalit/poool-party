import { createGlobalStyle, ThemeProvider } from 'styled-components';
import React, { useState, useEffect } from 'react';
import { Provider } from 'next-auth/client';
import Layout from '../components/Layout';
import useSWR from 'swr';
import Head from 'next/head';
import { SkeletonTheme } from 'react-loading-skeleton';
import { darkTheme, lightTheme } from '../theme';
import useDarkMode from 'use-dark-mode';

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100vh;
    background: ${({ navigation, theme }) =>
      navigation
        ? `linear-gradient(to bottom, ${theme.bg.sky} 0%, ${theme.bg.sky} 80%, ${theme.bg.content} 80%, ${theme.bg.content} 100%)`
        : `linear-gradient(to bottom, ${theme.bg.sky} 0%, ${theme.bg.sky} 50%, ${theme.bg.wave} 50%, ${theme.bg.wave} 100%)`};
    padding: 0;
    margin: 0;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
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

const fetcher = async (url) => {
  const r = await fetch(url);
  return await r.json();
};

export default function App({ Component, pageProps }) {
  const initialData = pageProps.user;
  const { data, error } = useSWR('/api/user', fetcher, { initialData });
  const [navigation, setNavigation] = useState(false);
  const { value, toggle } = useDarkMode(false, { });
  const theme = value ? darkTheme : lightTheme;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Provider session={pageProps.session}>
      <Head>
        <title>Poool Party</title>
        <link rel="icon" href="/favicon.png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover"
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
      {mounted && (
        <>
          {' '}
          <GlobalStyle theme={theme} navigation={navigation} />
          <ThemeProvider theme={theme}>
            <SkeletonTheme
              color={theme.loader.color}
              highlightColor={theme.loader.highlight}
            >
              <Layout
                navigation={navigation}
                setNavigation={setNavigation}
                darkMode={value}
                setDarkMode={toggle}
                user={data}
                error={error}
                {...pageProps}
              >
                <Component user={data} {...pageProps} />
              </Layout>
            </SkeletonTheme>
          </ThemeProvider>
        </>
      )}
    </Provider>
  );
}

export async function getServerSideProps() {
  const user = await fetcher('/api/user');
  return { props: { user } };
}
