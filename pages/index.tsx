import { Box, Container, SimpleGrid } from "@chakra-ui/react";
import * as R from "ramda";
import React from "react";
import { getProviders, getSession } from "next-auth/client";
import { GetServerSideProps } from "next";

import { PERKS, SESSION, USER, PROVIDERS } from "../types";
import api from "../lib/api";
import Header from "../components/Header";
import Perk from "../components/Perk";
import SignIn from "../components/SignIn";

type props = {
  perks: PERKS;
  user: USER | null;
  session: SESSION;
  providers: PROVIDERS;
};

function Home(props: props) {
  const { perks, user, session, providers } = props;
  const [balance, setBalance] = React.useState(
    user?.properties.balance.number || 0
  );
  const [boughtPerks, setBoughtPerks] = React.useState(
    user?.properties.perks.relation || []
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
    const request = await fetch(`/api/pages/${user?.id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        properties,
      }),
    });
    const content: {
      properties: {
        perks: { relation: { id: string }[] };
        balance: {
          number: number;
        };
      };
    } = await request.json();
    setBalance(content.properties.balance.number);
    setBoughtPerks(content.properties.perks.relation);
  }

  if (!session) {
    return <SignIn providers={providers} />;
  }

  return (
    <>
      <Header
        balance={balance}
        email={session.user.email}
        avatarImage={session.user.image}
      />
      <Box as="main" paddingY="4">
        <Container maxW="container.xl">
          <SimpleGrid minChildWidth="277px" spacing={4}>
            {R.map((item) => {
              const id = item.id;
              const name = item.properties.name.title[0].plain_text;
              const description =
                item.properties.description.rich_text[0].plain_text;
              const type = item.properties.type.select.name;
              const price = item.properties.price.number;
              const isDisabled = Boolean(
                R.find((item) => R.equals(item.id, id), boughtPerks)
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
                />
              );
            }, perks.results)}
          </SimpleGrid>
        </Container>
      </Box>
    </>
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
