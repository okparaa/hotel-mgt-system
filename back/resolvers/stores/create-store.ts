import { stores } from "../../db/schemas";
import throwError, { getErrors, ErrorTypes } from "../../helpers/errors";
import { Context } from "../../types/context";
import * as yup from "yup";

const storeSchema = yup.object({
  routeId: yup.string().required("value is required"),
  userId: yup.string().required("value is required"),
  itemId: yup.string().required("value is required"),
  qtyReq: yup.string().required("value is required"),
  createdAt: yup.string().required("value is required"),
});

export const createStore = async (parent: any, args: any, ctx: Context) => {
  // await sleep(8000);
  try {
    await storeSchema.validate({ ...args.store }, { abortEarly: false });
  } catch ({ inner }: any) {
    const roomErrors = getErrors(inner);
    throwError(
      "Some room fields are ommited",
      ErrorTypes.BAD_USER_INPUT,
      roomErrors
    );
  }

  try {
    const [store] = await ctx.db
      .insert(stores)
      .values({ ...args.store })
      .returning();
    return store;
  } catch (e) {
    throwError("trying to save room", ErrorTypes.INTERNAL_SERVER_ERROR, e);
  }
};
