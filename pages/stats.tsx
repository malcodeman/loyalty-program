import { useColorModeValue, Box, Grid, Text, Avatar } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import React from "react";
import { format } from "date-fns";

import { SESSION } from "../types";
import utils from "../lib/utils";

import useUser from "../hooks/useUser";

type props = {
  session: SESSION;
};

const gridTemplateAreas = {
  base: `"profile profile profile" "totalActivePerks totalActivePerks totalActivePerks" "totalCost totalCost totalCost"`,
  md: `"profile totalActivePerks totalCost" "profile . ."`,
};

function Stats(props: props) {
  const { session } = props;
  const { data: user } = useUser();
  const bgColor = useColorModeValue("#eeeeee", "#131720");
  const activePerks = user?.properties.perks.relation.length;
  const totalCost = user?.properties.total_cost?.rollup.number;
  const startDate = user?.properties.start_date?.date.start;
  const formatedStartDate = startDate
    ? format(new Date(startDate), "MMM d, yyyy")
    : "";
  const level = startDate ? utils.getLevel(new Date(startDate)) : "";

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
        <Text fontWeight="bold">{activePerks}</Text>
      </Box>
      <Box
        backgroundColor={bgColor}
        gridArea="totalCost"
        padding="4"
        borderRadius="md"
      >
        <Text mb="2">Total Cost</Text>
        <Text fontWeight="bold">€{totalCost}</Text>
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
