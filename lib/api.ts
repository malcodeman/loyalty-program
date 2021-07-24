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

const defaultExport = {
  getPerks,
};

export default defaultExport;
