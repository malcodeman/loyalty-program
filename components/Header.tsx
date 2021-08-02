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
import { LogOut, Sun, Moon } from "react-feather";
import { signOut } from "next-auth/client";

import utils from "../lib/utils";

import NavLink from "./NavLink";
import Logo from "../icons/Logo";

type props = {
  balance: number;
  email: string;
  avatarImage: string;
  name: string;
  isLoadingBalance: boolean;
  onOpen: () => void;
};

function Header(props: props) {
  const { balance, email, avatarImage, name, isLoadingBalance, onOpen } = props;
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
            <NavLink href="/">
              <Text mr="4">Marketplace</Text>
            </NavLink>
            <NavLink href="/stats">
              <Text mr="4">Stats</Text>
            </NavLink>
            <NavLink href="/achievements">
              <Text mr="4">Achievements</Text>
            </NavLink>
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
                  {utils.formatNumber(balance)}€
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
                  name={name}
                  src={avatarImage}
                />
              </PopoverTrigger>
              <PopoverContent width="244px">
                <PopoverBody>
                  <Text>{email}</Text>
                  <Divider marginY="2" />
                  <Button
                    onClick={onOpen}
                    isFullWidth
                    justifyContent="flex-start"
                    mb="2"
                    leftIcon={<Logo size={16} />}
                  >
                    Request coins
                  </Button>
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
