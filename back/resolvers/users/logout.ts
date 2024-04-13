import { and, desc, eq, sql } from "drizzle-orm";
import { Context } from "../../types/context";
import { sessions } from "../../db/schemas";

export const logoutUser = async (parent: any, args: any, ctx: Context) => {
  const session = await ctx.db.query.sessions
    .findFirst({
      where: and(
        eq(sessions.userId, sql.placeholder("userId")),
        eq(sessions.active, true)
      ),
      orderBy: [desc(sessions.createdAt)],
    })
    .prepare("logout")
    .execute({ userId: args.id });

  await ctx.db
    .update(sessions)
    .set({ active: false })
    .where(eq(sessions.userId, sql.placeholder("userId")))
    .prepare("logout")
    .execute({ userId: args.id });
};
