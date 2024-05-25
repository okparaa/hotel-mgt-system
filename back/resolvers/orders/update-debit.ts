import { eq } from "drizzle-orm";
import { orders, recoveries, users } from "../../db/schemas";
import throwError, { getErrors, ErrorTypes } from "../../helpers/errors";
import { Context } from "../../types/context";
import * as yup from "yup";

const changeSchema = yup.object({
  debitAmt: yup.number().required("value is required"),
  debitId: yup.string().required("debit id is required"),
  debitAim: yup.string().required("aim for the debit is required"),
  debitedAt: yup.string().required("debited at is required"),
});

export const updateDebit = async (parent: any, args: any, ctx: Context) => {
  try {
    await changeSchema.validate({ ...args.debit }, { abortEarly: false });
  } catch ({ inner }: any) {
    const debitErrors = getErrors(inner);
    throwError(
      "Some fields are ommited",
      ErrorTypes.BAD_USER_INPUT,
      debitErrors
    );
  }

  try {
    const [recovery] = await ctx.db
      .update(recoveries)
      .set({
        debitAmt: args.debit.debitAmt,
        debitAim: args.debit.debitAim,
        debitedAt: args.debit.debitedAt,
      })
      .where(eq(recoveries.id, args.debit.debitId))
      .returning();

    const [user] = await ctx.db
      .select()
      .from(users)
      .where(eq(users.id, recovery.staffId));
    return user;
  } catch (e) {
    throwError("trying to save debit", ErrorTypes.INTERNAL_SERVER_ERROR, e);
  }
};
