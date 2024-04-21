import { db } from "../drizzle/db";
import { eq } from "drizzle-orm";
import { winetastings, users, tastingwines, tastingparticipants } from "../drizzle/migrations/schema.ts";
import type { Request, Response } from "express";
import type { User } from "../dtos/user.dto";
import { wines } from "../drizzle/schema.ts";


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
            participants: [],


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



        const tastingToFind = await db.select()
            .from(tastingwines)
            .leftJoin(winetastings, eq(tastingwines.tastingid, tastingId))
            .leftJoin(wines, eq(tastingwines.wineid, wines.id)).execute();


        if (tastingToFind) {
            response.send(tastingToFind);
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

        // User Id that we get from the request body   
        const userId = request.user.id;

        // Tasting Id that we get from the request body
        const tastingId = parseInt(request.params.id);


        const doesTastingExist = await db.query.winetastings.findFirst({

            where: eq(winetastings.id, tastingId),

        });

        if (doesTastingExist?.id !== tastingId) {
            return response.status(404).json({ error: "Smagning ikke fundet" });

        }

            // Tasting's participants
            const tastingToFind = await db.query.winetastings.findFirst({
                where: eq(winetastings.id, tastingId),
            });

            if (!tastingToFind) {
                return response.status(404).json({ error: "Smagning ikke fundet" });
            }

            const participantExists = await db.query.tastingparticipants.findMany({
            });

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

                return response.status(200).json({ message: "Deltager tilføjet"});
            }
        
    
    } catch (error) {
        console.error('ERROR: Joining Tasting (joinTasting)', error);
        response.status(500).json({ error: 'Intern Server Fejl' });
    }

}