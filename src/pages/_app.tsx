import { AppProps } from "next/app";
import "@/styles/globals.css";
// import getCurrentUser from "@/actions/getCurrentUser";
import { Suspense } from "react";
import ToasterProvider from "@/providers/ToasterProvider";
import SearchModal from "@/components/modals/SearchModal";
import RegisterModal from "@/components/modals/RegisterModal";
import Loader from "@/components/Loader";
import LoginModal from "@/components/modals/LoginModal";
import RentModal from "@/components/modals/RentModal";
import ClientOnly from "@/components/ClientOnly";
import { SessionProvider } from "next-auth/react";
import { Nunito } from "next/font/google";

export const font = Nunito({
  subsets: ["latin"],
});

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
    <SessionProvider session={session}>
      <ClientOnly>
        <ToasterProvider />
        <SearchModal />
        <RegisterModal />
        <RentModal />
        <LoginModal />
      </ClientOnly>

      <Suspense fallback={<Loader />}>
        <div className={font.className}>
          <Component {...pageProps} />
        </div>
      </Suspense>
    </SessionProvider>
  );
};

export default MyApp;
