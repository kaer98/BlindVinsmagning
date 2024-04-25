import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: "./src/drizzle/migrations/schema.ts",
    out: "./src/drizzle/migrations",
    driver: "pg",
    dbCredentials: {
        connectionString: process.env.DATABASE_URL as string
    },
    verbose: false,
    strict: true,
});