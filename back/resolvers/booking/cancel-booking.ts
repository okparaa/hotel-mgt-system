import { eq, sql } from "drizzle-orm";
import { bookings, orders, rooms } from "../../db/schemas";
import throwError, { getErrors, ErrorTypes } from "../../helpers/errors";
import { Context } from "../../types/context";
import * as yup from "yup";

const cancelBookingSchema = yup.object({
  id: yup.string().required("value is required"),
});

export const cancelBooking = async (parent: any, args: any, ctx: Context) => {
  try {
    await cancelBookingSchema.validate({ ...args }, { abortEarly: false });
  } catch ({ inner }: any) {
    const roomErrors = getErrors(inner);
    throwError(
      "Some room fields are ommited",
      ErrorTypes.BAD_USER_INPUT,
      roomErrors
    );
  }
  try {
    const results = await ctx.db.transaction(async (tx) => {
      const [book] = await tx
        .update(bookings)
        .set({ canceled: true })
        .where(eq(bookings.id, args.id))
        .returning();

      if (book.canceled) {
        const [order] = await tx
          .select()
          .from(orders)
          .innerJoin(bookings, eq(bookings.orderId, orders.id))
          .where(eq(orders.id, book.orderId));

        await tx
          .update(orders)
          .set({
            amount: sql`${orders.amount} - ${book.amount}`,
          })
          .where(eq(orders.id, book.orderId));
      }

      const [room] = await tx
        .select()
        .from(rooms)
        .where(eq(rooms.id, book.roomId));
      return room;
    });
    return results;
  } catch (error) {
    console.log(error);
  }
  //handle order and order booking tables
};
