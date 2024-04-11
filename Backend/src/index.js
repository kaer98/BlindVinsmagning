import express from 'express';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'; //Man skal installere NPM Package 'dotenv' for at kunne bruge environmental variables i Node.js.
import tastingRoutes from './routes/tastings.routes.js';
import connectToMySQL from "./db/connectToMySQL.js";


if (process.env.IN_DOCKER == undefined) {
  dotenv.config();
}

//Oprettelse af Express appen
const app = express();


//Env Variables fungerer ikke på nuværende tidspunkt, skal fixes
const PORT = process.env.PORT || 3000;

//Middleware - Etc
app.use(express.json()); // Til at parse inkommende requests med JSON Payloads. Fra request body.

//Middleware - Routes
app.use("/api/tastings", tastingRoutes);

app.listen(PORT, () => {

    //DB forbindelse
    connectToMySQL();
    console.log(`(Listening on port ${PORT})...`);
  });





