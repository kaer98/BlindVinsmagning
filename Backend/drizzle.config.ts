import { defineConfig } from 'drizzle-kit';

export default defineConfig({
schema: "./src/drizzle/schema.ts",
out: "./src/drizzle/migrations",
driver: "pg",
dbCredentials: {
    connectionString: process.env.DATABASE_URL as string
},
// If NODE_ENV is set to "production", turn off verbose database logging
verbose: process.env.NODE_ENV == "production" ? true : false,
strict: true,
});