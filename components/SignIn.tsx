import {
  useColorModeValue,
  Flex,
  Box,
  Heading,
  Button,
} from "@chakra-ui/react";
import { signIn } from "next-auth/client";

import { PROVIDERS } from "../types";

function SignIn(props: { providers: PROVIDERS }) {
  const { providers } = props;
  const bgColor = useColorModeValue("#fafafa", "#18191a");

  return (
    <Flex minHeight="100vh" alignItems="center" justifyContent="center">
      <Box
        backgroundColor={bgColor}
        padding="8"
        borderRadius="md"
        textAlign="center"
      >
        <Heading size="lg" mb="2">
          Sign in to Loyalty
        </Heading>
        <Button onClick={() => signIn(providers.google.id)}>
          Continue with Google
        </Button>
      </Box>
    </Flex>
  );
}

export default SignIn;
