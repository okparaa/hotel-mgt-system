import { and, eq, sql } from "drizzle-orm";
import { inventories, items } from "../../db/schemas";
import throwError, { getErrors, ErrorTypes } from "../../helpers/errors";
import { Context } from "../../types/context";
import * as yup from "yup";

const inventorySchema = yup.object({
  priceBought: yup.string().required("value is required"),
  qtyBought: yup.string().required("value is required"),
  id: yup.string().required("value is required"),
  itemId: yup.string().required("value is required"),
  createdAt: yup.string().required("value is required"),
});
export const editInventory = async (parent: any, args: any, ctx: Context) => {
  try {
    await inventorySchema.validate(
      { ...args.inventory },
      { abortEarly: false }
    );
  } catch ({ inner }: any) {
    const inventoryErrors = getErrors(inner);
    throwError(
      "Some fields are omited",
      ErrorTypes.BAD_USER_INPUT,
      inventoryErrors
    );
  }

  try {
    return await ctx.db.transaction(async (tx) => {
      const [ventory] = await tx
        .select()
        .from(inventories)
        .where(
          and(
            eq(inventories.itemId, args.inventory.itemId),
            eq(inventories.createdAt, args.inventory.createdAt)
          )
        );

      await tx
        .update(items)
        .set({
          qtyBought: sql`${args.inventory.qtyBought} + ${items.qtyBought} - ${ventory.qtyBought}`,
        })
        .where(eq(items.id, args.inventory.itemId));

      const [result] = await ctx.db
        .update(inventories)
        .set({
          priceBought: args.inventory.priceBought,
          qtyBought: args.inventory.qtyBought,
        })
        .where(eq(inventories.id, args.inventory.id))
        .returning();
      return result;
    });
  } catch (e) {
    console.log(e);
    throwError("trying to save item", ErrorTypes.INTERNAL_SERVER_ERROR, e);
  }
};
