import { db } from "../../drizzle/db.ts";
import { eq } from "drizzle-orm";
import { winetastings, users, tastingwines, tastingparticipants } from "../../drizzle/migrations/schema.ts";
import type { Request, Response } from "express";
import type { User } from "../../dtos/user.dto.ts";
import { evaluations, wines } from "../../drizzle/schema.ts";
import { alias } from "drizzle-orm/pg-core/alias";
import { parse } from "dotenv";


//Exports

//Oprettelse af smagning
export { createTasting } from "../../controllers/tastings/create.tasting.ts";
export { getAllTastings, getTastingById } from "../../controllers/tastings/get.tasting.ts";


//Oprettelse af tasting



export const deleteTastingById = async (request: Request, response: Response) => {
    try {


    } catch (error) {
        console.error('ERROR: Deleting Tasting By Id (deleteTastingById)', error);
        response.status(500).json({ error: 'Intern Server Fejl' });
    }


}

export const joinTasting = async (request: Request, response: Response) => {
    try {
        // Validation of Request Body (Whether you are logged in or not)
        if (!request.user?.id) {
            return response.status(401).json({ error: "Du skal være logget ind for at deltage" });
        }

        // User Id som vi får fra request.user
        const userId = request.user.id;

        // Smagnings ID som vi får fra request.params
        const tastingId = parseInt(request.params.id);

        // Finder deltager
        const host = alias(users, "host");

        const tastingToFind = await db.select(
            {
                tastingName: winetastings.name,
                tastingId: winetastings.id,
                host: host,
                finished: winetastings.finished,
                date: winetastings.date,
                visibility: winetastings.visibility,

                tastingWines: wines,
                tastingParticipants: {
                    userId: users.id,
                    username: users.username,
                    fullname: users.fullname,
                },

                evaluationsList: evaluations
            }
        ).from(winetastings).where(eq(winetastings.id, tastingId))
            .leftJoin(tastingwines, eq(tastingwines.tastingid, tastingId))
            .leftJoin(wines, eq(tastingwines.wineid, wines.id))
            .leftJoin(tastingparticipants, eq(tastingparticipants.tastingid, tastingId))
            .leftJoin(users, eq(tastingparticipants.userid, users.id))
            .leftJoin(host, eq(winetastings.hostid, host.id))
            .leftJoin(evaluations, (eq(evaluations.tastingid, tastingId), eq(evaluations.userid, userId)))
            .execute();

        if (!tastingToFind) {
            return response.status(404).json({ error: "Smagning ikke fundet" });
        }

        // Hent alle deltagere
        const participantsFromDb = tastingToFind.map((participant: any) => participant.tastingParticipants);

        // Sørger for at der ikke er duplikater (Så den ikke sender deltager 2 gange)
        const participants: any[] = [];
        participantsFromDb.forEach((participant: any) => {
            if (participant && !participants.some((p) => p.userId === participant.userId)) {
                participants.push(participant);
            }
        });

        // Hent alle vine
        const winesFromDb = tastingToFind.map((wine: any) => wine.tastingWines);

        // Sørger for at der ikke er duplikater (Så den ikke sender vinen 2 gange)
        const winesToSend: any[] = [];
        winesFromDb.forEach((wine: any) => {
            if (wine && !winesToSend.some((w) => w.id === wine.id)) {
                winesToSend.push(wine);
            }
        });



        const evaluationsToSend: any[] = [];
        const evaluationsFromDb = tastingToFind.map((evaluation: any) => evaluation.evaluationsList);
        evaluationsFromDb.forEach((evaluation: any) => {
            if (evaluation && !evaluationsToSend.some((e) => e.id === evaluation.id)) {
                evaluationsToSend.push(evaluation);
            }
        });

        // const onlyWhereTastingIdEvaluation = evaluationsToSend.some((evaluation) => {
        //     // Check for undefined properties before comparing
        //     return (
        //         evaluation?.tastingid === tastingId
        //     );
        // });

        const userEvalsOnTating = evaluationsToSend.filter(evaluation => {
            // Check for undefined properties before comparing
            return evaluation?.tastingid === tastingId;
        });


        const theTasting = tastingToFind[0];
        if (theTasting == null) {
            return response.status(404).json({ error: "Smagning ikke fundet" });
        }



        const tastingInfo = {
            tastingName: tastingToFind[0]?.tastingName,
            host: {
                id: theTasting.host.id,
                name: theTasting.host.fullname,

            },
            tastingId: tastingToFind[0]?.tastingId,
            date: tastingToFind[0]?.date,
            finished: tastingToFind[0]?.finished,
            visibility: tastingToFind[0]?.visibility,
            wineList: winesToSend,
            participants: participants,
            evaluations: userEvalsOnTating
        }

        const isParticipantExisting = tastingInfo.participants.some(participant => {
            return participant?.userId == userId;
        })

        if (isParticipantExisting) {
            return response.status(400).json({ error: "Du deltager allerede i denne smagning", tastingInfo });
        } else {
            await db.insert(tastingparticipants).values({
                tastingid: tastingId,
                userid: userId
            });

            return response.status(200).json({ message: "Deltager tilføjet", tastingInfo });
        }


    } catch (error) {
        console.error('ERROR: Joining Tasting (joinTasting)', error);
        response.status(500).json({ error: 'Intern Server Fejl' });
    }

}

// For at se hvem og hvor manger der deltager i en smagning (Ud fra smagnings ID)
export const getTastingParticipants = async (request: Request, response: Response) => {
    try {
        const tastingId = parseInt(request.params.id);

        const tastingParticipants = await db.select({
            userId: users.id,
            username: users.username,
            fullname: users.fullname,
        })
            .from(tastingparticipants)
            .leftJoin(users, eq(tastingparticipants.userid, users.id))
            .where(eq(tastingparticipants.tastingid, tastingId))
            .execute();

        var listOfParticipants: any = [];
        tastingParticipants.forEach((participant: any) => {
            listOfParticipants.push(participant);
        });



        response.json(listOfParticipants);
    } catch (error) {
        console.error('ERROR: Getting Tasting Participants (getTastingParticipants)', error);
        response.status(500).json({ error: 'Intern Server Fejl' });
    }
}

// Hent alle brugerens egne evaluations for den tasting brugeren deltager i 
export const getUserJoinedTastings = async (request: Request, response: Response) => {
    try {
        if (!request.user?.id) {
            return response.status(401).json({ error: "Du skal være logget ind for at se dine vurderinger" });
        }
        const userId = request.user.id;

        const getJoinedTastings = await db.select({
            tastings: winetastings,
            evaluations: evaluations,
        })
            .from(tastingparticipants)
            .leftJoin(winetastings, eq(tastingparticipants.tastingid, winetastings.id) && eq(tastingparticipants.userid, userId))
            .leftJoin(evaluations, eq(evaluations.tastingid, winetastings.id) && eq(evaluations.userid, userId))
            .where(eq(tastingparticipants.userid, userId) && eq(tastingparticipants.tastingid, winetastings.id))
            .execute();

        //Sørger for at der ikke er duplikater (Så den ikke sender vinen 2 gange)

        const getJoinedFix: any[] = [];
        getJoinedTastings.forEach((tasting: any) => {
            if (tasting && !getJoinedFix.some((t) => t.tastings.id === tasting.tastings.id)) {
                getJoinedFix.push(tasting);
            }
        });

        const evaluationsToSend: any[] = [];
        const evaluationsGET = getJoinedTastings.map((evaluation: any) => evaluation.evaluations);

        evaluationsGET.forEach((evaluation: any) => {
            if (evaluation && !evaluationsToSend.some((e) => e.wineid === evaluation.wineid)) {
                evaluationsToSend.push(evaluation);
            }
        });

        const tastingInfoSend = {
            tastings: getJoinedFix.map((tasting: any) => ({
                tastingId: tasting.tastings.id,
                tastingName: tasting.tastings.name,
                hostName: tasting.tastings.hostName,
                date: tasting.tastings.date,
                finished: tasting.tastings.finished,
                visibility: tasting.tastings.visibility,
                evaluations: evaluationsToSend.filter((evaluation: any) => evaluation.tastingid === tasting.tastings.id)
            })),

        }

        response.json(tastingInfoSend);


    } catch (error) {
        console.error('ERROR: Getting My Evaluations (getMyEvaluations)', error);
        response.status(500).json({ error: 'Intern Server Fejl..' });
    }
}


