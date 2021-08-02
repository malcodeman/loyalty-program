import { Box, Heading, Text, Tag, Button, Flex } from "@chakra-ui/react";
import { Check } from "react-feather";
import { motion } from "framer-motion";

import useBoxShadow from "../hooks/useBoxShadow";

type props = {
  onClick: (id: string, price: number) => void;
  id: string;
  name: string;
  description: string;
  type: string;
  price: number;
  isDisabled: boolean;
  isBought: boolean;
  isLoading: boolean;
};

const boxVariants = {
  hover: { scale: 1.1 },
};

function Perk(props: props) {
  const {
    onClick,
    id,
    name,
    description,
    type,
    price,
    isDisabled,
    isBought,
    isLoading,
    ...rest
  } = props;
  const boxShadow = useBoxShadow();
  const isFixed = type === "Fixed";
  const isSpecial = type === "Special";
  const isClickable = !isFixed && !isDisabled && !isBought && !isLoading;

  function handleOnClick() {
    if (isClickable) {
      return onClick(id, price);
    }
  }

  function getPrice() {
    if (isFixed) {
      return "Free";
    }
    return `${price}€`;
  }

  function getStatus() {
    if (isFixed || isBought) {
      return (
        <Box
          position="absolute"
          left="-2"
          top="2"
          backgroundColor="#20c933"
          borderRadius="full"
          padding="1"
        >
          <Check color="#fff" size={16} />
        </Box>
      );
    }
    return <></>;
  }

  return (
    <Flex
      whileHover={isClickable ? "hover" : ""}
      as={motion.div}
      variants={boxVariants}
      boxShadow={boxShadow}
      padding="4"
      borderRadius="md"
      position="relative"
      flexDirection="column"
      justifyContent="space-between"
      {...rest}
    >
      <Box mb={isFixed ? 0 : 2}>
        {getStatus()}
        <Heading as="h4" size="md" mb="1">
          {name}
        </Heading>
        <Text fontWeight="bold" mb="1" fontSize="lg">
          {getPrice()}
        </Text>
        <Tag mb="2" colorScheme={isSpecial ? "red" : "gray"}>
          {type}
        </Tag>
        <Text>{description}</Text>
      </Box>
      {isFixed ? (
        <></>
      ) : (
        <Button
          onClick={handleOnClick}
          isDisabled={!isClickable}
          isLoading={isLoading}
          colorScheme={isBought ? "green" : "gray"}
          isFullWidth
        >
          {isBought ? "Already bought" : "Buy"}
        </Button>
      )}
    </Flex>
  );
}

export default Perk;
