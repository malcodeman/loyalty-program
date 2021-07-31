import {
  useColorModeValue,
  Box,
  SkeletonCircle,
  SkeletonText,
  Skeleton,
} from "@chakra-ui/react";

function SkeletonPerk() {
  const bgColor = useColorModeValue("#eeeeee", "#131720");

  return (
    <Box
      backgroundColor={bgColor}
      padding="4"
      borderRadius="md"
      position="relative"
    >
      <SkeletonCircle
        height="24px"
        width="24px"
        position="absolute"
        left="-2"
        top="2"
      />
      <SkeletonText noOfLines={2} size="md" mb="1" borderRadius="md" />
      <Skeleton height="24px" width="60px" mb="2" />
      <SkeletonText noOfLines={3} spacing={4} />
    </Box>
  );
}

export default SkeletonPerk;
