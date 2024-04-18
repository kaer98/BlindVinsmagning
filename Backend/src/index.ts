
import express from 'express'
import cookieParser from 'cookie-parser';
import "dotenv/config";
import { db } from './drizzle/db';
import authRoute from './routes/auth.route';
import usersRoute from './routes/users.route';
import winesRoute from './routes/wines.route';
import tastingsRoute from './routes/tastings.route';


const app = express();
const PORT = 3000; //PORT for Server

//Middleware Funktioner
app.use(express.json()); //Bruges til at parse JSON Payloads fra Request Body
app.use(cookieParser()); // Bruges til at parse Cookies fra Request

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/wines', winesRoute);
app.use('/api/tastings', tastingsRoute);


app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});