import { createGlobalStyle, ThemeProvider } from 'styled-components';
import React from 'react';
import { Provider } from 'next-auth/client';
import Layout from '../components/Layout';

const GlobalStyle = createGlobalStyle`
  html, body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
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
    error: '#d1435b',
    white: '#F9F9F9',
  },
};

const resetHeight = () => {
  // reset the body height to that of the inner browser
  document.body.style.height = window.innerHeight + 'px';
};

export default function App({ Component, pageProps }) {
  React.useEffect(() => {
    // reset the height whenever the window's resized
    window.addEventListener('resize', resetHeight);
    // called to initially set the height.
    resetHeight();
  }, []);

  return (
    <Provider session={pageProps.session}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}
