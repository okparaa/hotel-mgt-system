import { eq } from "drizzle-orm";
import { orders, recoveries, users } from "../../db/schemas";
import throwError, { getErrors, ErrorTypes } from "../../helpers/errors";
import { Context } from "../../types/context";
import * as yup from "yup";

const changeSchema = yup.object({
  id: yup.string().required("value is required"),
});

export const removeOrderRecov = async (
  parent: any,
  args: any,
  ctx: Context
) => {
  try {
    await changeSchema.validate({ ...args }, { abortEarly: false });
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
        deleted: true,
      })
      .where(eq(recoveries.id, args.id))
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
