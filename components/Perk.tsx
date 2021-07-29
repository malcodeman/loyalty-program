import {
  useColorModeValue,
  Box,
  Heading,
  Text,
  Tag,
  Spinner,
} from "@chakra-ui/react";
import { Check } from "react-feather";
import { motion } from "framer-motion";

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
  const bgColor = useColorModeValue("#eeeeee", "#131720");
  const disabledBgColor = useColorModeValue("#f6f6f6", "#141414");
  const positiveBgColor = useColorModeValue("#e6f2ed", "#10462d");
  const isFixed = type === "Fixed";
  const isClickable = !isFixed && !isDisabled && !isBought && !isLoading;

  function handleOnClick() {
    if (isClickable) {
      return onClick(id, price);
    }
  }

  function getHeading() {
    if (isFixed) {
      return name;
    }
    return `${name} - ${price} coins`;
  }

  function getStatus() {
    if (isLoading) {
      return <Spinner position="absolute" left="-2" top="2" />;
    } else if (isFixed || isBought) {
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

  function getCursor() {
    if (isDisabled && !isBought) {
      return "not-allowed";
    } else if (isLoading) {
      return "progress";
    } else if (isFixed || isBought) {
      return "normal";
    }
    return "pointer";
  }

  function getBackgroundColor() {
    if (isDisabled && !isBought) {
      return disabledBgColor;
    } else if (isFixed || isBought) {
      return positiveBgColor;
    }
    return bgColor;
  }

  return (
    <Box
      onClick={handleOnClick}
      backgroundColor={getBackgroundColor()}
      cursor={getCursor()}
      padding="4"
      borderRadius="md"
      position="relative"
      whileHover={isClickable ? "hover" : ""}
      as={motion.div}
      variants={boxVariants}
      {...rest}
    >
      {getStatus()}
      <Heading as="h4" size="md" mb="1">
        {getHeading()}
      </Heading>
      <Tag mb="2">{type}</Tag>
      <Text>{description}</Text>
    </Box>
  );
}

export default Perk;
