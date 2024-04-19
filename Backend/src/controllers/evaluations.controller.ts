// import type { Request, Response } from "express";
// import { db } from "../drizzle/db";
// import { evaluations, wset } from "../drizzle/schema";
// import { eq } from "drizzle-orm";

// export const getAllEvaluations = async (request: Request, response: Response) => {
//     try {



//     } catch (error) {

//     }

// }

// export const createEvaluation = async (request: Request, response: Response) => {
//     try {
//         const { note, name, tastingId } = request.body;

//         // Validering af Request Body
//         if (!note || !name || !tastingId) {
//             return response.status(400).json({ error: 'Ugyldige requests fra Request body.' });
//         }

//         const createEvaluation = await db.insert(evaluations).values({

//             note: note,
//             wsetid: null,
//             name: name,
//             tastingid: tastingId,
//             stars: null,
//             userid: request.user?.id




//         }).returning({

//         });




//         if (evaluationToFind) {
//             return response.status(400).json({ error: "Evaluering med dette navn eksisterer allerede" });
//         }


//     } catch (error) {

//     }

// }