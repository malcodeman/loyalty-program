import { useColorModeValue, Flex, Heading, Button } from "@chakra-ui/react";
import { signIn } from "next-auth/client";

import { PROVIDERS } from "../types";

import Logo from "../icons/Logo";
import Google from "../icons/Google";

function SignIn(props: { providers: PROVIDERS }) {
  const { providers } = props;
  const bgColor = useColorModeValue("#fafafa", "#18191a");

  return (
    <Flex minHeight="100vh" alignItems="center" justifyContent="center">
      <Flex
        backgroundColor={bgColor}
        padding="8"
        borderRadius="md"
        flexDirection="column"
        alignItems="center"
      >
        <Logo size={64} />
        <Heading size="lg" mb="10">
          Sign in to Loyalty
        </Heading>
        <Button
          onClick={() => signIn(providers.google.id)}
          leftIcon={<Google size={16} />}
        >
          Continue with Google
        </Button>
      </Flex>
    </Flex>
  );
}

export default SignIn;
