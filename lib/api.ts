import { Client } from "@notionhq/client";

import constants from "./constants";

const notion = new Client({ auth: process.env.NOTION_KEY });

async function getPerks() {
  try {
    if (!constants.NOTION_DATABASE_ID_PERKS) {
      throw Error("Notion database id missing");
    }
    const response = await notion.databases.query({
      database_id: constants.NOTION_DATABASE_ID_PERKS,
    });
    return response;
  } catch (err) {
    console.log(err);
  }
}

async function getUser(email: string) {
  try {
    if (!constants.NOTION_DATABASE_ID_USERS) {
      throw Error("Notion database id missing");
    }
    const response = await notion.databases.query({
      database_id: constants.NOTION_DATABASE_ID_USERS,
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
    });
    return response.results[0];
  } catch (err) {
    console.log(err);
  }
}

const defaultExport = {
  getPerks,
  getUser,
};

export default defaultExport;
