import express from "express";
import { PrismaClient } from '@prisma/client';
import {signup, logout, login} from '../controllers/auth.controller.js'



const prisma = new PrismaClient();
const router = express.Router();


//JSON Request Body for 'SIGN UP' Requests:
/*
{
  "fullName": "Joakim Adilsen",
  "birthday": "1981-12-04",
  "gender": "FEMALE",
  "username": "zyrax",
  "password": "rlyHashed",
  "confirmPassword": "rlyHashed"
  
}

*/
router.post("/signup", signup);


//JSON Request Body for 'LOGIN' Requests:
/*
{
  "username": "zyrax",
  "password": "rlyHashed"
}

*/
router.post("/login", login);



router.post("/logout", logout);

export default router;