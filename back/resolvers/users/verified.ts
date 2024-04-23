import { and, desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Context } from "../../types/context";
import { sessions, users } from "../../db/schemas";
import { getUser } from "../../helpers";
import throwError, { ErrorTypes } from "../../helpers/errors";
import jwt from "jsonwebtoken";

export const verifiedUser = async (parent: any, args: any, ctx: Context) => {
  const identity = (await getUser(ctx.req)).getIdentity();
  if (!identity) {
    throwError("no user found", ErrorTypes.NOT_FOUND, [
      ["kode", "invalid access"],
    ]);
  }
  const [session] = await ctx.db
    .select()
    .from(sessions)
    .where(
      and(
        eq(sessions.kode, args.kode),
        eq(sessions.userId, identity.id),
        eq(sessions.active, true)
      )
    );

  if (!session) {
    throwError("no session found", ErrorTypes.NOT_FOUND, [
      ["kode", "invalid access code"],
    ]);
  }

  const { password, ...restCols } = getTableColumns(users);
  const [user] = await ctx.db
    .select(restCols)
    .from(users)
    .where(eq(users.id, identity.id));

  const token = jwt.sign(
    {
      id: user.id,
      auth: "ok",
      vfy: "ok",
    },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "24h" }
  );

  return { ...user, token };
};
