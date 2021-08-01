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
import { LogOut, Sun, Moon, Home, BarChart2, Award } from "react-feather";
import { signOut } from "next-auth/client";

import utils from "../lib/utils";

import NavLink from "./NavLink";

type props = {
  balance: number;
  email: string;
  avatarImage: string;
  name: string;
  isLoadingBalance: boolean;
};

function HeaderMobile(props: props) {
  const { balance, email, avatarImage, name, isLoadingBalance } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  const boxShadow = useColorModeValue(
    "rgba(0, 0, 0, 0.03) 0px -2px 0px 0px",
    "rgba(255, 255, 255, 0.03) 0 -2px 0 0"
  );
  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <Box
      boxShadow={boxShadow}
      backgroundColor={bgColor}
      as="header"
      paddingY="2"
      position="fixed"
      left="0"
      right="0"
      bottom="0"
      zIndex="1"
    >
      <Container maxW="container.xl">
        <Flex justifyContent="space-between" alignItems="center">
          <NavLink href="/">
            <Flex flexDirection="column" alignItems="center">
              <Home size={24} />
              <Text fontSize="xs">Marketplace</Text>
            </Flex>
          </NavLink>
          <NavLink href="/stats">
            <Flex flexDirection="column" alignItems="center">
              <BarChart2 size={24} />
              <Text fontSize="xs">Stats</Text>
            </Flex>
          </NavLink>
          <NavLink href="/achievements">
            <Flex flexDirection="column" alignItems="center">
              <Award size={24} />
              <Text fontSize="xs">Achievements</Text>
            </Flex>
          </NavLink>
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
                <Flex>
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
                <Divider marginY="2" />
                <Button
                  onClick={() => toggleColorMode()}
                  justifyContent="flex-start"
                  isFullWidth
                  mb="2"
                  leftIcon={
                    colorMode === "dark" ? (
                      <Moon onClick={toggleColorMode} />
                    ) : (
                      <Sun onClick={toggleColorMode} />
                    )
                  }
                >
                  {colorMode === "dark" ? "Dark mode" : "Light mode"}
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
      </Container>
    </Box>
  );
}

export default HeaderMobile;
