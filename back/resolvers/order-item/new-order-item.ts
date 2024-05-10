import { eq, sql } from "drizzle-orm";
import { items, orders, ordersItems } from "../../db/schemas";
import throwError, { getErrors, ErrorTypes } from "../../helpers/errors";
import { Context } from "../../types/context";
import * as yup from "yup";

const itemSchema = yup.object({
  userId: yup.string().required("value is required"),
  qtySold: yup.string().required("value is required"),
  itemId: yup.string().required("value is required"),
  priceSold: yup.string().required("value is required"),
});
export const newOrderItems = async (parent: any, args: any, ctx: Context) => {
  // await sleep(8000);

  try {
    await args.orderItems.map(async (order: any) => {
      await itemSchema.validate({ ...order }, { abortEarly: false });
    });
  } catch ({ inner }: any) {
    const itemErrors = getErrors(inner);
    throwError("Some fields are omited", ErrorTypes.BAD_USER_INPUT, itemErrors);
  }

  try {
    const userId = args.orderItems[0].userId;
    const hash = args.orderItems[0].hash;

    const amountSold = args.orderItems.reduce((acc: any, item: any) => {
      return acc + Number(item.priceSold) * Number(item.qtySold);
    }, 0);

    return await ctx.db.transaction(async (tx) => {
      const [isDuplicate] = await tx
        .select()
        .from(orders)
        .where(eq(orders.hash, hash));

      if (isDuplicate) {
        throwError("duplicate order", ErrorTypes.ALREADY_EXISTS, [
          ["duplicate", "duplicate sale"],
        ]);
      }

      const [order] = await tx
        .insert(orders)
        .values({ userId, amount: amountSold, hash })
        .returning();

      const order_items_values = args.orderItems.map((item: any) => {
        return {
          priceSold: item.priceSold,
          qtySold: item.qtySold,
          itemId: item.itemId,
          orderId: order.id,
        };
      });

      const prepared = tx
        .update(items)
        .set({
          qtySold: sql<number>`${items.qtySold} + ${sql.placeholder(
            "qty_sold"
          )}`,
        })
        .where(eq(items.id, sql.placeholder("id")))
        .prepare("update_item");

      await order_items_values.map(async (order_item: any) => {
        await prepared.execute({
          qty_sold: order_item.qtySold,
          id: order_item.itemId,
        });
      });

      return await tx
        .insert(ordersItems)
        .values(order_items_values)
        .returning();
    });
  } catch (err) {
    console.log(err);
  }
};
