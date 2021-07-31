import useSWR from "swr";
import axios from "axios";
import { useSession } from "next-auth/client";

import constants from "../lib/constants";
import { USER } from "../types";

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
    .then((res) => res.data.results[0]);

function useUser(): {
  data: USER | null;
  isLoading: boolean;
  isError: boolean;
} {
  const [session] = useSession();
  const email = session?.user?.email;
  const { data, error } = useSWR(
    email
      ? [`/api/database/${constants.NOTION_DATABASE_ID_USERS}`, email]
      : null,
    fetcher
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useUser;
