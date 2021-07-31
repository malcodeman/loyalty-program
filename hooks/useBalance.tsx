import React from "react";

import useUser from "./useUser";

function useBalance(): [number, (value: number) => void] {
  const [balance, setBalance] = React.useState(0);
  const { data: user } = useUser();

  React.useEffect(() => {
    if (user) {
      setBalance(user.properties.balance.number);
    }
  }, [user]);

  return [balance, setBalance];
}

export default useBalance;
