import '../styles/globals.css';

import { extendTheme, NativeBaseProvider } from 'native-base';
import Head from 'next/head';
import NoSSR from 'react-no-ssr';
import {
  MemoryRouter,
} from "react-router-dom";

import { AppContextProvider } from '../Context';

const theme = extendTheme({
  colors: {
    brandYellow: {
      100: '#f0f0f0',
      200: '#d9d9d9',
      300: '#bfbfbf',
      400: '#8c8c8c',
      500: '#191919',
      600: '#111111',
      700: '#0d0d0d',
      800: '#090909',
      900: '#050505',
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <NoSSR>
        <MemoryRouter>
          <AppContextProvider>
            <NativeBaseProvider isSSR={false} theme={theme}>
              <Head>
                <title>Nintondo Nyan</title>
              </Head>
              <Component {...pageProps} />
            </NativeBaseProvider>
          </AppContextProvider>
        </MemoryRouter>
    </NoSSR>
  );
}

export default MyApp;
