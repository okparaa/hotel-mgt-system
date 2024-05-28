import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { NextFunction, Response } from "express";
import * as schema from "../db/schemas";

/** Middleware that creates a new empty object on the Request and Response object */
const expressContext =
  (db: NodePgDatabase<typeof schema>) =>
  (req: Express.Request, res: Response, next: NextFunction) => {
    req.context = { db };
    next();
  };

export default expressContext;
