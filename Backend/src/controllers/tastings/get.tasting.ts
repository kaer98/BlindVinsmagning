import { db } from "../../drizzle/db.ts";
import { eq } from "drizzle-orm";
import { winetastings, users, tastingwines, tastingparticipants } from "../../drizzle/migrations/schema.ts";
import type { Request, Response } from "express";
import type { User } from "../../dtos/user.dto.ts";
import { evaluations, wines } from "../../drizzle/schema.ts";
import { alias } from "drizzle-orm/pg-core/alias";
import { parse } from "dotenv";

export const getAllTastings = async (request: Request, response: Response) => {
    try {


        const tastings = await db.query.winetastings.findMany();
        response.json(tastings);





    } catch (error) {
        console.error('ERROR: Getting Wine (getWines)', error);
        response.status(500).json({ error: 'Intern Server Fejl' });
    }
}


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
