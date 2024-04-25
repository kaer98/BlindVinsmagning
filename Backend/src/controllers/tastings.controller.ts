import { db } from "../drizzle/db";
import { eq } from "drizzle-orm";
import { winetastings, users, tastingwines, tastingparticipants } from "../drizzle/migrations/schema.ts";
import type { Request, Response } from "express";
import type { User } from "../dtos/user.dto";
import { evaluations, wines } from "../drizzle/schema.ts";
import { alias } from "drizzle-orm/pg-core/alias";
import { parse } from "dotenv";
import { filter } from 'lodash';


//Oprettelse af tasting
export const createTasting = async (request: Request, response: Response) => {
    try {
        // Disse er de data som serveren skal bruge til når en bruger skal oprette en ny bruger.
        // Dem får man fra Request bodien. Matchende ting (som fulName fx) gemmes hvor de skal gemmes.
        const { name, visibility, date, wines } = request.body;

        //var winesArray = wines.split(",");

        // Validering af Request Body
        if (!name || !visibility || !date || !wines) {
            return response.status(400).json({ error: 'Ugyldige requests fra Request body.' });
        }

        if (!request.user?.id) {
            return response.status(401).json({ error: "Du skal være logget ind for at oprette en smagning" });
        }


        // Her ser man om vinen allerede eksisterer i databasen. 
        const tastingToFind = await db.query.winetastings.findFirst({
            where: eq(winetastings.name, name),

        });

        // Hvis denne smagning eksisterer i databasen, må man ikke oprette en med samme navn.
        if (tastingToFind) {
            return response.status(400).json({ error: "Smagning med dette navn eksisterer allerede" });
        }
        const userId: number = request.user?.id;




        // Den nye smagning oprettes i første omgang på serveren (som objekt)
        const newTastingCreation = await db.insert(winetastings).values({
            name: name,
            visibility: visibility,
            date: date.toString(),
            hostid: userId,
            winnerid: null,
            finished: false,



        }).returning({
            name: winetastings.name,
            id: winetastings.id,
        });

        const newTasting = newTastingCreation[0];


        //const tastingWinesArray = [];
        let newTastingWines;

        // const insertDefaultParticipant = await db.insert(tastingparticipants).values({
        //     tastingid: newTasting.id,
        //     userid: userId
        // });

        // const insertDefaultWine = await db.insert(tastingwines).values({
        //     tastingid: newTasting.id,
        //     wineid: 1
        // });


        //Tilføj Wine/Tasting Relation til tastingwines tabellen
        for (const id of wines) {
            try {
                await db.insert(tastingwines).values({
                    wineid: id,
                    tastingid: newTasting.id,
                });
            } catch (error) {
                console.error("Error inserting tasting wine:", error);
                // Handle error as needed
            }
        }




        if (newTastingCreation) {
            response.status(201).json({ tasting: newTasting.name, id: newTasting.id, tastingWines: newTastingWines });
        } else {
            response.status(500).json({ fejl: "Blev ikke oprettet" });
        }
    } catch (error) { // I tilfælde af server fejl.
        console.log(error);
        response.status(500).json({ error: error });
    }
}

// Hent alle smagninger
export const getAllTastings = async (request: Request, response: Response) => {
    try {

 
            const tastings = await db.query.winetastings.findMany();
            response.json(tastings);
        




    } catch (error) {
        console.error('ERROR: Getting Wine (getWines)', error);
        response.status(500).json({ error: 'Intern Server Fejl' });
    }
}

// Slet smagning efter ID
export const deleteTastingById = async (request: Request, response: Response) => {
    try {


    } catch (error) {
        console.error('ERROR: Deleting Tasting By Id (deleteTastingById)', error);
        response.status(500).json({ error: 'Intern Server Fejl' });
    }


}

// Hent smagning efter ID
export const getTastingById = async (request: Request, response: Response) => {
    try {
        const tastingId = parseInt(request.params.id);

        // Alias for at kunne hente hostens navn
        const host = alias(users, "host");

        const tastingToFind = await db.select(
            {
                tastingName: winetastings.name,
                tastingId: winetastings.id,
                hostName: host.fullname,
                finished: winetastings.finished,
                date: winetastings.date,
                visibility: winetastings.visibility,

                tastingWines: wines,
                tastingParticipants: {
                    userId: users.id,
                    username: users.username,
                    fullname: users.fullname,
                }
            }
        ).from(winetastings).where(eq(winetastings.id, tastingId))
            .leftJoin(tastingwines, eq(tastingwines.tastingid, tastingId))
            .leftJoin(wines, eq(tastingwines.wineid, wines.id))
            .leftJoin(tastingparticipants, eq(tastingparticipants.tastingid, tastingId))
            .leftJoin(users, eq(tastingparticipants.userid, users.id))
            .leftJoin(host, eq(winetastings.hostid, host.id))
            .execute();

        // Hent alle deltagere
        const participantsFromDb = tastingToFind.map((participant: any) => participant.tastingParticipants);

        // Sørger for at der ikke er duplikater (Så den ikke sender deltager 2 gange)
        const participants: any[] = [];
        participantsFromDb.forEach((participant: any) => {
            if (participant && !participants.some((p) => p.userId === participant.userId)) {
                participants.push(participant.userId);
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

        const tastingInfo = {
            tastingName: tastingToFind[0]?.tastingName,
            hostName: tastingToFind[0]?.hostName,
            tastingId: tastingToFind[0]?.tastingId,
            date: tastingToFind[0]?.date,
            finished: tastingToFind[0]?.finished,
            visibility: tastingToFind[0]?.visibility,
            wineList: winesToSend,
            participants: participants,
        }

        if (tastingToFind[0]?.tastingId == tastingId) {
            response.send(tastingInfo);
        } else {
            response.status(404).send("Smagning ikke fundet");
        }
    } catch (error) {
        console.error('ERROR: Getting Tasting By Id (getTastingById)', error);
        response.status(500).json({ error: 'Intern Server Fejl' });
    }

}
// Deltag i smagning
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
                hostName: host.fullname,
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



        const tastingInfo = {
            tastingName: tastingToFind[0]?.tastingName,
            hostName: tastingToFind[0]?.hostName,
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

        var infoToSend: any[] = [];
        getJoinedTastings.forEach((tasting: any) => {
            const matchingEvaluations = filter(evaluations, (evaluation: any) => evaluation.tastingid === tasting.tastings.id);
            infoToSend.push({ tasting: tasting.tastings, evaluations: matchingEvaluations });
        });

        response.send({ infoToSend: infoToSend.map((tasting: any) => tasting) });
        response.send({infoToSend: infoToSend.map((tasting: any) => tasting)});

     
    } catch(error) {
        console.error('ERROR: Getting My Evaluations (getMyEvaluations)', error);
        response.status(500).json({ error: 'Intern Server Fejl..' });
    }
}


