import {
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tag,
  Text,
  Progress,
} from "@chakra-ui/react";
import * as R from "ramda";

import utils from "../lib/utils";

import { REQUESTS } from "../types";

type props = {
  data: REQUESTS;
  isLoading: boolean;
};

function RequestsTable(props: props) {
  const { data, isLoading } = props;
  const body = R.map((item) => {
    const name = item.properties.perk_name.rollup.array[0].title[0].plain_text;
    const status = item.properties.status.select.name;
    const award = Number(item.properties.award.rollup.array[0].number);
    return {
      id: item.id,
      name,
      status,
      award,
    };
  }, data.results);

  function getTagColorScheme(status: string) {
    switch (status) {
      case "Pending":
        return "yellow";
      case "Approved":
        return "green";
      case "Declined":
        return "red";
      default:
        return "gray";
    }
  }

  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Status</Th>
            <Th>Award</Th>
          </Tr>
        </Thead>
        <Tbody>
          {R.map((item) => {
            const tagColorScheme = getTagColorScheme(item.status);
            return (
              <Tr key={item.id}>
                <Td>{item.name}</Td>
                <Td>
                  <Tag colorScheme={tagColorScheme}>{item.status}</Tag>
                </Td>
                <Td>
                  <Text as="span" fontWeight="bold">
                    {utils.formatNumber(item.award)}€
                  </Text>
                </Td>
              </Tr>
            );
          }, body)}
        </Tbody>
        <TableCaption>Your requests</TableCaption>
      </Table>
      {isLoading ? (
        <Progress isIndeterminate borderRadius="md" marginY="2" />
      ) : (
        <></>
      )}
    </>
  );
}

export default RequestsTable;
