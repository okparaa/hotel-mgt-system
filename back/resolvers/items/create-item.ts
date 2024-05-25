import { items } from "../../db/schemas";
import { itemColumns } from "../../helpers";
import throwError, { getErrors, ErrorTypes } from "../../helpers/errors";
import { Context } from "../../types/context";
import * as yup from "yup";

const itemSchema = yup.object({
  name: yup.string().required("value is required"),
  description: yup.string().required("value is required"),
  type: yup.string().required("value is required"),
});

export const createItem = async (parent: any, args: any, ctx: Context) => {
  // await sleep(8000);
  try {
    await itemSchema.validate({ ...args.item }, { abortEarly: false });
  } catch ({ inner }: any) {
    const itemErrors = getErrors(inner);
    throwError("Some fields are omited", ErrorTypes.BAD_USER_INPUT, itemErrors);
  }

  try {
    const [data] = await ctx.db
      .insert(items)
      .values({ ...args.item, price: Number(args.item.price) })
      .returning(itemColumns);
    return data;
  } catch (e) {
    throwError("trying to save item", ErrorTypes.INTERNAL_SERVER_ERROR, e);
  }
};
