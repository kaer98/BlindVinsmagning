import type { Request, Response } from "express";
import { db } from "../drizzle/db";
import { evaluations, wset } from "../drizzle/migrations/schema";
import { eq } from "drizzle-orm";

export const getAllEvaluations = async (request: Request, response: Response) => {
    try {

        db.query.evaluations.findMany().then((evaluations) => {
            response.json(evaluations);
        });


    } catch (error) {

    }

}

export const createEvaluation = async (request: Request, response: Response) => {
    try {
        const { name, wineId, tastingId } = request.body;

        // Validering af Request Body
        if (!name || !wineId || !tastingId) {
            return response.status(400).json({ error: 'Ugyldige requests fra Request body.' });
        }

        const userId = request.user?.id;

        const createEvaluation = await db.insert(evaluations).values({

            note: "",
            wsetid: null, //Tilføjes først senere
            name: name,
            tastingid: tastingId,
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

export const createAndAddWset = async (request: Request, response: Response) => {

    try {
        //Create WSET and add the WSET to the Evaluation that matches the USer ID
        const { aIntensity, nIntensity, sweetness, aromacharacteristics, acidity,
            tannin, alcohol, body, flavourintensity, flavourcharacteristics, finish, quality } = request.body;

        const tastingId = request.params.id;
        const parsedTastingId = parseInt(tastingId);


        // Validering af Request Body
        if (!tannin || !nIntensity || !sweetness || !acidity || !aromacharacteristics ||
            !alcohol || !body || !flavourintensity || !flavourcharacteristics || !finish || !quality) {
            return response.status(400).json({ error: 'Ugyldige requests fra Request body.' });
        }

        if (!request.user) {
            return response.status(401).json({ error: 'Du skal være logget ind for at oprette en vurdering' });
        }
        const userId = request.user.id;

        const evaluationToFind = await db.query.evaluations.findFirst({
            where: (eq(evaluations.userid, userId), eq(evaluations.tastingid, parsedTastingId)),
        });


        if (!evaluationToFind) {
            return response.status(404).json({ error: 'Evaluation ikke fundet, kan ikke oprette WSET.' });
        }

        const createWset = await db.insert(wset).values({
            aintensity: aIntensity, nintensity: nIntensity, sweetness, aromacharacteristics, acidity,
            tannin, alcohol, body, flavourintensity, flavourcharacteristics, finish, quality

        }).returning({

            id: wset.id,

        });

        const newWset = createWset[0];

        const updateEvaluation = await db.update(evaluations).set({

            wsetid: newWset.id

        }).where((eq(evaluations.userid, userId), eq(evaluations.tastingid, parsedTastingId)));



        if (createWset) {
            response.status(201).json({ message: `WSET with ID: ${newWset.id} - Created and added to your Evaluation!` });
        } else {
            response.status(500).json({ fejl: "WSET Blev ikke oprettet" });
        }



    } catch (error) {

    }
}