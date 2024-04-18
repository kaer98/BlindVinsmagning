import {db} from '../drizzle/db';
import express from "express";
import protectRoute from '../middleware/protectRoute';
import { createTasting, getAllTastings, joinTasting } from '../controllers/tastings.controller';

const router = express.Router();

//ROUTE: GET /api/tastings (Alle kan se smagninger)
router.get("/",  getAllTastings);

//ROUTE: POST /api/tastings (Man skal være logget ind)
router.post("/", protectRoute, createTasting);

//ROUTE: GET /api/tastings/join/:id (Man skal være logget ind)
router.get("/join/:id", protectRoute, joinTasting);

export default router;