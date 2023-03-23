import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";

import { ModalProvider } from "~/components/dashboard/ModalContext";
import Head from "next/head";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Head>
        <title>Flagpoll - Feature Flags Made Easy</title>
        <meta
          name="description"
          content="Flagpoll lets you quickly and easily set up feature flags to safely toggle features on and off without redeploying."
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <SessionProvider session={session}>
        <ModalProvider>
          <Component {...pageProps} />
        </ModalProvider>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
