import { Box, Container } from "@chakra-ui/react";
import { useSession } from "next-auth/client";
import React, { JSXElementConstructor } from "react";
import { useWindowSize } from "react-use";

import useBalance from "../hooks/useBalance";

import Header from "./Header";
import HeaderMobile from "./HeaderMobile";

type props = {
  children: React.ReactElement<any, string | JSXElementConstructor<any>>;
};

function Layout(props: props) {
  const { children } = props;
  const [session] = useSession();
  const { balance, setBalance, isLoading } = useBalance();
  const { width } = useWindowSize();
  const headerProps = {
    balance,
    email: session?.user?.email || "",
    avatarImage: session?.user?.image || "",
    name: session?.user?.name || "",
    isLoadingBalance: isLoading,
  };

  if (session?.user) {
    return (
      <>
        {width >= 768 ? (
          <Header {...headerProps} />
        ) : (
          <HeaderMobile {...headerProps} />
        )}
        <Box as="main" paddingY="4" marginBottom={["64px", "64px", 0]}>
          <Container maxW="container.xl">
            {React.cloneElement(children, { balance, setBalance })}
          </Container>
        </Box>
      </>
    );
  }
  return children;
}

export default Layout;
