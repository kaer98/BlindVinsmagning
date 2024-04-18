import type { Request, Response } from "express";
import { db } from "../drizzle/db";
import { users } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const getUsers = async (request : Request, response : Response) => {
    try {
       
          db.query.users.findMany().then((users) => {
                response.json(users);
            });
        

    } catch (error) {
        console.error('ERROR: Getting User (getUsers)', error);
        response.status(500).json({ error: 'Intern Server Fejl' });
    }
}

export const getUserById = async (request : Request, response : Response) => {
    try {

        const usersId = parseInt(request.params.id);


        const userToFind = await db.query.users.findFirst({
            where: eq(users.id, usersId),
        });

        if (userToFind) {
            response.send(userToFind);
        } else {
            response.status(404).send("Bruger ikke fundet");
        }
    } catch (error) {
        console.error('ERROR: Getting User By Id (getUserById)', error);
        response.status(500).json({ error: 'Intern Server Fejl' });
    }

}


export const deleteAllUsers = async (request : Request, response : Response) => {
    try {
        const deleteResult = await db.delete(users);
            
        if (deleteResult.count > 0) {
            response.status(200).json({ message: "All userss deleted" });
        } else {
            response.status(404).json({ message: "No userss found to delete" });
        }
    } catch (error) {
        console.error('ERROR: Deleting All Users (deleteAllUsers)', error);
        response.status(500).json({ error: 'Intern Server Fejl' });
    }
}

export const deleteUserById = async (request : Request, response : Response) => {
    try {
        const deleteResult = await db.delete(users).where(eq(users.id, parseInt(request.params.id)));
            
        if (deleteResult.count > 0) {
            response.status(200).json({ message: "User Deleted" });
        } else {
            response.status(404).json({ message: "User does not exist or was already deleted." });
        }
    } catch (error) {
        console.error('ERROR: Deleting All Users (deleteAllUsers)', error);
        response.status(500).json({ error: 'Intern Server Fejl' });
    }
}