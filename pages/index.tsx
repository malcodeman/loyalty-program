import { Box, Container, SimpleGrid } from "@chakra-ui/react";
import * as R from "ramda";

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
  const balance = user.properties.balance.number;
  const email = user.properties.email.title[0].plain_text;

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
