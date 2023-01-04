import type { ReactElement, ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import type { NextPage } from "next";
import type { AppProps, AppType } from "next/app";
import { Box, ChakraProvider } from "@chakra-ui/react";

import { trpc } from "../utils/trpc";
import { UserContextProvider } from "../modules/auth/presentation/contexts/user-context/user-context";
import { useUser } from "../modules/user/presentation/hooks/useUser/useUser";
import "reactflow/dist/style.css";
import "../styles/globals.css";
import { MainLayout } from "../modules/core/presentation/layouts/MainLayout/MainLayout";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp: AppType = ({ Component, pageProps }: AppPropsWithLayout) => {
  const { data: user = null } = useUser();

  return (
    <ChakraProvider>
      <UserContextProvider user={user}>
        <Toaster position={"top-right"} />

        <Box
          w={"100vw"}
          h={"100vh"}
          minW={"100vw"}
          minH={"100vh"}
          display={"flex"}
          flexFlow={"column nowrap"}
        >
          {Component.getLayout ? (
            Component.getLayout(<Component {...pageProps} />)
          ) : (
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          )}
        </Box>
      </UserContextProvider>
    </ChakraProvider>
  );
};

export default trpc.withTRPC(MyApp);
