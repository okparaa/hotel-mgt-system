import { orders } from "../../db/schemas";
import throwError, { getErrors, ErrorTypes } from "../../helpers/errors";
import { Context } from "../../types/context";
import * as yup from "yup";

const orderSchema = yup.object({
  cash: yup.number().required("value is required"),
  txfa: yup.number().required("value is required"),
  pos: yup.number().required("value is required"),
  hash: yup.number().required("value is required"),
  userId: yup.string().required("value is required"),
  orderId: yup.string().required("guest name is required"),
});

export const recover = async (parent: any, args: any, ctx: Context) => {
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
