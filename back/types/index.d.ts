import * as schema from "../db/schemas/enums";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

declare global {
  namespace Express {
    export interface Request {
      context: {
        db: NodePgDatabase<typeof schema>;
      };
    }
  }
  namespace NodeJS {
    export interface ProcessEnv {
      DATABASE_URL: string;
      NODE_ENV: string;
      JWT_SECRET: string;
      GQL_PORT: string;
      BCRYPT_COST: string;
      PAYSTACK_PUBLIC_KEY: string;
    }
  }
}
