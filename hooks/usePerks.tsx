import useSWR from "swr";
import axios from "axios";

import constants from "../lib/constants";
import { PERKS } from "../types";

const fetcher = (url: string) => axios.post(url).then((res) => res.data);

function usePerks(): {
  data: PERKS;
  isLoading: boolean;
  isError: boolean;
} {
  const { data, error } = useSWR(
    `/api/databases/${constants.NOTION_DATABASE_ID_PERKS}`,
    fetcher
  );

  return {
    data: data || { results: [] },
    isLoading: !error && !data,
    isError: error,
  };
}

export default usePerks;
