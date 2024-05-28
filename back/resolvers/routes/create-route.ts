import { routes } from "../../db/schemas";
import { xExists } from "../../helpers";
import throwError, { getErrors, ErrorTypes } from "../../helpers/errors";
import { Context } from "../../types/context";
import * as yup from "yup";

const routeSchema = yup.object({
  name: yup.string().required("value is required"),
  description: yup.string().required("value is required"),
  section: yup.string().required("value is required"),
  slug: yup.string().required("value is required"),
  isSxn: yup.string().required("value is required"),
});

export const createRoute = async (parent: any, args: any, ctx: Context) => {
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
  const name_meta = {
    table: routes,
    column: routes.name,
    value: args.route.name,
  };
  const name_route = await xExists(name_meta, ctx);

  if (name_route && name_route.id) {
    throwError("route exists", ErrorTypes.ALREADY_EXISTS, [
      ["name", `route exists!`],
    ]);
  }

  const slug_meta = {
    table: routes,
    column: routes.slug,
    value: args.route.slug,
  };
  const slug_route = await xExists(slug_meta, ctx);

  if (slug_route && slug_route.slug == args.route.slug) {
    throwError("slug exists", ErrorTypes.ALREADY_EXISTS, [
      ["slug", `slug exists!`],
    ]);
  }

  try {
    const [currRoute] = (await ctx.db
      .insert(routes)
      .values({ ...args.route })
      .returning()) as any[];
    return currRoute;
  } catch (err) {
    throwError("trying to save route", ErrorTypes.INTERNAL_SERVER_ERROR, err);
  }
};
