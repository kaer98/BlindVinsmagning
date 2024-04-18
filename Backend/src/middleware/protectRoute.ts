// Importing necessary modules and models
import jwt from 'jsonwebtoken';
import { db } from '../drizzle/db';
import type { NextFunction, Request, Response } from 'express';
import { eq } from 'drizzle-orm'; //Tester om 2 værdier er equal.
import { user } from '../drizzle/schema';
import type { User } from '../dtos/user.dto';


// Middleware function to protect routes
/*
protectRoute Middlewaren sørger for at unathenticated brugere ikke får adgang til de specifikke
routes den bliver brugt på.

*/


const protectRoute = async (request : Request<{}, {}, User>, response : Response, next : NextFunction) => {
    try {
        // Tjekker om der er cookies og JWT i requesten.
        if (!request.cookies || !request.cookies.jwt) {
            // Hvis ingen token bliver fundet, så returneres status 401.
            return response.status(401).json({ error: "Unauthorized - No token provided." });
        }

        // Hente JWT Token fra cookiesne (fra requesten)
        const token = request.cookies.jwt;

        // Verificering af JWT Token med JWT Secret key.
        const decoded:any = jwt.verify(token, process.env.JWT_SECRET || "BUqC1n1xRU2D1iVbWyfLgA=="); //Denne kan opdateres senere (Under produktion)
        

        const userToFind = await db.query.user.findFirst({
            where: eq(decoded.userId, user.id), 
          
        });


        // ...
        if (!userToFind) {
            // Hvis ikke, bliver en status 404 returneret som respons.
            return response.status(404).json({ error: "User not found" });
        }

        // Hvis brugeren eksisterer bliver user objektet slået sammen med request objektet
        request.user = userToFind;
        console.log(request.user.fullName + " logged out"); //For at teste

        // Next funktionen sørge for at denne næste middleware i rækken bliver kørt.
        next();
    } catch (error) {
        // Error tjek
        console.log("Error in protectRoute middleware:", error);

        response.status(500).json({ error: "Internal server error" });
    }
}

export default protectRoute;
