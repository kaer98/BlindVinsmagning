import express from "express";
import { PrismaClient } from '@prisma/client';
import { getUserById, getUsers } from "../controllers/users.controller.js";


const prisma = new PrismaClient();

/*
Route: "/api/users"

Denne Route vil bruges til blandt andet
CRUD operationer til brugerne.
*/

const router = express.Router();

//Route: /api/users
router.get("/", getUsers);

//Route: /api/users/:id
router.get("/:id", getUserById);

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