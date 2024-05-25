import * as yup from "yup";
import bcrypt from "bcrypt";
import throwError, { ErrorTypes, getErrors } from "../../helpers/errors";
import { phoneExists, usernameExists } from "../../helpers";
import { getTableColumns } from "drizzle-orm";
import { users } from "../../db/schemas";
import { Context } from "../../types/context";

const userSchema = yup.object({
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

export const createUser = async (parent: any, args: any, ctx: Context) => {
  try {
    await userSchema.validate(args.user, { abortEarly: false });
  } catch ({ inner }: any) {
    const userErrors = getErrors(inner);
    throwError("all fields are required", ErrorTypes.BAD_REQUEST, userErrors);
  }
  const phoneUser = await phoneExists(args.user.phone, ctx);

  const userName = await usernameExists(args.user.username, ctx);

  if (phoneUser && userName && phoneUser.id && userName.id) {
    throwError("phone exists", ErrorTypes.ALREADY_EXISTS, [
      ["phone", `phone already used`],
      ["username", `username already used`],
    ]);
  }
  if (phoneUser && phoneUser.id) {
    throwError("phone exists", ErrorTypes.ALREADY_EXISTS, [
      ["phone", `phone already used`],
    ]);
  }
  if (userName && userName.id) {
    throwError("username exists", ErrorTypes.ALREADY_EXISTS, [
      ["username", `username already used`],
    ]);
  }
  const hashedPassword = await bcrypt.hash(
    args.user.password,
    Number(process.env.BCRYPT_COST) || 5
  );

  delete args.user.password2;

  const { password, ...restCols } = getTableColumns(users);
  const [regstdUser] = await ctx.db
    .insert(users)
    .values({ ...args.user, password: hashedPassword })
    .returning(restCols);

  return regstdUser;
};
