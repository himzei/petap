import bcrypt from "bcrypt";
import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, email, password } = req.body;
  let user;
  user = await client.user.upsert({
    where: {
      email,
    },
    create: {
      name: "Anonymous",
      username,
      email,
      password: await bcrypt.hash(password, 5),
    },
    update: {},
  });
  console.log(user);
  return res.status(200).end();
}

export default withHandler({ methods: ["POST"], handler, isPrivate: false });
