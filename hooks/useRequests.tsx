import useSWR from "swr";
import axios from "axios";
import { useSession } from "next-auth/client";

import constants from "../lib/constants";

import { REQUESTS } from "../types";

const fetcher = (url: string, email: string) =>
  axios
    .post(url, {
      filter: {
        or: [
          {
            property: "email",
            text: {
              equals: email,
            },
          },
        ],
      },
    })
    .then((res) => res.data);

function useRequests(): {
  data: REQUESTS;
  isLoading: boolean;
  isError: boolean;
} {
  const [session] = useSession();
  const email = session?.user?.email;
  const { data, error } = useSWR(
    email
      ? [`/api/databases/${constants.NOTION_DATABASE_ID_REQUESTS}`, email]
      : null,
    fetcher
  );

  return {
    data: data || { results: [] },
    isLoading: !error && !data,
    isError: error,
  };
}

export default useRequests;
