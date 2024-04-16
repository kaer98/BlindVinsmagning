import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


/*
Controller for tasting routen

*/

// model WineTasting {
//     id    Int     @id @default(autoincrement())
//     title String? @db.VarChar(255)
  
//     visibility               WineTasting_visibility?
//     date                     DateTime?                  @db.Date
//     hostId                   Int?
//     winnerId                 Int?
//     finished                 Boolean?
//     User                     User?                      @relation(fields: [hostId], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "WineTasting_ibfk_1")
//     Wine                     Wine?                      @relation(fields: [winnerId], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "WineTasting_ibfk_2")
//     WineTasting_Participants WineTasting_Participants[]
//     WineTasting_Wines        WineTasting_Wines[]
  
//     @@index([hostId], map: "hostId")
//     @@index([winnerId], map: "winnerId")

//GET Request: Hent smagninger ned så deltagere kan se kommende smagninger i appen
export const getTastings = async (request, response) => {
    try {
        const allTastings = await prisma.wineTasting.findMany({
            select: {
                id: true,
                title: true,   
                visibility: true,
                date: true,
                winnerId: true,
                finished: true,
                User: true,
                Wine: true,
                WineTasting_Participants: true,
                WineTasting_Wines: true,
                hostId: true

                
            }

        });

        // let filteredUsers = [];

        // allUsers.forEach(user => {

        //     let gender = "";
        //     if (user.isMale === false) {
        //         gender = "Female";
        //     }
        //     else if (user.isMale === true) {
        //         gender = "Male";
        //     }

        // filteredUsers.push({ name: user.name, gender: gender });
        // });



        response.json(allUsers);
    } catch (error) {
        console.error('ERROR: Getting User (getUsers)', error);
        response.status(500).json({ error: 'Intern Server Fejl' });
    }

}

//POST Request: Oprettelse af smagning (Kun for administratorer)
export const createTasting = async (request, response) => {
    try {
        const { title, visibility, date } = request.body;



        // Validering af Request Body
        if (!title || !visibility || !date  ) {
            return response.status(400).json({ error: 'Ugyldige requests fra Request body.' });
        }

        // Oprettelse af ny Smagning
        const newTasting = await prisma.wineTasting.create({
            data: {
                
                title,
                visibility,
                date: new Date(date),
                hostId: request.user.id
                

             

            }
        });

        // Den oprettede bruger sendes tilbage som respons til klienten.
        response.json(newTasting);
    } catch (error) {
        // Interne fejl.
        console.error('ERROR: Creating User (createTasting)', error);
        response.status(500).json({ error: 'Intern Server Fejl' });
    }
}

//DELETE Request: Sletning af smagning (Kun for administratorer)
export const deleteTasting = async (request, response) => {


}

//PUT Request: Rediger data i smagning
export const editTasting = async (request, response) => {


}