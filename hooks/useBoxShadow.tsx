import { useColorModeValue } from "@chakra-ui/react";

function useBoxShadow() {
  const boxShadow = useColorModeValue(
    "0 0 0 2px hsla(0, 0%, 0%, 0.05)",
    "0 0 0 2px hsla(0, 0%, 100%, 0.05)"
  );
  return boxShadow;
}

export default useBoxShadow;
