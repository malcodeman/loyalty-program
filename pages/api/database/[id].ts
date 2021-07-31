import { Client } from "@notionhq/client";
import type { NextApiRequest, NextApiResponse } from "next";

const notion = new Client({ auth: process.env.NOTION_KEY });

const defaultExport = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const { filter } = req.body;
    const databaseId = Array.isArray(id) ? id[0] : id;
    const response = await notion.databases.query({
      database_id: databaseId,
      filter,
    });
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
};

export default defaultExport;
