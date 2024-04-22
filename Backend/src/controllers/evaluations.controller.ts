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
        if (!request.user) { 
            return response.status(401).json({ error: 'Du skal være logget ind for at oprette en vurdering' });
        }

        const userId:any = request.user.id;
        const parsedUserId = parseInt(userId);
        const parsedTastingId = parseInt(tastingId);
        const parsedWineId = parseInt(wineId);

        const doesEvaluationForWineExist = await db.query.evaluations.findMany({
            where: eq(evaluations.userid, parsedUserId),
        });

       


      const doesItExist = doesEvaluationForWineExist.some((evaluation) => {
            // Check for undefined properties before comparing
            return (
                evaluation?.tastingid === tastingId &&
                evaluation?.wineid === wineId &&
                evaluation?.userid === userId
            );
        });

        if(doesItExist) { 
            return response.status(400).json({ error: 'DIN Vurdering for denne vin i denne smagning eksisterer allerede' });
        } 
        

        const createEvaluation = await db.insert(evaluations).values({

            note: "",
            name: name,
            tastingid: tastingId,
            userid: request.user?.id,
            wineid: wineId,
            aintensity: null,
            nintensity: null,
            sweetness: null,
            aromacharacteristics: null,
            acidity: null,

            tannin: null,
            alcohol: null,
            body: null,
            flavourintensity: null,
            flavourcharacteristics: null,
            finish: null,
            quality: null,
            acolourintensity: null

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

export const addWset = async (request: Request, response: Response) => { 

    const { aIntensity, nIntensity, sweetness, aromacharacteristics, acidity,
        tannin, alcohol, body, flavourintensity, flavourcharacteristics, finish, quality, wineId, acolourintensity, note } = request.body;

    const tastingId = request.params.id;

    const parsedTastingId = parseInt(tastingId);
    const parsedWineId = parseInt(wineId);

    // Validering af Request Body
    // if (!tannin || !nIntensity || !sweetness || !acidity || !aromacharacteristics ||
    //     !alcohol || !body || !flavourintensity || !flavourcharacteristics || !finish || !quality) {
    //     return response.status(400).json({ error: 'Ugyldige requests fra Request body.' });
    // }

    if (!request.user) {
        return response.status(401).json({ error: 'Du skal være logget ind for at oprette en vurdering' });
    }
    const userId = request.user.id;

    const evaluationToFind = await db.query.evaluations.findFirst({
        where: ((eq(evaluations.userid, userId), eq(evaluations.tastingid, parsedTastingId), eq(evaluations.wineid, parsedWineId))),
    });

    if (!evaluationToFind) {
        return response.status(404).json({ error: 'Evaluation ikke fundet, kan ikke oprette WSET.' });
    }



    const updateEvaluation = await db.update(evaluations).set({
            
            aintensity: aIntensity,
            nintensity: nIntensity,
            sweetness,
            aromacharacteristics,
            acidity,
    
            tannin,
            alcohol,
            body,
            flavourintensity,
            flavourcharacteristics,
            finish,
            quality,
            acolourintensity,
            note: note
           

    }).where((eq(evaluations.userid, userId), eq(evaluations.tastingid, parsedTastingId), eq(evaluations.wineid, parsedWineId)));

    if (updateEvaluation) {
        response.status(201).json(evaluationToFind.name + " er blevet opdateret");
    } else {
        response.status(500).json({ fejl: "WSET Blev ikke oprettet" });
    }

}

// export const createAndAddWset = async (request: Request, response: Response) => {

//     try {
//         //Create WSET and add the WSET to the Evaluation that matches the USer ID
//         const { aIntensity, nIntensity, sweetness, aromacharacteristics, acidity,
//             tannin, alcohol, body, flavourintensity, flavourcharacteristics, finish, quality, wineId } = request.body;

//         const tastingId = request.params.id;
        
//         const parsedTastingId = parseInt(tastingId);
//         const parsedWineId = parseInt(wineId);


//         // Validering af Request Body
//         if (!tannin || !nIntensity || !sweetness || !acidity || !aromacharacteristics ||
//             !alcohol || !body || !flavourintensity || !flavourcharacteristics || !finish || !quality) {
//             return response.status(400).json({ error: 'Ugyldige requests fra Request body.' });
//         }

//         if (!request.user) {
//             return response.status(401).json({ error: 'Du skal være logget ind for at oprette en vurdering' });
//         }
//         const userId = request.user.id;

//         const evaluationToFind = await db.query.evaluations.findFirst({
//             where: (eq(evaluations.userid, userId), eq(evaluations.tastingid, parsedTastingId), eq(evaluations.wineid, parsedWineId)),
//         });


//         if (!evaluationToFind) {
//             return response.status(404).json({ error: 'Evaluation ikke fundet, kan ikke oprette WSET.' });
//         }

//         const createWset = await db.insert(wset).values({
//             aintensity: aIntensity,
//             nintensity: nIntensity,
//             sweetness,
//             aromacharacteristics,
//             acidity,

//             tannin,
//             alcohol,
//             body,
//             flavourintensity,
//             flavourcharacteristics,
//             finish,
//             quality,
//             userid: userId,
//             tastingid: parsedTastingId,
//             wineid: wineId

//         }).returning({

//             id: wset.id,
//             tastingId: wset.tastingid,
//             wineId: wset.wineid

//         });

//         const newWset = createWset[0];

//         const updateEvaluation = await db.update(evaluations).set({

//             wsetid: newWset.id

//         }).where((eq(evaluations.userid, userId), eq(evaluations.tastingid, parsedTastingId), eq(evaluations.wineid, parsedWineId)));



//         if (createWset) {
//             response.status(201).json({ message: `WSET with ID: ${newWset.id} added to ${evaluationToFind.name} with ID ${evaluationToFind.id}` });
//         } else {
//             response.status(500).json({ fejl: "WSET Blev ikke oprettet" });
//         }



//     } catch (error) {

//     }
// }