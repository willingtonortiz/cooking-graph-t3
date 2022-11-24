import { Toaster } from "react-hot-toast";
import type { AppType } from "next/app";
import { Box, ChakraProvider } from "@chakra-ui/react";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import "reactflow/dist/style.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <Toaster position={"top-right"} />

      <Box w={"100vw"} h={"100vh"}>
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  );
};

export default trpc.withTRPC(MyApp);
