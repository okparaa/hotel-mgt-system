import { eq, inArray, sql } from "drizzle-orm";
import { BookingSelect, bookings, orders, rooms } from "../../db/schemas";
import { getDays } from "../../helpers";
import throwError, { getErrors, ErrorTypes } from "../../helpers/errors";
import * as yup from "yup";
import { Context } from "../../types/context";

const newOrderRoomSchema = yup.object({
  detail: yup.object().shape({
    cash: yup.number().required("value is required"),
    txfa: yup.number().required("value is required"),
    pos: yup.number().required("value is required"),
    total: yup.number().required("value is required"),
    userId: yup.string().required("value is required"),
    guestName: yup.string().required("guest name is required"),
  }),
  books: yup.array(
    yup.object().shape({
      roomId: yup.string().required("value is required"),
      price: yup.number().required("value is required"),
      inDate: yup.string().required("value is required"),
      outDate: yup.string().required("value is required"),
    })
  ),
});

export const newBooking = async (parent: any, args: any, ctx: Context) => {
  try {
    await newOrderRoomSchema.validate({ ...args }, { abortEarly: false });
  } catch ({ inner }: any) {
    const roomErrors = getErrors(inner);
    throwError(
      "Some room fields are ommited",
      ErrorTypes.BAD_USER_INPUT,
      roomErrors
    );
  }

  const [isDuplicate] = await ctx.db
    .select()
    .from(orders)
    .where(eq(orders.hash, args.detail.hash));

  if (isDuplicate) {
    throwError("duplicate order", ErrorTypes.ALREADY_EXISTS, [
      ["duplicate", "duplicate sale"],
    ]);
  }

  try {
    return await ctx.db.transaction(async (tx) => {
      const amountSold = args.books.reduce((acc: any, room: any) => {
        const days = getDays({ inDate: room.inDate, outDate: room.outDate });
        return acc + Number(room.price) * days;
      }, 0);

      const [order] = await tx
        .insert(orders)
        .values({
          userId: args.detail.userId,
          amount: amountSold,
          hash: args.detail.hash,
          pos: args.detail.pos,
          cash: args.detail.cash,
          txfa: args.detail.txfa,
          guestName: args.detail.guestName,
          guestEmail: args.detail.guestEmail,
          guestPhone: args.detail.guestPhone,
        })
        .returning();

      const books = args.books.map((room: any) => {
        const days = getDays({ inDate: room.inDate, outDate: room.outDate });
        return {
          orderId: order.id,
          roomId: room.roomId,
          days: days,
          inDate: room.inDate,
          outDate: room.outDate,
          amount: days * room.price,
          canceled: false,
          price: room.price,
        };
      });

      await tx.insert(bookings).values(books);

      const roomIds: string[] = books.map((book: BookingSelect) => book.roomId);
      return await tx.select().from(rooms).where(inArray(rooms.id, roomIds));
    });
  } catch (error) {
    if (error.extensions && error.extensions.info) {
      throwError(
        "Error while saving booking",
        ErrorTypes.UNKWOWN,
        error.extensions.info
      );
    } else {
      throw new Error(error);
    }
  }
};
