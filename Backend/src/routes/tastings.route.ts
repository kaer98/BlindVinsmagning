import {db} from '../drizzle/db';
import express from "express";
import protectRoute from '../middleware/protectRoute';
import { createTasting, getAllTastings, joinTasting, getTastingById, getTastingParticipants, getUserJoinedTastings } from '../controllers/tastings/tastings.controller';

const router = express.Router();

//ROUTE: GET /api/tastings (Alle kan se smagninger)
router.get("/",  getAllTastings);

//ROUTE: POST /api/tastings (Man skal være logget ind)
router.post("/", protectRoute, createTasting);

//ROUTE: GET /api/tastings/join/:id (Man skal være logget ind)
router.get("/join/:id", protectRoute,  joinTasting);

//ROUTE: GET /api/tastings/:id (Alle kan se smagning)
router.get("/:id", getTastingById);

router.get("/participants/:id", getTastingParticipants);
router.get("/joined/me", protectRoute, getUserJoinedTastings);

export default router;