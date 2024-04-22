import { defineConfig } from 'drizzle-kit';

const enableVerboseLogging = () => {
    if (process.env.NODE_ENV == "production") {
        return false;
    } else {
        return true;
    }
}

export default defineConfig({
    schema: "./src/drizzle/migrations/schema.ts",
    out: "./src/drizzle/migrations",
    driver: "pg",
    dbCredentials: {
        connectionString: process.env.DATABASE_URL as string
    },
    verbose: enableVerboseLogging(),
    strict: true,
});