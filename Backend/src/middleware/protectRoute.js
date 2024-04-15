// Importing necessary modules and models
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';


// Middleware function to protect routes
/*
protectRoute Middlewaren sørger for at unathenticated brugere ikke får adgang til de specifikke
routes den bliver brugt på.

*/

const prisma = new PrismaClient();

const protectRoute = async (request, response, next) => {
    try {
        // Tjekker om der er cookies og JWT i requesten.
        if (!request.cookies || !request.cookies.jwt) {
            // Hvis ingen token bliver fundet, så returneres status 401.
            return response.status(401).json({ error: "Unauthorized - No token provided." });
        }

        // Hente JWT Token fra cookiesne (fra requesten)
        const token = request.cookies.jwt;

        // Verificering af JWT Token med JWT Secret key.
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "BUqC1n1xRU2D1iVbWyfLgA=="); //Denne kan opdateres senere (Under produktion)

        // Tjekker om decoding fungerede
        if (!decoded) {
            // Hvis ikke, returneres respons 401.
            return response.status(401).json({ error: "Unauthorized - Invalid token" });
        }

        // Her finder den brugeren der er associeret med den decodede UserId.
        const user = await prisma.user.findById(decoded.userId).select("-password"); 

        // Tjekker om brugeren eksisterer (om den er null)
        if (!user) {
            // Hvis ikke, bliver en status 404 returneret som respons.
            return response.status(404).json({ error: "User not found" });
        }

        // Hvis brugeren eksisterer bliver user objektet slået sammen med request objektet
        request.user = user;

        // Next funktionen sørge for at denne næste middleware i rækken bliver kørt.
        next();
    } catch (error) {
        // Error tjek
        console.log("Error in protectRoute middleware:", error.message);

        response.status(500).json({ error: "Internal server error" });
    }
}

export default protectRoute;
