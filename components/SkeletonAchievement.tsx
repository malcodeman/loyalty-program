import { Box, SkeletonText } from "@chakra-ui/react";

import useBoxShadow from "../hooks/useBoxShadow";

function SkeletonAchievement() {
  const boxShadow = useBoxShadow();

  return (
    <Box boxShadow={boxShadow} padding="4" borderRadius="md">
      <SkeletonText noOfLines={2} mb="4" />
      <SkeletonText noOfLines={1} width="30px" />
    </Box>
  );
}

export default SkeletonAchievement;
