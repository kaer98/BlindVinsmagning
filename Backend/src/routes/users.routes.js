import express from "express";
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

/*
Route: "/api/users"

Denne Route vil bruges til blandt andet
CRUD operationer til brugerne.
*/

const router = express.Router();

//Route: /api/tastings
router.get("/", async (request, response) => {
    try {
      const allUsers = await prisma.user.findMany();
      response.json(allUsers);
    } catch (error) {
      console.error("Fejl ved indlæsning af brugere:", error);
      response.status(500).send("Fejl ved indlæsning af brugere");
    }
  });

  router.get("/:id", async (request, response) => {
try {

    const userId = parseInt(request.params.id); 


    const user = await prisma.user.findFirst({
        where: {
          id: userId
        }
      });
  
      if (user) {
        response.json(user);
      } else {
        response.status(404).send("Bruger ikke findet");
      }
} catch (error) {
    console.error("Fejl ved indlæsning af bruger:", error);
    response.status(500).send("Fejl ved indlæsning af brugere");
}

  });

//Der skal tilføjes adgangskode / hashing.

//Route: /api/users 
router.post("/", async (request, response) => {

    try {
        const { name, birthday, isMale } = request.body;

        const newUser = await prisma.user.create({
            data: {
                name, 
                birthday: new Date(birthday),
                isMale
            }
        });

        response.json(newUser);

    } catch (error) {
        console.error("Fejl under oprettelse af bruger", error);
        response.status(500).send("Fejl under oprettelse af bruger");
    }





});


router.delete("/");
router.put("/");


export default router;