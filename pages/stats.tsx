import {
  useColorModeValue,
  Box,
  Grid,
  Text,
  Avatar,
  Flex,
  SkeletonText,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import React from "react";
import { format } from "date-fns";
import * as R from "ramda";

import { SESSION } from "../types";
import utils from "../lib/utils";

import useUser from "../hooks/useUser";
import useUsers from "../hooks/useUsers";

type props = {
  session: SESSION;
};

const gridTemplateAreas = {
  base: `"profile profile profile" "totalActivePerks totalActivePerks totalActivePerks" "totalCost totalCost totalCost" "employeesByCoinBalance employeesByCoinBalance employeesByCoinBalance"`,
  md: `"profile totalActivePerks totalCost" "profile employeesByCoinBalance ."`,
};

function Stats(props: props) {
  const { session } = props;
  const { data: user, isLoading: isLoadingUser } = useUser();
  const { data: users, isLoading: isLoadingUsers } = useUsers();
  const bgColor = useColorModeValue("#eeeeee", "#131720");
  const activePerks = user?.properties.perks.relation.length;
  const totalCost = user?.properties.total_cost?.rollup.number;
  const startDate = user?.properties.start_date?.date.start;
  const formatedStartDate = startDate
    ? format(new Date(startDate), "MMM d, yyyy")
    : "";
  const level = startDate ? utils.getLevel(new Date(startDate)) : "";
  const sortedUsersByBalance = R.sort((a, b) => {
    const balanceA = a.properties.balance.number;
    const balanceB = b.properties.balance.number;
    return balanceB - balanceA;
  }, R.slice(0, 5, users.results));

  return (
    <Grid
      gridTemplateAreas={gridTemplateAreas}
      gridTemplateColumns="1fr 1fr 1fr"
      gap={4}
    >
      <Box
        backgroundColor={bgColor}
        gridArea="profile"
        padding="4"
        borderRadius="md"
        textAlign="center"
      >
        <Avatar
          size="2xl"
          mb="2"
          name={session.user.name}
          src={session.user.image}
        />
        <Text>
          {session.user.name} - {level}
        </Text>
        <Text fontSize="sm">Joined {formatedStartDate}</Text>
      </Box>
      <Box
        backgroundColor={bgColor}
        gridArea="totalActivePerks"
        padding="4"
        borderRadius="md"
      >
        <Text mb="2">Total Active Perks</Text>
        {isLoadingUser ? (
          <SkeletonText noOfLines={1} width="20%" />
        ) : (
          <Text fontWeight="bold">{activePerks}</Text>
        )}
      </Box>
      <Box
        backgroundColor={bgColor}
        gridArea="totalCost"
        padding="4"
        borderRadius="md"
      >
        <Text mb="2">Total Perk Cost</Text>
        {isLoadingUser ? (
          <SkeletonText noOfLines={1} width="20%" />
        ) : (
          <Text fontWeight="bold">{totalCost}€</Text>
        )}
      </Box>
      <Box
        backgroundColor={bgColor}
        gridArea="employeesByCoinBalance"
        padding="4"
        borderRadius="md"
      >
        <Text mb="2">Employees by coin balance</Text>
        {isLoadingUsers ? (
          <SkeletonText noOfLines={5} />
        ) : (
          R.map((item) => {
            const email = item.properties.email.title[0].plain_text;
            const balance = item.properties.balance.number;
            return (
              <Flex key={email} justifyContent="space-between">
                <Text>{R.split("@", email)[0]}</Text>
                <Text as="span" fontWeight="bold">
                  {utils.formatNumber(balance)}€
                </Text>
              </Flex>
            );
          }, sortedUsersByBalance)
        )}
      </Box>
    </Grid>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session?.user?.email) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return { props: { session } };
};

export default Stats;
