import { Text, SkeletonText, Flex } from "@chakra-ui/react";
import * as R from "ramda";

import { USERS } from "../types";
import utils from "../lib/utils";

type props = {
  users: USERS;
  isLoading: boolean;
};

const toIndex = 8;

function EmployeesByBalanceCard(props: props) {
  const { users, isLoading } = props;
  const sortedUsersByBalance = R.sort((a, b) => {
    const balanceA = a.properties.balance.number;
    const balanceB = b.properties.balance.number;
    return balanceB - balanceA;
  }, R.slice(0, toIndex, users.results));

  function getUsername(email: string) {
    return R.split("@", email)[0];
  }

  return (
    <>
      <Text mb="2">Employees by coin balance</Text>
      {isLoading ? (
        <SkeletonText noOfLines={toIndex} />
      ) : (
        R.map((item) => {
          const email = item.properties.email.title[0].plain_text;
          const balance = item.properties.balance.number;
          return (
            <Flex key={email} justifyContent="space-between">
              <Text>{getUsername(email)}</Text>
              <Text as="span" fontWeight="bold">
                {utils.formatNumber(balance)}€
              </Text>
            </Flex>
          );
        }, sortedUsersByBalance)
      )}
    </>
  );
}

export default EmployeesByBalanceCard;
