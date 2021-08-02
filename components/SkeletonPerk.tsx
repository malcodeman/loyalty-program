import { Box, SkeletonCircle, SkeletonText, Skeleton } from "@chakra-ui/react";

import useBoxShadow from "../hooks/useBoxShadow";

function SkeletonPerk() {
  const boxShadow = useBoxShadow();

  return (
    <Box
      boxShadow={boxShadow}
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
      <SkeletonText noOfLines={3} mb="6" />
      <Skeleton height="40px" width="100%" borderRadius="md" />
    </Box>
  );
}

export default SkeletonPerk;
