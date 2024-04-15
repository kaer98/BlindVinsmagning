import express from 'express';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'; //Man skal installere NPM Package 'dotenv' for at kunne bruge environment variables i Node.js.
import tastingRoutes from './routes/tastings.routes.js';
import userRoutes from './routes/users.routes.js';
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

app.listen(3000, () => {

  //MySQL DB forbindelse
  console.log(`(Listening on port ${PORT})...`);
});




app.get("/test", async (request, response) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        birthday: new Date("2023-02-12"),
        isMale: true,
        name: "ADIL"
      }
    });

    response.json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    response.status(500).send("Error creating user");
  }
});







