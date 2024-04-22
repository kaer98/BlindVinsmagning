import { db } from "../drizzle/db";
import { eq } from "drizzle-orm";
import { winetastings, users, tastingwines, tastingparticipants } from "../drizzle/migrations/schema.ts";
import type { Request, Response } from "express";
import type { User } from "../dtos/user.dto";
import { wines } from "../drizzle/schema.ts";
import { alias } from "drizzle-orm/pg-core/alias";


//Oprettelse af tasting
export const createTasting = async (request: Request, response: Response) => {
    try {
        // Disse er de data som serveren skal bruge til når en bruger skal oprette en ny bruger.
        // Dem får man fra Request bodien. Matchende ting (som fulName fx) gemmes hvor de skal gemmes.
        const { name, visibility, date, wines } = request.body;

        var winesArray = wines.split(",");


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


        const tastingWinesArray = [];
        let newTastingWines;

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

        db.query.winetastings.findMany().then((winetastings) => {
            response.json(winetastings);
        });



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



        //Alias for at kunne hente hostens navn
        const host = alias(users, "host");


        const tastingToFind = await db.select(
            {
                tastingName: winetastings.name,
                tastingId: winetastings.id,
                hostName: host.fullname,


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
                if (!participants.some((p) => p.userId === participant.userId)) {
                participants.push(participant);
                }
            });

            // Hent alle vine
            const winesFromDb = tastingToFind.map((wine: any) => wine.tastingWines);

            // Sørger for at der ikke er duplikater (Så den ikke sender vinen 2 gange)
            const winesToSend: any[] = [];
            winesFromDb.forEach((wine: any) => {
                if (!winesToSend.some((w) => w === wine)) {
                winesToSend.push(wine);
                }
            });

            const tastingInfo = {
                tastingName: tastingToFind[0].tastingName,
                hostName: tastingToFind[0].hostName,
                tastingId: tastingToFind[0].tastingId,
                wineList: winesToSend,
                participants: participants
            }

      


        if (tastingToFind[0].tastingId == tastingId) {
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
        const tastingToFind = await db.query.winetastings.findFirst({
            where: eq(winetastings.id, tastingId),
        });

        if (!tastingToFind) {
            return response.status(404).json({ error: "Smagning ikke fundet" });
        }

        const participantExists = await db.query.tastingparticipants.findMany({});

        const isParticipantExisting = participantExists.some(participant => {
            return participant.userid === userId && participant.tastingid === tastingId;

        })

        if (isParticipantExisting) {
            return response.status(400).json({ error: "Du deltager allerede i denne smagning", tastinginfo: tastingToFind });
        } else {
            await db.insert(tastingparticipants).values({
                tastingid: tastingId,
                userid: userId
            });

            return response.status(200).json({ message: "Deltager tilføjet", tastinginfo: tastingToFind });
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
