import { useColorModeValue, Flex, Text } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import NextLink from "next/link";

function Custom500() {
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
        <Text mb="2">Sorry, something went wrong.</Text>
        <NextLink href="/">
          <Link>Return home</Link>
        </NextLink>
      </Flex>
    </Flex>
  );
}

export default Custom500;
