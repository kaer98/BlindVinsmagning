import { db } from "../drizzle/db";
import { eq } from "drizzle-orm";
import { winetastings, users } from "../drizzle/schema";
import type { Request, Response } from "express";
import type { User } from "../dtos/user.dto";


//Oprettelse af tasting
export const createTasting = async (request: Request, response: Response) => {
    try {
        // Disse er de data som serveren skal bruge til når en bruger skal oprette en ny bruger.
        // Dem får man fra Request bodien. Matchende ting (som fulName fx) gemmes hvor de skal gemmes.
        const { name, visibility, date, wines } = request.body;

        console.log(name, visibility, date, wines);

        // Validering af Request Body
        if (!name || !visibility || !date || !wines) {
            return response.status(400).json({ error: 'Ugyldige requests fra Request body.' });
        }

        // Her ser man om vinen allerede eksisterer i databasen. 
        const tastingToFind = await db.query.winetastings.findFirst({
            where: eq(winetastings.name, name),
        });

        // Hvis denne smagning eksisterer i databasen, må man ikke oprette en med samme navn.
        if (tastingToFind) {
            return response.status(400).json({ error: "Smagning med dette navn eksisterer allerede" });
        }

        // Den nye smagning oprettes i første omgang på serveren (som objekt)
        const newTastingCreation = await db.insert(winetastings).values({
            name: name,
            visibility: visibility,
            date: date.toString(),
            hostid: request.user?.id,
            winnerid: null,
            finished: false,
            participants: null,
            wines: wines
        });

        if (newTastingCreation) {
            response.status(201).json({ created: "yes" });
        } else {
            response.status(500).json({ fejl: "Blev ikke oprettet" });
        }
    } catch (error) { // I tilfælde af server fejl.
        console.log(error);
        response.status(500).json({ fejl: "BAD!", error: error });
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

// Deltag i smagning
export const joinTasting = async (request: Request, response: Response) => {
    try {

        // Validering af Request Body (Om du er logget ind eller ej)
        if (!request.user?.id) {
            return response.status(401).json({ error: "Du skal være logget ind for at deltage" });
        }

        //User Id som vi får fra request bodien   
        const userId = request.user.id;

        // Smagning Id som vi får fra request bodien
        const tastingId = parseInt(request.params.id);

        // Smagningens deltagere
        let participants: any;


        const tastingToFind = await db.query.winetastings.findFirst({
            where: eq(winetastings.id, tastingId),
        });

        if (!tastingToFind) {
            return response.status(404).json({ error: "Smagning ikke fundet" });
        }

        participants = tastingToFind.participants;

        const joinUser = await db.query.users.findFirst({
            where: eq(users.id, request.user.id)
        });



        if (participants?.includes(userId)) {
            return response.status(400).json({ error: "Du deltager allerede i denne smagning" });

        } else if (!participants?.includes(userId)) {

            participants?.push(userId);
            const updatedTasting = await db.update(winetastings).set({ participants: participants }).where(eq(winetastings.id, tastingId));

            response.status(200).json({ message: "Deltager tilføjet" });

        } else {
            response.status(404).json({ error: "Noget gik galt." });

        }
    } catch (error) {
    console.error('ERROR: Joining Tasting (joinTasting)', error);
    response.status(500).json({ error: 'Intern Server Fejl' });
}
}
