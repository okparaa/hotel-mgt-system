import * as yup from "yup";
import { Context } from "../../types/context";
import throwError, { ErrorTypes, getErrors } from "../../helpers/errors";
import { sections } from "../../db/schemas";
import { eq } from "drizzle-orm";
import { slugExists } from "../../helpers";

const sectionSchema = yup.object({
  id: yup.string().required("value is required"),
  name: yup.string().required("value is required"),
  description: yup.string().required("value is required"),
  slug: yup.string().required("value is required"),
});

export const updateSection = async (parent: any, args: any, ctx: Context) => {
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
  if (args.section.slug.length > 3) {
    throwError("slug too long", ErrorTypes.ALREADY_EXISTS, [
      ["slug", `use 3 letters`],
    ]);
  }
  if (args.section.slug.length < 3) {
    throwError("slug too short", ErrorTypes.ALREADY_EXISTS, [
      ["slug", `use 3 letters`],
    ]);
  }
  const section = await slugExists(args.section.slug, ctx);

  if (section && section.id !== args.section.id) {
    throwError("slug exists", ErrorTypes.ALREADY_EXISTS, [
      ["slug", `unavailable!`],
    ]);
  }

  try {
    const [currSection] = await ctx.db
      .update(sections)
      .set({ ...args.section })
      .where(eq(sections.id, args.section.id))
      .returning();
    return currSection;
  } catch (e) {
    throwError("trying to save section", ErrorTypes.INTERNAL_SERVER_ERROR, e);
  }
};
