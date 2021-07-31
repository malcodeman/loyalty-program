import { SimpleGrid } from "@chakra-ui/react";
import * as R from "ramda";
import React from "react";
import { getProviders, getSession } from "next-auth/client";
import { GetServerSideProps } from "next";
import axios from "axios";

import { SESSION, PROVIDERS } from "../types";

import Perk from "../components/Perk";
import SignIn from "../components/SignIn";

import useUser from "../hooks/useUser";
import usePerks from "../hooks/usePerks";

type props = {
  session: SESSION | null;
  providers: PROVIDERS | null;
  balance: number;
  setBalance: (nextBalance: number) => void;
};

function Home(props: props) {
  const { session, providers, balance, setBalance } = props;
  const { data: perks } = usePerks();
  const { data: user } = useUser();
  const [boughtPerks, setBoughtPerks] = React.useState<{ id: string }[]>([
    { id: "" },
  ]);
  const [isLoadingId, setIsLoadingId] = React.useState("");

  React.useEffect(() => {
    if (user) {
      setBoughtPerks(user.properties.perks.relation);
    }
  }, [user]);

  async function handleBuyPerk(id: string, price: number) {
    const nextBalance = balance - price;
    const nextRelation = [...boughtPerks, { id }];
    const body = {
      properties: {
        balance: {
          number: nextBalance,
        },
        perks: {
          relation: nextRelation,
        },
      },
    };
    try {
      setIsLoadingId(id);
      const data = await axios.post(`/api/pages/${user?.id}`, body);
      const content = data.data;
      setBalance(content.properties.balance.number);
      setBoughtPerks(content.properties.perks.relation);
    } finally {
      setIsLoadingId("");
    }
  }

  if (!session && providers) {
    return <SignIn providers={providers} />;
  }

  return (
    <SimpleGrid minChildWidth="277px" spacing={4}>
      {R.map((item) => {
        const id = item.id;
        const name = item.properties.name.title[0].plain_text;
        const description = item.properties.description.rich_text[0].plain_text;
        const type = item.properties.type.select.name;
        const price = item.properties.price.number;
        const isBought = Boolean(
          R.find((item) => R.equals(item.id, id), boughtPerks)
        );
        const isDisabled = price > balance || Boolean(isLoadingId);
        const isLoading = R.equals(isLoadingId, id);
        return (
          <Perk
            onClick={handleBuyPerk}
            key={id}
            id={id}
            name={name}
            description={description}
            type={type}
            price={price}
            isDisabled={isDisabled}
            isBought={isBought}
            isLoading={isLoading}
          />
        );
      }, perks.results)}
    </SimpleGrid>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const providers = session ? null : await getProviders();
  return { props: { session, providers } };
};

export default Home;
