import type { NextPage } from 'next';
import type { AppType, AppProps } from 'next/app';
import { ReactElement, ReactNode, useState } from 'react';
import { trpc } from '../utils/trpc';
import 'tailwindcss/tailwind.css';
import "./style.css";

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
    getLayout(<Component {...pageProps} />)
  );
}) as AppType;

export default trpc.withTRPC(MyApp);
