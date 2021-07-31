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
  Spinner,
} from "@chakra-ui/react";
import Link from "next/link";
import { LogOut, Sun, Moon } from "react-feather";
import { signOut } from "next-auth/client";

import utils from "../lib/utils";

type props = {
  balance: number;
  email: string;
  avatarImage: string;
  isLoadingBalance: boolean;
};

function Header(props: props) {
  const { balance, email, avatarImage, isLoadingBalance } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  const boxShadow = useColorModeValue(
    "rgba(0, 0, 0, 0.03) 0px 2px 0px 0px",
    "rgba(255, 255, 255, 0.03) 0px 2px 0px 0px"
  );

  return (
    <Box as="header" paddingY="2" boxShadow={boxShadow}>
      <Container maxW="container.xl">
        <Flex justifyContent="space-between" alignItems="center">
          <Flex>
            <Link href="/">
              <a>
                <Text mr="4">Marketplace</Text>
              </a>
            </Link>
            <Link href="/stats">
              <a>
                <Text mr="4">Stats</Text>
              </a>
            </Link>
            <Link href="/achievements">
              <a>
                <Text mr="4">Achievements</Text>
              </a>
            </Link>
          </Flex>
          <Flex alignItems="center">
            <Flex mr="4">
              <Text as="span" mr="2">
                Balance:
              </Text>
              {isLoadingBalance ? (
                <Spinner />
              ) : (
                <Text as="span" fontWeight="bold">
                  {utils.formatNumber(balance)}
                </Text>
              )}
            </Flex>
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
                    leftIcon={<LogOut size={16} />}
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
