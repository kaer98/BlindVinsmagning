//Imports
import express, { NextFunction, Request, Response } from 'express'
import * as mysql from 'mysql2/promise';
import cookieParser from 'cookie-parser';
import "dotenv/config";
import { db } from './drizzle/db.mts';
import { user } from './drizzle/migrations/schema.ts';

//Routes Imports
import usersRoute from './routes/users.route'

const app = express();
const PORT = 3000; //PORT for Server

const main = async () => {

        const connection = await mysql.createConnection(process.env.DATABASE_URL as string);
   
    //Middleware Funktioner
    app.use(express.json()); //Bruges til at parse JSON Payloads fra Request Body
    app.use(cookieParser()); // Bruges til at parse Cookies fra Request

    //Middleware Routes
    app.use('/api/users', usersRoute); //Users Route
    // app.use("/api/tastings", tastingRoutes);
    // app.use("/api/auth", authRoutes);


    app.get('/', (req: Request, res: Response) => { 

        await db.query.user.findMany({}); //Test Query 

    });

    app.listen(PORT, () => {

        console.log(`Server kører på PORT: ${PORT}`);
    });

}

main();




