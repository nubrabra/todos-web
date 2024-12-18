'use client';
import { Provider } from 'react-redux';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import '../globals.css';

import theme from 'src/theme'; // Import Mui Custom Theme
import store from 'src/store/store';
import Layout from 'src/components/Layout';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Reset ค่าพื้นฐานให้ตรงตาม MUI */}
      <Provider store={store}>
        <Head>
          <title>{'Todos - List'}</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ThemeProvider>
  );
}
