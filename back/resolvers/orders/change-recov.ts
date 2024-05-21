import { eq } from "drizzle-orm";
import { orders, recoveries, users } from "../../db/schemas";
import throwError, { getErrors, ErrorTypes } from "../../helpers/errors";
import { Context } from "../../types/context";
import * as yup from "yup";

const changeRecovSchema = yup.object({
  id: yup.string().required("value is required"),
  pos: yup.number().required("po id is required"),
  cash: yup.number().required("debit id is required"),
  txfa: yup.number().required("debit id is required"),
});

export const changeOrderRecov = async (
  parent: any,
  args: any,
  ctx: Context
) => {
  try {
    await changeRecovSchema.validate({ ...args.recov }, { abortEarly: false });
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
        pos: args.recov.pos,
        txfa: args.recov.txfa,
        cash: args.recov.cash,
      })
      .where(eq(recoveries.id, args.recov.id))
      .returning();

    const [order] = await ctx.db
      .select()
      .from(orders)
      .where(eq(orders.id, recovery.orderId));
    return order;
  } catch (e) {
    throwError("trying to save debit", ErrorTypes.INTERNAL_SERVER_ERROR, e);
  }
};
