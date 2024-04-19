import type { Request, Response } from "express";
import { db } from "../drizzle/db";
import { evaluations, wset } from "../drizzle/migrations/schema";
import { eq } from "drizzle-orm";

export const getAllEvaluations = async (request: Request, response: Response) => {
    try {



    } catch (error) {

    }

}

export const createEvaluation = async (request: Request, response: Response) => {
    try {
        const { name, wineId, tastingId  } = request.body;

        // Validering af Request Body
        if (  !name || !wineId || !tastingId) {
            return response.status(400).json({ error: 'Ugyldige requests fra Request body.' });
        }

        const userId = request.user?.id;

        const createEvaluation = await db.insert(evaluations).values({

            note: "",
            wsetid: null, //Tilføjes først senere
            name: name,
            tastingid: tastingId,
            stars: null, //Tilføjes først senere
            userid: request.user?.id,
            wineid: wineId




        }).returning({

            id: evaluations.id,
            name: evaluations.name
        });

        const newEvaluation = createEvaluation[0];

        if (createEvaluation) {
            response.status(201).json({ tasting: newEvaluation.name, id: newEvaluation.id });
        } else {
            response.status(500).json({ fejl: "Vurdering Blev ikke oprettet" });
        }


    } catch (error) {

    }

}