import { eq, getTableColumns } from "drizzle-orm";
import { routes } from "../../db/schemas";
import throwError, { getErrors, ErrorTypes } from "../../helpers/errors";
import { Context } from "../../types/context";
import * as yup from "yup";

const routeSchema = yup.object({
  name: yup.string().required("value is required"),
  description: yup.string().required("value is required"),
  id: yup.string().required("value is required"),
});

export const updateRoute = async (parent: any, args: any, ctx: Context) => {
  // await sleep(8000);
  try {
    await routeSchema.validate({ ...args.route }, { abortEarly: false });
  } catch ({ inner }: any) {
    const routeErrors = getErrors(inner);
    throwError(
      "Some route fields are ommited",
      ErrorTypes.BAD_USER_INPUT,
      routeErrors
    );
  }

  try {
    const [currRoute] = await ctx.db
      .update(routes)
      .set({ ...args.route })
      .where(eq(routes.id, args.route.id))
      .returning();
    return currRoute;
  } catch (err) {
    throwError("trying to save route", ErrorTypes.INTERNAL_SERVER_ERROR, err);
  }
};

const otherSlugsSchema = yup.object({
  id: yup.string().required("value is required"),
});

export const updateOtherSlugs = async (
  parent: any,
  args: any,
  ctx: Context
) => {
  try {
    await otherSlugsSchema.validate(args.route, { abortEarly: false });
  } catch ({ inner }: any) {
    const routeErrors = getErrors(inner);
    throwError("all fields are required", ErrorTypes.BAD_REQUEST, routeErrors);
  }
  const [updatedRoute] = await ctx.db
    .update(routes)
    .set({ otherSlugs: args.route.otherSlugs })
    .where(eq(routes.id, args.route.id))
    .returning();

  return updatedRoute;
};
