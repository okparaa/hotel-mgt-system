import { eq, sql } from "drizzle-orm";
import { items } from "../../db/schemas";
import { skuExists } from "../../helpers";
import throwError, { getErrors, ErrorTypes } from "../../helpers/errors";
import { Context } from "../../types/context";
import * as yup from "yup";

const itemSchema = yup.object({
  name: yup.string().required("value is required"),
  description: yup.string().required("value is required"),
  type: yup.string().required("value is required"),
  sku: yup.string().required("value is required"),
  id: yup.string().required("value is required"),
});
export const updateItem = async (parent: any, args: any, ctx: Context) => {
  try {
    await itemSchema.validate({ ...args.item }, { abortEarly: false });
  } catch ({ inner }: any) {
    const itemErrors = getErrors(inner);
    throwError("Some fields are omited", ErrorTypes.BAD_USER_INPUT, itemErrors);
  }
  const skuItem = await skuExists(args.item.sku, ctx);
  if (!skuItem || !skuItem.id) {
    throwError("sku exists", ErrorTypes.ALREADY_EXISTS, [
      ["sku", `item does not exist`],
    ]);
  }

  const [data] = await ctx.db
    .update(items)
    .set({ ...args.item })
    .where(eq(items.id, args.item.id))
    .returning();
  return data;
};
