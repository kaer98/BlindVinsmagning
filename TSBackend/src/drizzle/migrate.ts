import { migrate } from "drizzle-orm/mysql2/migrator";
import mysql from "mysql2/promise";
import drizzle from "drizzle-orm/mysql2";
import "dotenv/config";

const migr = async () => {
const connection = await mysql.createConnection(process.env.DATABASE_URL as string);

const db = drizzle(connection);

}

migrate();