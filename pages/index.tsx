import { Box, Text } from "@chakra-ui/react";

import api from "../lib/api";
import { PERKS } from "../types";

type props = {
  perks: PERKS;
};

function Home(props: props) {
  const { perks } = props;

  return (
    <Box>
      {perks.results.map((item) => {
        const name = item.properties.name.title[0].plain_text;
        return (
          <Box key={name}>
            <Text>Name - {name}</Text>
            <Text>Type - {item.properties.type.select.name}</Text>
            <Text>Price - {item.properties.price.number}</Text>
          </Box>
        );
      })}
    </Box>
  );
}

export async function getServerSideProps() {
  const perks = await api.getPerks();
  return { props: { perks } };
}

export default Home;
