import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDef as Dept, resolvers as deptResolvers } from "./dept";
import { typeDef as User, resolvers as userResolvers } from "./user";
import merge from "lodash/merge";
import authDirective, { getUser } from "@/app/api/v1/AuthDirective";
const { authDirectiveTypeDefs, authDirectiveTransformer } = authDirective(
  "auth",
  getUser
);

let schema = makeExecutableSchema({
  typeDefs: [authDirectiveTypeDefs, Dept, User],
  resolvers: merge(deptResolvers, userResolvers),
});

schema = authDirectiveTransformer(schema);
export { schema };
