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
        const allTastings = await prisma.winetasting.findMany();

        response.json(allTastings);

    } catch {
        console.error('ERROR: Getting WineTasting (getTastings)', error);
        response.status(500).json({ error: 'Intern Server Fejl' });
    }

}

//POST Request: Oprettelse af smagning (Kun for administratorer)
export const createTasting = async (request, response) => {

}

//DELETE Request: Sletning af smagning (Kun for administratorer)
export const deleteTasting = async (request, response) => {


}

//PUT Request: Rediger data i smagning
export const editTasting = async (request, response) => {


}