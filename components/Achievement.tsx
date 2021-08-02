import { Flex, Text } from "@chakra-ui/react";

import useBoxShadow from "../hooks/useBoxShadow";

type props = {
  name: string;
  price: number;
};

function Achievement(props: props) {
  const { name, price, ...rest } = props;
  const boxShadow = useBoxShadow();

  return (
    <Flex
      boxShadow={boxShadow}
      padding="4"
      borderRadius="md"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      {...rest}
    >
      <Text mb="2">{name}</Text>
      <Text fontWeight="bold">{price}€</Text>
    </Flex>
  );
}

export default Achievement;
