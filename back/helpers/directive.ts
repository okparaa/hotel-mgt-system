import { MapperKind, getDirective, mapSchema } from "@graphql-tools/utils";
import { GraphQLSchema, defaultFieldResolver } from "graphql";

const authDirective = (
  directiveName: string,
  getUserFn: (
    req: Request
  ) => Promise<{ hasRole: (roles: string[]) => boolean }>
) => {
  const typeDirectiveArgumentMaps: Record<string, any> = {};
  return {
    authDirectiveTypeDefs: `directive @${directiveName}(
        requires: String = ""
      ) on OBJECT | FIELD_DEFINITION
    `,
    authDirectiveTransformer: (schema: GraphQLSchema) =>
      mapSchema(schema, {
        [MapperKind.TYPE]: (type) => {
          const authDirective = getDirective(schema, type, directiveName)?.[0];
          if (authDirective) {
            typeDirectiveArgumentMaps[type.name] = authDirective;
          }
          console.log("okpara", type.name, authDirective);

          return undefined;
        },
        [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
          const authDirective =
            getDirective(schema, fieldConfig, directiveName)?.[0] ??
            typeDirectiveArgumentMaps[typeName];
          if (authDirective) {
            const { requires } = authDirective;

            if (requires) {
              const { resolve = defaultFieldResolver } = fieldConfig;
              fieldConfig.resolve = async (source, args, context, info) => {
                const user = await getUserFn(context.req);
                if (!user.hasRole(requires.split(","))) {
                  //requires is a string saparated by comma
                  throw new Error("not authorized");
                }
                return resolve(source, args, context, info);
              };
              return fieldConfig;
            }
          }
        },
      }),
  };
};

export default authDirective;
