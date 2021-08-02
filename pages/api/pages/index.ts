import { Client } from "@notionhq/client";
import type { NextApiRequest, NextApiResponse } from "next";

const notion = new Client({ auth: process.env.NOTION_KEY });

const defaultExport = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = req;
    switch (method) {
      case "POST":
        const { databaseId, properties } = req.body;
        const response = await notion.pages.create({
          parent: {
            database_id: databaseId,
          },
          properties,
        });
        return res.status(200).json(response);
      default:
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err) {
    console.log(err);
    throw new Error();
  }
};

export default defaultExport;
