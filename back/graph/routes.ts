import { eq } from "drizzle-orm";
import { routes } from "../db/schemas";
import { Context } from "../types/context";
import { createRoute } from "../resolvers/routes/create-route";
import {
  updateRoute,
  updateOtherSlugs,
  parentRoute,
} from "../resolvers/routes/update-route";

export const typeDef = /* GraphQL */ `
  type Route {
    id: ID!
    syn: Boolean
    createdAt: String
    updatedAt: String
    deleted: Boolean
    name: String!
    slug: String
    otherSlugs: String
    isSxn: Boolean
    section: String
    description: String
    route: Route
  }

  type Query {
    route(id: ID!): Route
    routes: [Route]
  }
  type Mutation {
    createRoute(route: NewRouteInput): Route
    updateRoute(route: RouteInput): Route
    removeRoute(id: ID): Route
    updateOtherSlugs(route: RouteSlugInput): Route
    parentRoute(route: ParentRouteInput): Route
  }
  input NewRouteInput {
    name: String!
    slug: String!
    isSxn: Boolean
    section: String
    description: String
  }
  input RouteInput {
    id: ID!
    name: String
    slug: String
    section: String
    isSxn: Boolean
    description: String
  }

  input RouteSlugInput {
    id: String!
    otherSlugs: String
  }

  input ParentRouteInput {
    id: String!
    routeId: String
  }
`;
export const resolvers = {
  Query: {
    routes: async (parent: any, args: any, ctx: Context) => {
      return await ctx.db.select().from(routes);
    },
    route: async (parent: any, args: any, ctx: Context) => {
      const [route] = await ctx.db
        .select()
        .from(routes)
        .where(eq(routes.id, args.id));
      return route;
    },
  },
  Mutation: {
    createRoute: async (parent: any, args: any, ctx: Context) => {
      return await createRoute(parent, args, ctx);
    },
    updateRoute: async (parent: any, args: any, ctx: Context) => {
      return await updateRoute(parent, args, ctx);
    },
    updateOtherSlugs: async (parent: any, args: any, ctx: Context) => {
      return await updateOtherSlugs(parent, args, ctx);
    },
    parentRoute: async (parent: any, args: any, ctx: Context) => {
      return await parentRoute(parent, args, ctx);
    },
  },
  Route: {
    route: async (parent: any, args: any, ctx: Context) => {
      const [route] = await ctx.db
        .select()
        .from(routes)
        .where(eq(parent.routeId, routes.id));
      return route;
    },
  },
};
