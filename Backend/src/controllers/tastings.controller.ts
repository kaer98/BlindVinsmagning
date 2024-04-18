import { db } from "../drizzle/db";
import { eq } from "drizzle-orm";
import { winetastings } from "../drizzle/schema";
import type { Request, Response } from "express";



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
            date: new Date(date).toString(),
            hostid: 1,
            winnerid: 1,
            finished: false,
            participants: [1],
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