import { Box, Heading, Text, Tag, useColorModeValue } from "@chakra-ui/react";

type props = {
  onClick: (price: number) => void;
  name: string;
  description: string;
  type: string;
  price: number;
};

function Perk(props: props) {
  const { onClick, name, description, type, price, ...rest } = props;
  const bgColor = useColorModeValue("#fafafa", "#18191a");
  const isFixed = type === "Fixed";

  function handleOnClick() {
    if (!isFixed) {
      onClick(price);
    }
  }

  function getHeading() {
    if (isFixed) {
      return name;
    }
    return `${name} - ${price} coins`;
  }

  return (
    <Box
      onClick={handleOnClick}
      backgroundColor={bgColor}
      padding="4"
      cursor={isFixed ? "normal" : "pointer"}
      borderRadius="md"
      {...rest}
    >
      <Heading as="h4" size="md" mb="1">
        {getHeading()}
      </Heading>
      <Tag mb="2">{type}</Tag>
      <Text>{description}</Text>
    </Box>
  );
}

export default Perk;
