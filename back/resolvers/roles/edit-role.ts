import { eq } from "drizzle-orm";
import { roles } from "../../db/schemas";
import throwError, { getErrors, ErrorTypes } from "../../helpers/errors";
import { Context } from "../../types/context";
import * as yup from "yup";

const roleSchema = yup.object({
  name: yup.string().required("value is required"),
  description: yup.string().required("value is required"),
  type: yup.string().required("value is required"),
  id: yup.string().required("value is required"),
});

export const updateRole = async (parent: any, args: any, ctx: Context) => {
  // await sleep(8000);
  try {
    await roleSchema.validate({ ...args.role }, { abortEarly: false });
  } catch ({ inner }: any) {
    const roleErrors = getErrors(inner);
    throwError(
      "Some role fields are ommited",
      ErrorTypes.BAD_USER_INPUT,
      roleErrors
    );
  }

  try {
    const [currRole] = await ctx.db
      .update(roles)
      .set({ ...args.role })
      .where(eq(roles.id, args.role.id))
      .returning();
    return currRole;
  } catch (e) {
    throwError("trying to save role", ErrorTypes.INTERNAL_SERVER_ERROR, e);
  }
};
