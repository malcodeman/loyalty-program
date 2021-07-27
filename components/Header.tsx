import {
  useColorMode,
  useColorModeValue,
  Box,
  Text,
  Container,
  Avatar,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Button,
  Divider,
} from "@chakra-ui/react";
import Link from "next/link";
import { LogOut, Sun, Moon } from "react-feather";
import { signOut } from "next-auth/client";

import utils from "../lib/utils";

type props = {
  balance: number;
  email: string;
  avatarImage: string;
};

function Header(props: props) {
  const { balance, email, avatarImage } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  const boxShadow = useColorModeValue(
    "rgba(0, 0, 0, 0.03) 0px 2px 0px 0px",
    "rgba(255, 255, 255, 0.03) 0px 2px 0px 0px"
  );

  return (
    <Box as="header" paddingY="2" boxShadow={boxShadow}>
      <Container maxW="container.xl">
        <Flex justifyContent="space-between" alignItems="center">
          <Link href="/">
            <a>
              <Text>Marketplace</Text>
            </a>
          </Link>
          <Flex alignItems="center">
            <Text mr="4">
              Balance:{" "}
              <Text as="span" fontWeight="bold">
                {utils.formatNumber(balance)}
              </Text>
            </Text>
            <Box mr="4" cursor="pointer">
              {colorMode === "dark" ? (
                <Moon onClick={toggleColorMode} />
              ) : (
                <Sun onClick={toggleColorMode} />
              )}
            </Box>
            <Popover>
              <PopoverTrigger>
                <Avatar
                  cursor="pointer"
                  size="md"
                  name="Dan Abrahmov"
                  src={avatarImage}
                />
              </PopoverTrigger>
              <PopoverContent width="244px">
                <PopoverBody>
                  <Text>{email}</Text>
                  <Divider marginY="2" />
                  <Button
                    onClick={() => signOut()}
                    justifyContent="flex-start"
                    isFullWidth
                    leftIcon={<LogOut />}
                  >
                    Log out
                  </Button>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}

export default Header;
