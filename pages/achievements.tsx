import { useColorModeValue, SimpleGrid, Flex } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import React from "react";
import * as R from "ramda";

import { SESSION, ACHIEVEMENTS } from "../types";
import api from "../lib/api";
import constants from "../lib/constants";

type props = {
  session: SESSION;
  achievements: ACHIEVEMENTS;
};

function Achievements(props: props) {
  const { achievements } = props;
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
  const achievements = constants.NOTION_DATABASE_ID_ACHIEVEMENTS
    ? await api.queryDatabase(constants.NOTION_DATABASE_ID_ACHIEVEMENTS)
    : { results: [] };
  return { props: { session, achievements } };
};

export default Achievements;
