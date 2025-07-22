import { defineConfig } from "drizzle-kit";
import { config } from "./config";

export default defineConfig({
    dialect: "postgresql",
    schema: "./db/schema.js",
    out: "./migrations",
    dbCredentials: {
        url: config.DATABASE_URL,
    },
});
