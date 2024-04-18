import { db } from "../drizzle/db";
import { eq } from "drizzle-orm";
import { winetastings } from "../drizzle/schema";
import type { Request, Response } from "express";


export const createTasting = async (request: Request, response: Response) => {
    try {

        //Disse er de data som serveren skal bruge til når en bruger skal oprette en ny bruger.
        //Dem får man fra Request bodien. Matchende ting (som fulName fx) gemmes hvor de skal gemmes.
        const { name, visibility, date, wines } = request.body;

        // Validering af Request Body
        if (!name || !visibility || !date || !wines) {
            return response.status(400).json({ error: 'Ugyldige requests fra Request body.' });
        }



        //Her ser man om vinen allerede eksisterer i databasen. 
        const tastingToFind = await db.query.winetastings.findFirst({
            where: eq(winetastings.name, name),
        });


        //Hvis denne brugernavn og bruger eksisterer i databasen, må man ikke oprette sig under samme navn.
        if (tastingToFind) {
            return response.status(400).json({ error: "Smagning med dette navn eksisterer allerede" });
        }


        //Den nye bruger oprettes i første omgang på serveren (som objekt)
   

        //Hvis alt er vel oprettes der en JWT token og brugeren gemmes i databasen.
       

            const newTastingCreation = await db.insert(winetastings).values({
                
                // name: name,
                // visibility: visibility,
                // date: date.toString(),
                // wines: parseInt(wines),
                // hostid: "1",
                name: name,
                visibility: visibility,
                date: date,
                hostid: 1,
                finished: false, 
                participants: [1],
                wines: wines,
                winnerid: 1,
                
                
                


            }).returning({
                // wineName: winetastings.name,
                // id: winetastings.id,
                // wineRegion: wines.region,
           
            });

            // const newWine = newWineCreation[0];
            if (newTastingCreation) {
            response.status(201).json({ created: "yes"});
            }
            else {
                response.status(500).json({ fejl: "Blev ikke oprettet" });
            }


    } catch (error) { //I tilfælde af server fejl.
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