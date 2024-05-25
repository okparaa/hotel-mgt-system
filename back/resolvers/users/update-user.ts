import * as yup from "yup";
import throwError, { ErrorTypes, getErrors } from "../../helpers/errors";
import { phoneExists, sleep, usernameExists } from "../../helpers";
import { eq, getTableColumns } from "drizzle-orm";
import { users } from "../../db/schemas";
import { Context } from "../../types/context";

const userSchema = yup.object({
  id: yup.string().required("value is required"),
  username: yup
    .string()
    .email("not a valid email")
    .required("value is required"),
  surname: yup.string().required("value is required"),
  firstname: yup.string().required("value is required"),
  lastname: yup.string().required("value is required"),
  password: yup.string().required("value is required"),
  password2: yup
    .string()
    .required("value is required")
    .oneOf([yup.ref("password")], "passwords must match"),
  address: yup.string().required("value is required"),
  phone: yup.string().required("value is required"),
});
const kodeSchema = yup.object({
  kode: yup.string().required("value is required"),
});

export const updateUser = async (parent: any, args: any, ctx: Context) => {
  try {
    await userSchema.validate(args.user, { abortEarly: false });
  } catch ({ inner }: any) {
    const userErrors = getErrors(inner);
    throwError(
      "all user fields are required",
      ErrorTypes.BAD_REQUEST,
      userErrors
    );
  }
  const phoneUser = await phoneExists(args.user.phone, ctx);

  const userName = await usernameExists(args.user.username, ctx);

  if (phoneUser.id && phoneUser.id !== args.user.id) {
    throwError("phone  exists", ErrorTypes.ALREADY_EXISTS, [
      ["phone", `phone already used`],
    ]);
  }
  if (userName.id && userName.id !== args.user.id) {
    throwError("username exists", ErrorTypes.ALREADY_EXISTS, [
      ["username", `username already used`],
    ]);
  }

  const { password, ...restCols } = getTableColumns(users);
  const [updatedUser] = await ctx.db
    .update(users)
    .set({ ...args.user })
    .returning(restCols);
  return updatedUser;
};

const userRouteSchema = yup.object({
  id: yup.string().required("value is required"),
  routeId: yup.string().required("value is required"),
});

export const assignRoute = async (parent: any, args: any, ctx: Context) => {
  try {
    await userRouteSchema.validate(args.user, { abortEarly: false });
  } catch ({ inner }: any) {
    const userErrors = getErrors(inner);
    throwError("all fields are required", ErrorTypes.BAD_REQUEST, userErrors);
  }

  const { password, ...restCols } = getTableColumns(users);
  const [updatedUser] = await ctx.db
    .update(users)
    .set({ routeId: args.user.routeId })
    .where(eq(users.id, args.user.id))
    .returning(restCols);
  return updatedUser;
};

const routeSlugsSchema = yup.object({
  id: yup.string().required("value is required"),
});

export const updateRouteSlugs = async (
  parent: any,
  args: any,
  ctx: Context
) => {
  try {
    await routeSlugsSchema.validate(args.user, { abortEarly: false });
  } catch ({ inner }: any) {
    const userErrors = getErrors(inner);
    throwError("all fields are required", ErrorTypes.BAD_REQUEST, userErrors);
  }

  const { password, ...restCols } = getTableColumns(users);
  const [updatedUser] = await ctx.db
    .update(users)
    .set({ routeSlugs: args.user.routeSlugs })
    .where(eq(users.id, args.user.id))
    .returning(restCols);

  return updatedUser;
};
