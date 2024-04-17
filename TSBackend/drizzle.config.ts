import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './src/drizzle/migrations/schema.ts',
    out: './src/drizzle/migrations',
    driver: 'mysql2',
    dbCredentials: { 
        uri: process.env.DATABASE_URL as string
    },
    verbose: true,
    strict: true

})