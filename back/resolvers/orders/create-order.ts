import { orders } from "../../db/schemas";
import throwError, { getErrors, ErrorTypes } from "../../helpers/errors";
import { Context } from "../../types/context";
import * as yup from "yup";

const orderSchema = yup.object({});

export const createOrder = async (parent: any, args: any, ctx: Context) => {
  try {
    await orderSchema.validate({ ...args.order }, { abortEarly: false });
  } catch ({ inner }: any) {
    const orderErrors = getErrors(inner);
    throwError(
      "Some fields are ommited",
      ErrorTypes.BAD_USER_INPUT,
      orderErrors
    );
  }

  try {
    const [data] = await ctx.db
      .insert(orders)
      .values({ ...args.order })
      .returning();
    return data;
  } catch (e) {
    console.log(e);
    throwError("trying to save item", ErrorTypes.INTERNAL_SERVER_ERROR, e);
  }
};
