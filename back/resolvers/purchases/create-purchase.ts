import { and, eq, sql } from "drizzle-orm";
import { purchases, items } from "../../db/schemas";
import throwError, { getErrors, ErrorTypes } from "../../helpers/errors";
import { Context } from "../../types/context";
import * as yup from "yup";

const inventorySchema = yup.object({
  hash: yup.string().required("value is required"),
  items: yup.array(
    yup.object().shape({
      priceBought: yup.string().required("value is required"),
      qtyBought: yup.number().required("value is required"),
      itemId: yup.string().required("value is required"),
      createdAt: yup.string().required("value is required"),
      userId: yup.string().required("value is required"),
    })
  ),
});

export const createPurchase = async (parent: any, args: any, ctx: Context) => {
  try {
    await inventorySchema.validate(
      { ...args.inventory },
      { abortEarly: false }
    );
  } catch ({ inner }: any) {
    const inventoryErrors = getErrors(inner);
    throwError(
      "Some fields are ommited",
      ErrorTypes.BAD_USER_INPUT,
      inventoryErrors
    );
  }

  try {
    return await ctx.db.transaction(async (tx) => {
      return await args.inventory.items.map(async (item: any) => {
        const values = {
          priceBought: item.priceBought,
          qtyBought: item.qtyBought,
          itemId: item.itemId,
          createdAt: item.createdAt,
          userId: item.userId,
        };

        const [ventory] = await tx
          .select()
          .from(purchases)
          .where(
            and(
              eq(purchases.itemId, values.itemId),
              eq(purchases.createdAt, values.createdAt)
            )
          );

        await tx
          .update(items)
          .set({
            qtyBought: sql`${items.qtyBought} + ${values.qtyBought} - ${
              ventory ? Number(ventory.qtyBought) : 0
            }`,
          })
          .where(eq(items.id, args.inventory.itemId));

        const [result] = await tx
          .insert(purchases)
          .values({ ...values })
          .onConflictDoUpdate({
            target: [purchases.itemId, purchases.createdAt],
            set: { deleted: false, qtyBought: values.qtyBought },
          })
          .returning();

        return result;
      });
    });
  } catch (e) {
    console.log(e);
    throwError("trying to save item", ErrorTypes.INTERNAL_SERVER_ERROR, e);
  }
};
