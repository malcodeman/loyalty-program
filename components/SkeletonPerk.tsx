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
      <SkeletonText noOfLines={1} mb="2" width="60%" />
      <SkeletonText noOfLines={1} mb="2" width="30px" />
      <Skeleton height="24px" width="60px" mb="4" borderRadius="md" />
      <SkeletonText noOfLines={3} spacing={4} />
    </Box>
  );
}

export default SkeletonPerk;
