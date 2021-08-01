import { Box, Container } from "@chakra-ui/react";
import { useSession } from "next-auth/client";
import React, { JSXElementConstructor } from "react";
import { useMedia } from "react-use";

import utils from "../lib/utils";

import Header from "./Header";
import HeaderMobile from "./HeaderMobile";

import useBalance from "../hooks/useBalance";

type props = {
  children: React.ReactElement<any, string | JSXElementConstructor<any>>;
};

function Layout(props: props) {
  const { children } = props;
  const [session] = useSession();
  const { balance, setBalance, isLoading } = useBalance();
  const isWide = useMedia("(min-width: 768px)");
  const headerProps = {
    balance,
    email: session?.user?.email || "",
    avatarImage: session?.user?.image || "",
    name: session?.user?.name || "",
    isLoadingBalance: isLoading,
  };

  function renderHeader() {
    if (utils.isBrowser) {
      return isWide ? (
        <Header {...headerProps} />
      ) : (
        <HeaderMobile {...headerProps} />
      );
    }
    return <></>;
  }

  if (session?.user) {
    return (
      <>
        {renderHeader()}
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
