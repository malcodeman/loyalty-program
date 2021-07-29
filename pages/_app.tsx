import type { AppProps } from "next/app";
import { Provider } from "next-auth/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";

import Layout from "../components/Layout";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
