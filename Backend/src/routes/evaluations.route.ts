import express from "express";
import { getAllEvaluations, createEvaluation, addWset } from '../controllers/evaluations.controller'
import protectRoute from "../middleware/protectRoute";


const router = express.Router();

//ROUTE: GET /api/evaluations (Alle kan se evaluations)
router.get("/", getAllEvaluations);

//ROUTE: POST
router.post("/", protectRoute, createEvaluation);

//ROUTE POST
router.put("/:id", protectRoute, addWset)




export default router;