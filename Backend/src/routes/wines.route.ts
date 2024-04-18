import {db} from '../drizzle/db';
import express from "express";
import protectRoute from '../middleware/protectRoute';
import { createWines, getAllWines } from '../controllers/wines.controller';

const router = express.Router();

//ROUTE: GET /api/wines
router.get("/", getAllWines);

//ROUTE: POST /api/wines
router.post("/", createWines);

export default router;