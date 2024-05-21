import { eq } from "drizzle-orm";
import { orders, recoveries } from "../../db/schemas";
import throwError, { getErrors, ErrorTypes } from "../../helpers/errors";
import { Context } from "../../types/context";
import * as yup from "yup";

const recoverSchema = yup.object({
  cash: yup.number().required("value is required"),
  txfa: yup.number().required("value is required"),
  pos: yup.number().required("value is required"),
  hash: yup.string().required("value is required"),
  userId: yup.string().required("value is required"),
  orderId: yup.string().required("guest name is required"),
});

export const recover = async (parent: any, args: any, ctx: Context) => {
  try {
    await recoverSchema.validate({ ...args.recovery }, { abortEarly: false });
  } catch ({ inner }: any) {
    const orderErrors = getErrors(inner);
    throwError(
      "Some fields are ommited",
      ErrorTypes.BAD_USER_INPUT,
      orderErrors
    );
  }

  try {
    const [isDuplicate] = await ctx.db
      .select()
      .from(recoveries)
      .where(eq(recoveries.hash, args.recovery.hash));

    if (isDuplicate) {
      throwError("duplicate recovery", ErrorTypes.ALREADY_EXISTS, [
        ["duplicate", "duplicate recovery"],
      ]);
    }

    const { pos, cash, txfa, orderId } = args.recovery;
    if (pos || cash || txfa) {
      await ctx.db.insert(recoveries).values({ ...args.recovery });
    }
    const [order] = await ctx.db
      .select()
      .from(orders)
      .where(eq(orders.id, orderId));
    return order;
  } catch (e) {
    throwError("trying to save item", ErrorTypes.INTERNAL_SERVER_ERROR, e);
  }
};
