import { stores } from "../../db/schemas";
import throwError, { getErrors, ErrorTypes } from "../../helpers/errors";
import { Context } from "../../types/context";
import * as yup from "yup";

const storeSchema = yup.object({
  id: yup.string().required("value is required"),
  qty: yup.string().required("value is required"),
  updatedAt: yup.string().required("value is required"),
});

export const updateStore = async (parent: any, args: any, ctx: Context) => {
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
      .update(stores)
      .set({ qty: args.store.qty, updatedAt: args.store.updatedAt })
      .returning();
    return store;
  } catch (e) {
    throwError("trying to save room", ErrorTypes.INTERNAL_SERVER_ERROR, e);
  }
};
