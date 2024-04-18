import express from "express";
import { signup, login, logout } from '../controllers/auth.controller'
import protectRoute from "../middleware/protectRoute";

const router = express.Router();

//ROUTE: POST /api/auth/signup (Login)
router.post("/signup", signup);

//ROUTE: POST /api/auth/login (Login)
router.post("/login", login);

//ROUTE: POST /api/auth/logout (Logout)
router.post("/logout", protectRoute, logout);


export default router;