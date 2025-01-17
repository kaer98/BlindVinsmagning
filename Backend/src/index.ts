import express from 'express'
import cookieParser from 'cookie-parser';
import "dotenv/config";
import { db } from './drizzle/db';
import authRoute from './routes/auth.route';
import usersRoute from './routes/users.route';
import winesRoute from './routes/wines.route';
import tastingsRoute from './routes/tastings.route';
import evaluationsRoute from './routes/evaluations.route';
import checkEnvironmentVariables from './utils/checkEnvironmentVariables';
import requestLogger from './middleware/requestLogger';
import { eq } from 'drizzle-orm';
import { tastingparticipants, users } from './drizzle/migrations/schema';
import cors from 'cors';



const app = express();
app.set('trust proxy', true) // Brug X-FORWARDED-FOR header til at hente IP'er pga. reverse proxy
const PORT = 3000; //PORT for Server

var originForSite = "";

if (process.env.NODE_ENV == "production") {
    originForSite = "http://localhost:5173/"
}
else {
    originForSite = "https://reactsk.jazper.dk/"
}

const corsOptions = {
    origin: originForSite, // Change this to match your frontend origin
    credentials: true, // Allow cookies/credentials
};

//Middleware Funktioner
app.use(express.json()); //Bruges til at parse JSON Payloads fra Request Body
app.use(cors(corsOptions));

  
app.use(cookieParser()); // Bruges til at parse Cookies fra Request
app.use((req, res, next) => { requestLogger(req, res, next) }); // Bruges til logging af requests med timestamp

//Routes: Alle de forskellige Routes. Se dokumentation for mere information.
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/wines', winesRoute);
app.use('/api/tastings', tastingsRoute);
app.use('/api/evaluations', evaluationsRoute);



app.listen(PORT, () => {
    checkEnvironmentVariables()

    if (process.env.NODE_ENV == "production") {
        console.log(`Backend API available at: https://vin.jazper.dk/`);
    } else {
        console.log(`Backend API available at: http://localhost:${PORT}`);
    }
});
