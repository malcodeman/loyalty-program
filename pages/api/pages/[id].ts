import { Client } from "@notionhq/client";
import type { NextApiRequest, NextApiResponse } from "next";

const notion = new Client({ auth: process.env.NOTION_KEY });

const defaultExport = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const { properties } = req.body;
    const pageId = Array.isArray(id) ? id[0] : id;
    const response = await notion.pages.update({
      page_id: pageId,
      properties,
      archived: false,
    });
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
};

export default defaultExport;
