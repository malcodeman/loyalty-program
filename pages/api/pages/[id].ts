import { Client } from "@notionhq/client";
import type { NextApiRequest, NextApiResponse } from "next";

import constants from "../../../lib/constants";

const notion = new Client({ auth: process.env.NOTION_KEY });

const defaultExport = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!constants.NOTION_DATABASE_ID_PERKS) {
      throw Error("Notion database id missing");
    }
    const { id } = req.query;
    const { properties } = req.body;
    const response = await notion.pages.update({
      page_id: id,
      properties,
    });
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
};

export default defaultExport;
