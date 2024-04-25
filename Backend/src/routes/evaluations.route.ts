import express from "express";
import { getAllEvaluations, createEvaluation, addWset, getAllEvaluationsByTastingId } from '../controllers/evaluations.controller'
import protectRoute from "../middleware/protectRoute";


const router = express.Router();

//ROUTE: GET /api/evaluations (Alle kan se evaluations)
router.get("/", getAllEvaluations);

//ROUTE: POST
router.post("/", protectRoute, createEvaluation);

router.get("/:id", addWset)

//ROUTE POST
router.get("/tasting/:id", protectRoute, getAllEvaluationsByTastingId)




export default router;