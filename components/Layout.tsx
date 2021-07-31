import { Box, Container } from "@chakra-ui/react";
import { useSession } from "next-auth/client";
import React, { JSXElementConstructor } from "react";

import useBalance from "../hooks/useBalance";

import Header from "./Header";

type props = {
  children: React.ReactElement<any, string | JSXElementConstructor<any>>;
};

function Layout(props: props) {
  const { children } = props;
  const [session] = useSession();
  const [balance, setBalance] = useBalance();

  if (session?.user) {
    return (
      <>
        <Header
          balance={balance}
          email={session.user.email || ""}
          avatarImage={session.user.image || ""}
        />
        <Box as="main" paddingY="4">
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
