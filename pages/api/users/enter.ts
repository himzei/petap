import bcrypt from "bcrypt";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email, password } = req.body;
  const exist = await client.user.findUnique({
    where: {
      email,
    },
  });
  if (!exist) return res.status(400).end();
  const ok = await bcrypt.compare(password, exist.password);
  if (!ok) {
    return res
      .status(401)
      .json({ ok: false, error: "패스워드/비밀번호가 다릅니다" });
  }

  req.session.user = {
    id: exist.id,
  };
  const result = await req.session.save();
  console.log(result);

  res.json({
    ok: true,
  });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
    isPrivate: false,
  })
);
