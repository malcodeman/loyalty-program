import { SimpleGrid } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import React from "react";
import * as R from "ramda";

import Achievement from "../components/Achievement";
import SkeletonAchievement from "../components/SkeletonAchievement";
import RequestsTable from "../components/RequestsTable";

import useAchievements from "../hooks/useAchievements";
import useRequests from "../hooks/useRequests";

function Achievements() {
  const { data: achievements, isLoading: isLoadingAchievements } =
    useAchievements();
  const { data: requests, isLoading: isLoadingRequests } = useRequests();

  return (
    <>
      <SimpleGrid spacing={4} minChildWidth="244px" mb="10">
        {isLoadingAchievements ? (
          R.times((number) => <SkeletonAchievement key={number} />, 4)
        ) : (
          <></>
        )}
        {R.map((item) => {
          const name = item.properties.name.title[0].plain_text;
          const price = item.properties.price.number;
          return <Achievement key={item.id} name={name} price={price} />;
        }, achievements.results)}
      </SimpleGrid>
      <RequestsTable data={requests} isLoading={isLoadingRequests} />
    </>
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
