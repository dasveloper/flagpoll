import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import NiceModal from "@ebay/nice-modal-react";
import ProjectModal from "~/components/ProjectModal";
import FlagModal from "~/components/FlagModal";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  NiceModal.register("project-modal", ProjectModal);
  NiceModal.register("flag-modal", FlagModal);

  return (
    <SessionProvider session={session}>
      <NiceModal.Provider>
        <Component {...pageProps} />
      </NiceModal.Provider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
