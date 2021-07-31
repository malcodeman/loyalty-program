import { useColorModeValue, SimpleGrid, Flex } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import React from "react";
import * as R from "ramda";

import useAchievements from "../hooks/useAchievements";

function Achievements() {
  const { data: achievements } = useAchievements();
  const bgColor = useColorModeValue("#f5f5f5", "#131720");

  return (
    <SimpleGrid minChildWidth="244px" spacing={4}>
      {R.map((item) => {
        const name = item.properties.name.title[0].plain_text;
        return (
          <Flex
            backgroundColor={bgColor}
            key={item.id}
            padding="4"
            borderRadius="md"
            justifyContent="center"
            alignItems="center"
          >
            {name}
          </Flex>
        );
      }, achievements.results)}
    </SimpleGrid>
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
  return { props: {} };
};

export default Achievements;
