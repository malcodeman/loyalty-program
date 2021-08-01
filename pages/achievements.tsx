import { SimpleGrid } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import React from "react";
import * as R from "ramda";

import Achievement from "../components/Achievement";
import SkeletonAchievement from "../components/SkeletonAchievement";

import useAchievements from "../hooks/useAchievements";

function Achievements() {
  const { data: achievements, isLoading } = useAchievements();

  return (
    <SimpleGrid minChildWidth="244px" spacing={4}>
      {isLoading &&
        R.times((number) => <SkeletonAchievement key={number} />, 4)}
      {R.map((item) => {
        const name = item.properties.name.title[0].plain_text;
        const price = item.properties.price.number;
        return <Achievement key={item.id} name={name} price={price} />;
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
  return { props: { session } };
};

export default Achievements;
