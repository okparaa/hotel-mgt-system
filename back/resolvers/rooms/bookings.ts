import { eq } from "drizzle-orm";
import { rooms } from "../../db/schemas";
import { roomColumns } from "../../helpers";
import throwError, { getErrors, ErrorTypes } from "../../helpers/errors";
import * as yup from "yup";
import { Context } from "../../types/context";

const bookingsSchema = yup.object({
  ids: yup.array().required("value is required"),
  cash: yup.string().required("value is required"),
  txfa: yup.string().required("value is required"),
  pos: yup.string().required("value is required"),
});

export const bookings = async (parent: any, args: any, ctx: Context) => {
  try {
    await bookingsSchema.validate({ ...args.book }, { abortEarly: false });
  } catch ({ inner }: any) {
    const roomErrors = getErrors(inner);
    throwError(
      "Some room fields are ommited",
      ErrorTypes.BAD_USER_INPUT,
      roomErrors
    );
  }
  return await ctx.db
    .update(rooms)
    .set({ ...args.book })
    .where(eq(rooms.id, args.book.id))
    .returning(roomColumns);
};
