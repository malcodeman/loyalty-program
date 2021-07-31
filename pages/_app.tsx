import type { AppProps } from "next/app";
import { Provider } from "next-auth/client";
import { ChakraProvider } from "@chakra-ui/react";

import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
