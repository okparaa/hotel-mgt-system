import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDef as Section, resolvers as sectionResolvers } from "./section";
import { typeDef as User, resolvers as userResolvers } from "./user";
import { typeDef as Session, resolvers as sessionResolvers } from "./session";
import { typeDef as Order, resolvers as orderResolvers } from "./order";
import {
  typeDef as Deduction,
  resolvers as deductionResolvers,
} from "./deduction";
import { typeDef as Room, resolvers as roomResolvers } from "./room";
import {
  typeDef as Inventory,
  resolvers as inventoryResolvers,
} from "./inventory";
import { typeDef as Item, resolvers as itemResolvers } from "./item";
import {
  typeDef as OrdersItems,
  resolvers as ordersItemsResolvers,
} from "./order-item";
import { typeDef as Role, resolvers as roleResolver } from "./roles";
import { typeDef as Route, resolvers as routeResolver } from "./routes";
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
    Section,
    User,
    Session,
    Item,
    Order,
    Inventory,
    OrdersItems,
    Deduction,
    Room,
    Role,
    Route,
    OrderBooking,
  ],
  resolvers: merge(
    sectionResolvers,
    userResolvers,
    sessionResolvers,
    ordersBookingResolver,
    orderResolvers,
    inventoryResolvers,
    itemResolvers,
    ordersItemsResolvers,
    deductionResolvers,
    roomResolvers,
    roleResolver,
    routeResolver
  ),
});

//const mergedSchema = authDirectiveTransformer(schema);
export { schema as mergedSchema };
