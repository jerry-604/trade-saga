import type { NextPage } from 'next';
import type { AppType, AppProps } from 'next/app';
import { ReactElement, ReactNode, useState } from 'react';
import { trpc } from '../utils/trpc';
import 'tailwindcss/tailwind.css';
import '../css/tailwind.css'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = createTheme();

export type NextPageWithLayout<
  TProps = Record<string, unknown>,
  TInitialProps = TProps,
> = NextPage<TProps, TInitialProps> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps<{
  hostname: string;
}> & {
  Component: NextPageWithLayout;
};

const MyApp = (({ Component, pageProps }: AppPropsWithLayout) => {

  const getLayout =
    Component.getLayout ?? ((page) => <main>{page}</main>);

  return (
    getLayout(
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </StyledEngineProvider>
    )
  );
}) as AppType;

export default trpc.withTRPC(MyApp);
