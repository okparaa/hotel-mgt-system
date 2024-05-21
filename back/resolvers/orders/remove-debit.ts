import { eq } from "drizzle-orm";
import { orders, recoveries, users } from "../../db/schemas";
import throwError, { getErrors, ErrorTypes } from "../../helpers/errors";
import { Context } from "../../types/context";
import * as yup from "yup";

const removeSchema = yup.object({
  debitId: yup.string().required("value is required"),
});

export const removeDebit = async (parent: any, args: any, ctx: Context) => {
  try {
    await removeSchema.validate({ ...args }, { abortEarly: false });
  } catch ({ inner }: any) {
    const orderErrors = getErrors(inner);
    throwError(
      "Some fields are ommited",
      ErrorTypes.BAD_USER_INPUT,
      orderErrors
    );
  }

  try {
    const [staff] = await ctx.db
      .update(recoveries)
      .set({ deleted: true })
      .where(eq(recoveries.id, args.debitId))
      .returning();

    const [user] = await ctx.db
      .select()
      .from(users)
      .where(eq(users.id, staff.staffId));

    return user;
  } catch (e) {
    throwError("trying to save debit", ErrorTypes.INTERNAL_SERVER_ERROR, e);
  }
};
