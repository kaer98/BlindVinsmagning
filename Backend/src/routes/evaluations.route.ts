import express from "express";
import { getAllEvaluations, login, logout } from '../controllers/evaluations.controller'
import protectRoute from "../middleware/protectRoute";


const router = express.Router();

//ROUTE: GET /api/evaluations (Alle kan se evaluations)
router.get("/", getAllEvaluations);

//ROUTE: POST /api/auth/evaluations (Opret Evaluation (skal være logget ind))
router.post("/", login);

//ROUTE: POST /api/auth/logout (Logout)
router.post("/logout", protectRoute, logout);


export default router;