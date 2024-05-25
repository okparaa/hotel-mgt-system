import { rooms } from "../../db/schemas";
import { roomColumns } from "../../helpers";
import throwError, { getErrors, ErrorTypes } from "../../helpers/errors";
import { Context } from "../../types/context";
import * as yup from "yup";

const roomSchema = yup.object({
  name: yup.string().required("value is required"),
  description: yup.string().required("value is required"),
  price: yup.string().required("value is required"),
  type: yup.string().required("value is required"),
  status: yup.string().required("value is required"),
});

export const createRoom = async (parent: any, args: any, ctx: Context) => {
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
      .insert(rooms)
      .values({ ...args.room })
      .returning(roomColumns);
    return currRoom;
  } catch (e) {
    throwError("trying to save room", ErrorTypes.INTERNAL_SERVER_ERROR, e);
  }
};
