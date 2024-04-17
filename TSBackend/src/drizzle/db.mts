import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import "dotenv/config";
import * as schema from "./migrations/schema";
import { user } from '../drizzle/migrations/schema.ts';


const connection = await mysql.createConnection(process.env.DATABASE_URL as string);

export default drizzle(connection, {mode: "default", schema});

