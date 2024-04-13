import { db } from "../db";

export type Context = {
  db: typeof db;
  req: Request;
  res: Response;
};
