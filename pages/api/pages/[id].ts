import { Client } from "@notionhq/client";
import type { NextApiRequest, NextApiResponse } from "next";

const notion = new Client({ auth: process.env.NOTION_KEY });

const defaultExport = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = req;
    switch (method) {
      case "PATCH":
        const { id } = req.query;
        const { properties } = req.body;
        const pageId = Array.isArray(id) ? id[0] : id;
        const response = await notion.pages.update({
          page_id: pageId,
          properties,
          archived: false,
        });
        return res.status(200).json(response);
      default:
        res.setHeader("Allow", ["PATCH"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err) {
    console.log(err);
    throw new Error();
  }
};

export default defaultExport;
