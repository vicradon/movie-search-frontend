import Head from "next/head";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
import "../src/css/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <CSSReset />
      <Toaster />
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
