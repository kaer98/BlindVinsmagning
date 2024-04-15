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
                name: true,
                isMale: true,
                birthday: false,
            }

        });

        let filteredUsers = [];

        allUsers.forEach(user => {

            let gender = "";
            if (user.isMale === false) {
                gender = "Female";
            }
            else if (user.isMale === true) {
                gender = "Male";
            }

            filteredUsers.push({name: user.name, gender: gender});
        });



        response.json(filteredUsers);
    } catch (error) {
        console.error("Fejl ved indlæsning af brugere:", error);
        response.status(500).send("Fejl ved indlæsning af brugere");
    }
}

//GET Request: Henter én specifik bruger (med User ID)
export const getUserById = async (request, response) => {
    try {

        const userId = parseInt(request.params.id);


        const user = await prisma.user.findFirst({
            where: {
                id: userId
            }
        });

        if (user) {
            response.json(user);
        } else {
            response.status(404).send("Bruger ikke findet");
        }
    } catch (error) {
        console.error("Fejl ved indlæsning af bruger:", error);
        response.status(500).send("Fejl ved indlæsning af brugere");
    }

}

//POST Request: Oprettelse af smagning (Kun for administratorer)
export const createUser = async (request, response) => {

    try {
        const { name, birthday, isMale } = request.body;

        const newUser = await prisma.user.create({
            data: {
                name,
                birthday: new Date(birthday),
                isMale
            }
        });

        response.json(newUser);

    } catch (error) {
        console.error("Fejl under oprettelse af bruger", error);
        response.status(500).send("Fejl under oprettelse af bruger");
    }





}

//DELETE Request: Sletning af smagning (Kun for administratorer)
export const deleteUser = async (request, response) => {


}

//PUT Request: Rediger data i smagning
export const editUser = async (request, response) => {


}