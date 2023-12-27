import { schema } from "@/graphql/schema";
import { prisma } from "@/prisma/db";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export type Context = {
  prisma: PrismaClient;
  req: NextRequest;
};
const apolloServer = new ApolloServer({
  schema: schema,
});

const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer, {
  context: async (req, res) => ({ req, res, prisma }),
});

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
