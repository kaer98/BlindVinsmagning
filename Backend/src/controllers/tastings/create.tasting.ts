import { db } from "../../drizzle/db.ts";
import { eq } from "drizzle-orm";
import { winetastings, tastingwines, } from "../../drizzle/migrations/schema.ts";
import type { Request, Response } from "express";



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