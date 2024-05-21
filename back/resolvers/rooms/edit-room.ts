import { eq } from "drizzle-orm";
import { rooms } from "../../db/schemas";
import throwError, { getErrors, ErrorTypes } from "../../helpers/errors";
import { Context } from "../../types/context";
import * as yup from "yup";
import { roomColumns } from "../../helpers";

const roomSchema = yup.object({
  name: yup.string().required("value is required"),
  description: yup.string().required("value is required"),
  price: yup.string().required("value is required"),
  type: yup.string().required("value is required"),
  id: yup.string().required("value is required"),
});

export const updateRoom = async (parent: any, args: any, ctx: Context) => {
  // await sleep(8000);
  try {
    await roomSchema.validate({ ...args.room }, { abortEarly: false });
  } catch ({ inner }: any) {
    const roomErrors = getErrors(inner);
    throwError(
      "Some room fields are ommited",
      ErrorTypes.BAD_USER_INPUT,
      roomErrors
    );
  }

  try {
    const [currRoom] = await ctx.db
      .update(rooms)
      .set({ ...args.room })
      .where(eq(rooms.id, args.room.id))
      .returning(roomColumns);
    return currRoom;
  } catch (e) {
    throwError("trying to save room", ErrorTypes.INTERNAL_SERVER_ERROR, e);
  }
};

const roomPriceSchema = yup.object({
  price: yup.string().required("value is required"),
  id: yup.string().required("value is required"),
});

export const roomPrice = async (parent: any, args: any, ctx: Context) => {
  try {
    await roomPriceSchema.validate({ ...args }, { abortEarly: false });
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
    .set({ ...args })
    .where(eq(rooms.id, args.id))
    .returning(roomColumns);
  return currRoom;
};
