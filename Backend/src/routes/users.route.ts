import {db} from '../drizzle/db';
import express from "express";
import protectRoute from '../middleware/protectRoute';
import { getUsers, getUserById, deleteAllUsers, deleteUserById } from '../controllers/users.controller';

const router = express.Router();

//ROUTE: GET /api/users
router.get("/", getUsers);

//ROUTE: GET /api/users/:id
router.get("/:id", getUserById);

//ROUTE: DELETE /api/users
router.delete("/", deleteAllUsers);

//ROUTE: DELETE /api/users/:id
router.delete("/:id", deleteUserById);

export default router;