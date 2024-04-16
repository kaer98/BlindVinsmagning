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
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "BUqC1n1xRU2D1iVbWyfLgA==" ); //Denne kan opdateres senere (Under produktion)

        

        const user = await prisma.user.findUnique({

            where: {

                id: decoded.userId
            },

            select: {
                id: true,
                fullName: true,
                gender: true,
                birthday: true,
                username: true, //true betyder at den sender data.
                password: false //false betyder at den ikke sender det valgte data som respons (adgangskode her)
                
            }

        });

        // ...
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
