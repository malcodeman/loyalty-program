import {
  useColorModeValue,
  Box,
  Grid,
  Text,
  Flex,
  SkeletonText,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import React from "react";

import { SESSION } from "../types";
import utils from "../lib/utils";

import CircularProgressCard from "../components/CircularProgressCard";
import ProfileCard from "../components/ProfileCard";
import EmployeesByBalanceCard from "../components/EmployeesByBalanceCard";

import useUser from "../hooks/useUser";
import useUsers from "../hooks/useUsers";

type props = {
  session: SESSION;
};

const gridTemplateAreas = {
  base: `"profile profile profile" "totalActivePerks totalActivePerks totalActivePerks" "totalCost totalCost totalCost" "currentProgress currentProgress currentProgress" "employeesByCoinBalance employeesByCoinBalance employeesByCoinBalance"`,
  md: `"profile totalActivePerks totalCost" "profile currentProgress currentProgress" "employeesByCoinBalance employeesByCoinBalance employeesByCoinBalance"`,
  lg: `"profile totalActivePerks totalCost" "profile currentProgress employeesByCoinBalance"`,
};

function Stats(props: props) {
  const { session } = props;
  const { data: user, isLoading: isLoadingUser } = useUser();
  const { data: users, isLoading: isLoadingUsers } = useUsers();
  const bgColor = useColorModeValue("#eeeeee", "#131720");
  const activePerks = user?.properties.perks.relation.length;
  const totalCost = user?.properties.total_cost?.rollup.number || 0;
  const startDate = user?.properties.start_date?.date.start
    ? new Date(user.properties.start_date.date.start)
    : new Date();

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
        <ProfileCard
          startDate={startDate}
          name={session.user.name}
          avatarImage={session.user.image}
          isLoading={isLoadingUser}
        />
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
          <Text fontWeight="bold"> {utils.formatNumber(totalCost)}€</Text>
        )}
      </Box>
      <Flex
        backgroundColor={bgColor}
        gridArea="currentProgress"
        padding="4"
        borderRadius="md"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <CircularProgressCard startDate={startDate} isLoading={isLoadingUser} />
      </Flex>
      <Box
        backgroundColor={bgColor}
        gridArea="employeesByCoinBalance"
        padding="4"
        borderRadius="md"
      >
        <EmployeesByBalanceCard users={users} isLoading={isLoadingUsers} />
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
