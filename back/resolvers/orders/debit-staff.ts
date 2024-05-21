import { eq } from "drizzle-orm";
import { recoveries, users } from "../../db/schemas";
import throwError, { getErrors, ErrorTypes } from "../../helpers/errors";
import { Context } from "../../types/context";
import * as yup from "yup";

const debitSchema = yup.object({
  debitAmt: yup.number().required("value is required"),
  staffId: yup.string().required("value is required"),
  orderId: yup.string().required("order id is required"),
});

export const debitStaff = async (parent: any, args: any, ctx: Context) => {
  try {
    await debitSchema.validate({ ...args.debit }, { abortEarly: false });
  } catch ({ inner }: any) {
    const orderErrors = getErrors(inner);
    throwError(
      "Some fields are ommited",
      ErrorTypes.BAD_USER_INPUT,
      orderErrors
    );
  }

  try {
    await ctx.db
      .insert(recoveries)
      .values({ ...args.debit })
      .returning();

    const [user] = await ctx.db
      .select()
      .from(users)
      .where(eq(users.id, args.debit.staffId));
    return user;
  } catch (e) {
    console.log(e);
    throwError("trying to save debit", ErrorTypes.INTERNAL_SERVER_ERROR, e);
  }
};
