import express from 'express';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import tastingRoutes from './routes/tastings.routes.js';



//Oprettelse af Express appen
const app = express()

//Environmental Variables sektion
//Man skal installere NPM Package 'dotenv' for at kunne bruge environmental variables i Node.js.

//Env Variables fungerer ikke på nuværende tidspunkt, skal fixes
const DB_STRING = process.env.DB_STRING || 'mysql://wine:i4g5WNxi5KBr8s@hjem.jazper.dk:3306/WINE_DB';
const PORT = process.env.PORT || 3001;


//Middleware - Etc
dotenv.config();
app.use(express.json()); // Til at parse inkommende requests med JSON Payloads. Fra request body.

//Middleware - Routes
app.use("/api/tastings", tastingRoutes);

//Burde nok laves som environmental variable

//Connection String
const sequelize = new Sequelize(DB_STRING);

try {
  await sequelize.authenticate();
  console.log('Connection to DB Sucessfull');
} catch (error) {
  console.error('Connection to DB Failed', error);
}




app.listen(PORT, () => {
  console.log(`Listening on port ${PORT})...`);
});