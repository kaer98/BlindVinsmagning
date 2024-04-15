import { PrismaClient } from '@prisma/client';



//Controller for Users routen

/*
Mangler i Users:
- Der skal tilføjes hashing.

*/



const prisma = new PrismaClient();


//GET Request: Henter alle brugere der er gemt i databasen
export const getUsers = async (request, response) => {
    try {
        const allUsers = await prisma.user.findMany({
            select: {
                id: true,
                fullName: true,
                gender: true,
                birthday: true,
                username: true, //true betyder at den sender data.
                password: false //false betyder at den ikke sender det valgte data som respons (adgangskode her)
                
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

//GET Request: Henter én specifik bruger (med User ID)
export const getUserById = async (request, response) => {
    try {

        const userId = parseInt(request.params.id);


        const user = await prisma.user.findFirst({
            where: {
                id: userId
            },

            select: {
                id: true,
                fullName: true,
                gender: true,
                birthday: true,
                username: true, //true betyder at den sender data.
                password: false //false betyder at den ikke sender det valgte data som respons (adgangskode her)
                
            }
        });

        if (user) {
            response.send(user);
        } else {
            response.status(404).send("Bruger ikke fundet");
        }
    } catch (error) {
        console.error('ERROR: Getting User By Id (getUserById)', error);
        response.status(500).json({ error: 'Intern Server Fejl' });
    }

}

//POST Request: Oprettelse af bruger (Dog er denne kun for administrator. Alm brugere vil bruge /api/auth routen)
export const createUser = async (request, response) => {
    try {
        const { fullName, birthday, gender, username, password } = request.body;

        // Validering af Request Body
        if (!fullName || !birthday || !gender || !username || !password ) {
            return response.status(400).json({ error: 'Ugyldige requests fra Request body.' });
        }

        // Oprettelse af ny bruger
        const newUser = await prisma.user.create({
            data: {
                fullName,
                birthday: new Date(birthday),
                gender,
                username,
                password

            }
        });

        // Den oprettede bruger sendes tilbage som respons til klienten.
        response.json(newUser);
    } catch (error) {
        // Interne fejl.
        console.error('ERROR: Creating User (createUser)', error);
        response.status(500).json({ error: 'Intern Server Fejl' });
    }
};

//DELETE Request: Sletning af Bruger (Kun for administratorer)
export const deleteAllUsers = async (request, response) => {
    try {
        const deleteResult = await prisma.user.deleteMany({});
        if (deleteResult.count > 0) {
            response.status(200).json({ message: "All users deleted" });
        } else {
            response.status(404).json({ message: "No users found to delete" });
        }
    } catch (error) {
        console.error('ERROR: Deleting All Users (deleteAllUsers)', error);
        response.status(500).json({ error: 'Intern Server Fejl' });
    }
}

//DELETE Request: Sletning af én bruger (Kun for administratorer)
export const deleteUserById = async (request, response) => {

    try {

        const userId = parseInt(request.params.id);

        const userToDelete = await prisma.user.findFirst({
            where: {
                id: userId,
            }

        });

        if (!userToDelete) {
            response.status(404).json({ message: `Fejl: Bruger med ID: '${userId}' eksisterer ikke` });

        }
        else if (userToDelete) {
            response.status(201).json({ message: `Sucessfully deleted user '${userToDelete.name}' with Id: ${userToDelete.id}` }); qq
        }

    } catch (error) {
        console.error('ERROR: Deleting User By Id (deleteUserById)', error);
        response.status(500).json({ error: 'Intern Server Fejl' });
    }
}

//PUT Request: Rediger data i smagning (Ikke udviklet endnu)
export const editUser = async (request, response) => {

}