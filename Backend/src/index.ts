
import express from 'express'
import cookieParser from 'cookie-parser';
import "dotenv/config";
import { db } from './drizzle/db';
import authRoute from './routes/auth.route';
import usersRoute from './routes/users.route';


const app = express();
const PORT = 3000; //PORT for Server

//Middleware Funktioner
app.use(express.json()); //Bruges til at parse JSON Payloads fra Request Body
app.use(cookieParser()); // Bruges til at parse Cookies fra Request

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);



app.listen(PORT, () => {

    console.log(`Server kører på PORT: ${PORT}`);
});