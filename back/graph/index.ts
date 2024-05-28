import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDef as User, resolvers as userResolvers } from "./user";
import { typeDef as Session, resolvers as sessionResolvers } from "./session";
import { typeDef as Order, resolvers as orderResolvers } from "./order";
import { typeDef as Store, resolvers as storeResolvers } from "./order";

import { typeDef as Room, resolvers as roomResolvers } from "./room";
import {
  typeDef as Purchase,
  resolvers as purchaseResolvers,
} from "./purchase";
import { typeDef as Item, resolvers as itemResolvers } from "./item";
import {
  typeDef as OrdersItems,
  resolvers as ordersItemsResolvers,
} from "./order-item";
import { typeDef as Role, resolvers as roleResolver } from "./roles";
import { typeDef as Route, resolvers as routeResolver } from "./routes";
import { typeDef as Recovery, resolvers as recoveryResolver } from "./recovery";
import {
  typeDef as OrderBooking,
  resolvers as ordersBookingResolver,
} from "./booking";
import merge from "lodash/merge";

// import authDirective from "../helpers/directive";
// import { getUser } from "../helpers";
// const { authDirectiveTypeDefs, authDirectiveTransformer } = authDirective(
//   "auth",
//   getUser
// );

const schema = makeExecutableSchema({
  typeDefs: [
    //authDirectiveTypeDefs,
    User,
    Session,
    Item,
    Order,
    Purchase,
    OrdersItems,
    Room,
    Role,
    Store,
    Route,
    OrderBooking,
    Recovery,
  ],
  resolvers: merge(
    userResolvers,
    sessionResolvers,
    ordersBookingResolver,
    orderResolvers,
    storeResolvers,
    purchaseResolvers,
    itemResolvers,
    ordersItemsResolvers,
    roomResolvers,
    roleResolver,
    routeResolver,
    recoveryResolver
  ),
});

//const mergedSchema = authDirectiveTransformer(schema);
export { schema as mergedSchema };
