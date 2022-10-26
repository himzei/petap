import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body;
  const payload = email && { email };
  const token = await client.token.create({
    data: {
      payload: "1234",
      user: {
        connectOrCreate: {
          where: {
            ...payload,
          },
          create: {
            name: "anonymous",
            ...payload,
          },
        },
      },
    },
  });
  console.log(token);

  return res.status(200).end();
}

export default withHandler("POST", handler);
