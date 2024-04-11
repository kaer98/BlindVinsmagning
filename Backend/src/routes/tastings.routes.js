import express from "express";
import { getTastings, createTasting, deleteTasting, editTasting } from '../controllers/tastings.controller.js';

/*
Route: "/api/tastings"

Denne Route vil bruges til blandt andet
CRUD operationer af de forskellige smagninger.
*/

const router = express.Router();

//Route: /api/tastings
router.get("/", getTastings);
router.post("/", createTasting);
router.delete("/", deleteTasting);
router.put("/", editTasting);


export default router;