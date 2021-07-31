import React from "react";

import useUser from "./useUser";

function useBalance(): {
  balance: number;
  setBalance: (value: number) => void;
  isLoading: boolean;
} {
  const [balance, setBalance] = React.useState(0);
  const { data: user, isLoading } = useUser();

  React.useEffect(() => {
    if (user) {
      setBalance(user.properties.balance.number);
    }
  }, [user]);

  return { balance, setBalance, isLoading };
}

export default useBalance;
