import { eq } from "drizzle-orm";
import { purchases, items } from "../../db/schemas";
import { Context } from "../../types/context";
import throwError, { ErrorTypes } from "../../helpers/errors";

export const removePurchase = async (parent: any, args: any, ctx: Context) => {
  try {
    return await ctx.db.transaction(async (tx) => {
      await tx
        .update(items)
        .set({
          qtyBought: 0,
        })
        .where(eq(items.id, args.itemId));

      const [result] = await ctx.db
        .update(purchases)
        .set({
          priceBought: 0,
          qtyBought: 0,
          deleted: true,
        })
        .where(eq(purchases.id, args.id))
        .returning();
      return result;
    });
  } catch (e) {
    console.log(e);
    throwError("trying to save item", ErrorTypes.INTERNAL_SERVER_ERROR, e);
  }
};
