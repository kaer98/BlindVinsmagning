import express from "express";
import { getTastings, createTasting, deleteTasting, editTasting } from '../controllers/tastings.controller.js';
import { PrismaClient } from '@prisma/client'
import protectRoute from "../middleware/protectRoute.js";


const prisma = new PrismaClient();

/*
Route: "/api/tastings"

Denne Route vil bruges til blandt andet
CRUD operationer af de forskellige smagninger.
*/

const router = express.Router();

//Route: /api/tastings
router.get("/", getTastings);

// router.post("/", createTasting);

router.post("/", protectRoute, createTasting);


router.delete("/", deleteTasting);
router.put("/", editTasting);


export default router;