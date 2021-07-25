import { Box, Container, SimpleGrid } from "@chakra-ui/react";
import * as R from "ramda";
import React from "react";

import { PERKS, USER } from "../types";
import api from "../lib/api";
import Header from "../components/Header";
import Perk from "../components/Perk";

type props = {
  perks: PERKS;
  user: USER;
};

function Home(props: props) {
  const { perks, user } = props;
  const [balance, setBalance] = React.useState(user.properties.balance.number);
  const email = user.properties.email.title[0].plain_text;

  async function handleBuyPerk(price: number) {
    const nextBalance = balance - price;
    const properties = {
      balance: {
        number: nextBalance,
      },
    };
    const request = await fetch(`/api/pages/${user.id}`, {
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
        balance: {
          number: number;
        };
      };
    } = await request.json();
    setBalance(content.properties.balance.number);
  }

  return (
    <>
      <Header balance={balance} email={email} />
      <Box as="main" paddingY="4">
        <Container maxW="container.xl">
          <SimpleGrid minChildWidth="277px" spacing={4}>
            {R.map((item) => {
              const name = item.properties.name.title[0].plain_text;
              const description =
                item.properties.description.rich_text[0].plain_text;
              const type = item.properties.type.select.name;
              const price = item.properties.price.number;
              return (
                <Perk
                  onClick={handleBuyPerk}
                  key={name}
                  name={name}
                  description={description}
                  type={type}
                  price={price}
                />
              );
            }, perks.results)}
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
}

export async function getServerSideProps() {
  const perks = await api.getPerks();
  const user = await api.getUser("amer.karamustafic@ministryofprogramming.com");

  return { props: { perks, user } };
}

export default Home;
