import express from "express";
import { PrismaClient } from '@prisma/client';
import { createUser, deleteAllUsers, deleteUserById, getUserById, getUsers } from "../controllers/users.controller.js";
import protectRoute from "../middleware/protectRoute.js";


const prisma = new PrismaClient();

/*
Route: "/api/users"

Denne Route vil bruges til blandt andet
CRUD operationer til brugerne.
*/

const router = express.Router();

//GET Route: /api/users (Henter alle brugere)
router.get("/", protectRoute, getUsers);

//GET Route: /api/users/:id (Henter én bruger, ud fra ID)
router.get("/:id", getUserById);

//POST Route: /api/users  (Opretter en ny bruger)
router.post("/", createUser);

//DELETE Route: /api/users (Sletter alle brugere i databasen)
router.delete("/", deleteAllUsers);

//DELETE Route: /api/users/:id (Sletter én enkelt bruger i databasen)
router.delete("/:id", deleteUserById);

router.put("/");


export default router;