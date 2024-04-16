import express from 'express';
import dotenv from 'dotenv'; //Man skal installere NPM Package 'dotenv' for at kunne bruge environment variables i Node.js.
import tastingRoutes from './routes/tastings.routes.js';
import userRoutes from './routes/users.routes.js';
import authRoutes from './routes/auth.routes.js';
import { PrismaClient } from '@prisma/client'



const prisma = new PrismaClient();



if (process.env.IN_DOCKER == undefined) {
  dotenv.config();
}

//Oprettelse af Express appen
const app = express();

//Middleware - Etc
app.use(express.json()); // Til at parse inkommende requests med JSON Payloads. Fra request body.

//Middleware - Routes
app.use("/api/tastings", tastingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  //MySQL DB forbindelse
  console.log(`(Listening on port ${PORT}})...`);
});
