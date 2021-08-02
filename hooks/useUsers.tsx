import useSWR from "swr";
import axios from "axios";

import constants from "../lib/constants";
import { USERS } from "../types";

const fetcher = (url: string) => axios.post(url).then((res) => res.data);

function useUsers(): {
  data: USERS;
  isLoading: boolean;
  isError: boolean;
} {
  const { data, error } = useSWR(
    `/api/databases/${constants.NOTION_DATABASE_ID_USERS}`,
    fetcher
  );
  return {
    data: data || { results: [] },
    isLoading: !error && !data,
    isError: error,
  };
}

export default useUsers;
