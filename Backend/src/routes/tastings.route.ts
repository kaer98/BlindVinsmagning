import {db} from '../drizzle/db';
import express from "express";
import protectRoute from '../middleware/protectRoute';
import { createTasting, getAllTastings } from '../controllers/tastings.controller';

const router = express.Router();

//ROUTE: GET /api/tastings
router.get("/",  getAllTastings);

//ROUTE: POST /api/tastings
router.post("/", protectRoute, createTasting);

export default router;