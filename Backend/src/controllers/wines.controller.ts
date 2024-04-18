import { db } from "../drizzle/db";
import { eq } from "drizzle-orm";
import { wines } from "../drizzle/schema";
import type { Request, Response } from "express";


export const createWines = async (request: Request, response: Response) => {
    try {

        //Disse er de data som serveren skal bruge til når en bruger skal oprette en ny bruger.
        //Dem får man fra Request bodien. Matchende ting (som fulName fx) gemmes hvor de skal gemmes.
        const { name, country, region, prodyear, producer, alcohol, type, grape, price, currency } = request.body;

        // Validering af Request Body
        if (!name || !country || !region || !prodyear || !producer || !alcohol || !type || !grape || !price || !currency) {
            return response.status(400).json({ error: 'Ugyldige requests fra Request body.' });
        }



        //Her ser man om vinen allerede eksisterer i databasen. 
        const wineToFind = await db.query.wines.findFirst({
            where: eq(wines.name, name),
        });


        //Hvis denne brugernavn og bruger eksisterer i databasen, må man ikke oprette sig under samme navn.
        if (wineToFind) {
            return response.status(400).json({ error: "Vin med dette navn eksisterer allerede" });
        }


        //Den nye bruger oprettes i første omgang på serveren (som objekt)
   

        //Hvis alt er vel oprettes der en JWT token og brugeren gemmes i databasen.
       

            const newWineCreation = await db.insert(wines).values({
                
                name: name,
                country: country,
                region: region,
                prodyear: prodyear.toString(),
                producer: producer,
                alcohol: alcohol,
                type: type,
                grape: grape,
                price: price,
                currency: currency

            }).returning({
                wineName: wines.name,
                id: wines.id,
                wineRegion: wines.region,
           
            });

            // const newWine = newWineCreation[0];
            response.status(201).json({ created: "yes"});


    } catch (error) { //I tilfælde af server fejl.
        console.log(error);
        response.status(500).json({ fejl: "BAD!", error: error });
    }



}


export const getAllWines = async (request: Request, response: Response) => {
    try {

        db.query.wines.findMany().then((wines) => {
            response.json(wines);
        });



    } catch (error) {
        console.error('ERROR: Getting Wine (getWines)', error);
        response.status(500).json({ error: 'Intern Server Fejl' });
    }
}