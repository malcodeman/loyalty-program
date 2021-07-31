import { useColorModeValue, Box, SkeletonText } from "@chakra-ui/react";

function SkeletonAchievement() {
  const bgColor = useColorModeValue("#eeeeee", "#131720");

  return (
    <Box backgroundColor={bgColor} padding="4" borderRadius="md">
      <SkeletonText noOfLines={2} mb="4" />
      <SkeletonText noOfLines={1} width="30px" />
    </Box>
  );
}

export default SkeletonAchievement;
