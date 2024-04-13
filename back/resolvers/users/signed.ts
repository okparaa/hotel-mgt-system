import * as yup from "yup";
import throwError, { ErrorTypes, getErrors } from "../../helpers/errors";
import { and, eq } from "drizzle-orm";
import { sessions, users } from "../../db/schemas";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getKey } from "../../helpers";
import { Context } from "../../types/context";

const loginSchema = yup.object({
  username: yup
    .string()
    .email("not a valid email")
    .required("value is required"),
  password: yup.string().required("value is required"),
});

export const signedUser = async (parent: any, args: any, ctx: Context) => {
  try {
    await loginSchema.validate(args.user, { abortEarly: false });
  } catch ({ inner }: any) {
    const userErrors = getErrors(inner);
    return throwError(
      "all fields are required",
      ErrorTypes.BAD_REQUEST,
      userErrors
    );
  }
  const [user] = await ctx.db
    .select()
    .from(users)
    .where(eq(users.username, args.user.username));

  if (!user) {
    return throwError("all fields are required", ErrorTypes.BAD_USER_INPUT, [
      ["username", "wrong credential"],
      ["password", "wrong credential"],
    ]);
  }

  const isValidPassword = await bcrypt.compare(
    args.user.password,
    user.password || ""
  );

  if (!isValidPassword) {
    return throwError("all fields are required", ErrorTypes.BAD_USER_INPUT, [
      ["username", "wrong username"],
      ["password", "or wrong password"],
    ]);
  }

  const accessToken = jwt.sign(
    {
      id: user.id,
      auth: "in",
      ver: "no",
    },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "24h" }
  );

  const kode = getKey().toUpperCase();

  let session: any;
  try {
    const [oldSess] = await ctx.db
      .select()
      .from(sessions)
      .where(and(eq(sessions.userId, user.id), eq(sessions.active, true)));

    if (oldSess) {
      const token: any = jwt.decode(oldSess.accessToken);
      const now = parseInt(+new Date() / 1000 + "");
      const isExpired = now - token.exp > 0;

      if (isExpired) {
        [session] = await ctx.db.transaction(async (tx) => {
          await tx
            .update(sessions)
            .set({ active: false, accessToken: "", refreshToken: "" })
            .where(
              and(eq(sessions.userId, user.id), eq(sessions.active, true))
            );

          return await tx
            .insert(sessions)
            .values({
              accessToken,
              refreshToken: accessToken,
              userId: user.id,
              active: true,
              kode,
            })
            .returning();
        });
      } else {
        [session] = await ctx.db
          .select()
          .from(sessions)
          .where(and(eq(sessions.userId, user.id), eq(sessions.active, true)));
      }
    } else {
      [session] = await ctx.db
        .insert(sessions)
        .values({
          accessToken,
          refreshToken: accessToken,
          userId: user.id,
          active: true,
          kode,
        })
        .returning();
    }
    return session;
  } catch (error) {
    throwError(
      "could not update session",
      ErrorTypes.DATABASE_UPDATE_ERROR,
      error
    );
  }
};
