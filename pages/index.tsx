import { SimpleGrid } from "@chakra-ui/react";
import * as R from "ramda";
import React from "react";
import { getProviders, getSession } from "next-auth/client";
import { GetServerSideProps } from "next";
import { useMutation } from "react-query";
import axios from "axios";

import { PERKS, SESSION, USER, PROVIDERS } from "../types";
import api from "../lib/api";
import Perk from "../components/Perk";
import SignIn from "../components/SignIn";

type props = {
  perks: PERKS;
  user: USER | null;
  session: SESSION;
  providers: PROVIDERS;
  balance: number;
  setBalance: (nextBalance: number) => void;
};

function Home(props: props) {
  const { perks, user, session, providers, balance, setBalance } = props;
  const [boughtPerks, setBoughtPerks] = React.useState(
    user?.properties.perks.relation || []
  );
  const updatePageMutation = useMutation(
    (nextProperties: {
      properties: {
        perks: {
          relation: {
            id: string;
          }[];
        };
      };
    }) => axios.post(`/api/pages/${user?.id}`, nextProperties),
    {
      onSuccess: (data) => {
        const content = data.data;
        setBalance(content.properties.balance.number);
        setBoughtPerks(content.properties.perks.relation);
      },
    }
  );

  async function handleBuyPerk(id: string, price: number) {
    const nextBalance = balance - price;
    const nextRelation = [...boughtPerks, { id }];
    const properties = {
      balance: {
        number: nextBalance,
      },
      perks: {
        relation: nextRelation,
      },
    };
    updatePageMutation.mutate({ properties });
  }

  if (!session) {
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
        const isDisabled = price > balance;
        const isLoading =
          updatePageMutation.isLoading &&
          R.equals(
            R.last(
              updatePageMutation.variables?.properties.perks.relation || []
            )?.id,
            id
          );
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
  const perks = await api.getPerks();
  const session = await getSession(context);
  const user = session?.user?.email
    ? await api.getUser(session.user.email)
    : null;
  const providers = await getProviders();
  return { props: { perks, user, session, providers } };
};

export default Home;
