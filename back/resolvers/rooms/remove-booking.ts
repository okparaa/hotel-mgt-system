import { eq } from "drizzle-orm";
import { rooms } from "../../db/schemas";
import throwError, { getErrors, ErrorTypes } from "../../helpers/errors";
import { Context } from "../../types/context";
import * as yup from "yup";
import { roomColumns } from "../../helpers";

const removeBookingSchema = yup.object({
  id: yup.string().required("value is required"),
});

export const removeBooking = async (parent: any, args: any, ctx: Context) => {
  try {
    await removeBookingSchema.validate({ ...args }, { abortEarly: false });
  } catch ({ inner }: any) {
    const roomErrors = getErrors(inner);
    throwError(
      "Some room fields are ommited",
      ErrorTypes.BAD_USER_INPUT,
      roomErrors
    );
  }

  const [currRoom] = await ctx.db
    .update(rooms)
    .set({ inDate: "", outDate: "" })
    .where(eq(rooms.id, args.id))
    .returning(roomColumns);
  return currRoom;
};
