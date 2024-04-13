import { eq } from "drizzle-orm";
import { inventories, items } from "../../db/schemas";
import { Context } from "../../types/context";
import throwError, { ErrorTypes } from "../../helpers/errors";

export const removeInventory = async (parent: any, args: any, ctx: Context) => {
  try {
    return await ctx.db.transaction(async (tx) => {
      await tx
        .update(items)
        .set({
          qtyBought: 0,
        })
        .where(eq(items.id, args.itemId));

      const [result] = await ctx.db
        .update(inventories)
        .set({
          priceBought: 0,
          qtyBought: 0,
          deleted: true,
        })
        .where(eq(inventories.id, args.id))
        .returning();
      return result;
    });
  } catch (e) {
    console.log(e);
    throwError("trying to save item", ErrorTypes.INTERNAL_SERVER_ERROR, e);
  }
};
