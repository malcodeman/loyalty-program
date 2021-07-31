import { useColorModeValue, Flex, Text } from "@chakra-ui/react";

type props = {
  name: string;
  price: number;
};

function Achievement(props: props) {
  const { name, price, ...rest } = props;
  const bgColor = useColorModeValue("#eeeeee", "#131720");

  return (
    <Flex
      backgroundColor={bgColor}
      padding="4"
      borderRadius="md"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      {...rest}
    >
      <Text mb="2">{name}</Text>
      <Text fontWeight="bold">€{price}</Text>
    </Flex>
  );
}

export default Achievement;
