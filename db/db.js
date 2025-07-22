import { drizzle } from "drizzle-orm/node-postgres";
import { config } from "../config/index.js";
import * as schema from "../db/schema.js";

import pg from "pg";

const expanded_schema = {
    ...schema,
};

export const pgClient = new pg.Pool({   
    connectionString: config.DATABASE_URL,
});

export const db = drizzle({ client: pgClient, schema: expanded_schema });
