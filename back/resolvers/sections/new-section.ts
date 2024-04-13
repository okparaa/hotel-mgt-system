import * as yup from "yup";
import { Context } from "../../types/context";
import throwError, { ErrorTypes, getErrors } from "../../helpers/errors";
import { sections } from "../../db/schemas";
import { slugExists } from "../../helpers";

const sectionSchema = yup.object({
  name: yup.string().required("value is required"),
  description: yup.string().required("value is required"),
  slug: yup.string().required("value is required"),
});

export const newSection = async (parent: any, args: any, ctx: Context) => {
  try {
    await sectionSchema.validate({ ...args.section }, { abortEarly: false });
  } catch ({ inner }: any) {
    const sectionErrors = getErrors(inner);
    throwError(
      "Some section fields are ommited",
      ErrorTypes.BAD_USER_INPUT,
      sectionErrors
    );
  }
  const section = await slugExists(args.section.slug, ctx);

  if (section && section.id) {
    throwError("slug exists", ErrorTypes.ALREADY_EXISTS, [
      ["slug", `unavailable!`],
    ]);
  }
  try {
    const [currSection] = await ctx.db
      .insert(sections)
      .values({ ...args.section })
      .returning();
    return currSection;
  } catch (e) {
    throwError("trying to save section", ErrorTypes.INTERNAL_SERVER_ERROR, e);
  }
};
