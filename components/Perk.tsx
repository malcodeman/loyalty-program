import { Box, Heading, Text, Tag, useColorModeValue } from "@chakra-ui/react";

type props = {
  onClick: (id: string, price: number) => void;
  id: string;
  name: string;
  description: string;
  type: string;
  price: number;
  isDisabled: boolean;
};

function Perk(props: props) {
  const { onClick, id, name, description, type, price, isDisabled, ...rest } =
    props;
  const bgColor = useColorModeValue("#fafafa", "#18191a");
  const isFixed = type === "Fixed";

  function handleOnClick() {
    if (!isFixed && !isDisabled) {
      onClick(id, price);
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
      backgroundColor={isDisabled ? "rgba(0,0,0,0.1)" : bgColor}
      padding="4"
      cursor={isFixed || isDisabled ? "normal" : "pointer"}
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
