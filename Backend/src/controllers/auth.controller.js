import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from "../utils/generateToken.js";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


//Sign Up Endpoint
export const signup = async (request, response) => {
    try {

        //Disse er de data som serveren skal bruge til når en bruger skal oprette en ny bruger.
        //Dem får man fra Request bodien. Matchende ting (som fulName fx) gemmes hvor de skal gemmes.
        const { fullName, birthday, gender, username, password, confirmPassword } = request.body;

        // Validering af Request Body
        if (!fullName || !birthday || !gender || !username || !password || !confirmPassword ) {
            return response.status(400).json({ error: 'Ugyldige requests fra Request body.' });
        }


        //Her tjekker serveren om confirm adgangskoden matcher med adgangskoden.
        if (password !== confirmPassword) {
            return response.status(400).json({ error: "Password don't match" });
        }

        //Her finder vi en bruger fra databasen med samme brugernavn som den indtastede brugernavn fra req body
        const user = await prisma.user.findFirst({
            where: {
                username: username
            }
        });

        //Hvis denne brugernavn og bruger eksisterer i databasen, må man ikke oprette sig under samme navn.
        if (user) {
            return response.status(400).json({ error: "Username already exists" });
        }

        // Hash Password 
        //Vi bruger en salt med en værdi på 10.
        const salt = await bcrypt.genSalt(10);

        //Den hashede adgangskode. Bruger den indtastede adgangskode sammen med salten
        //Det vigtiste er at DEN RIGTIGE adgangskode aldrig når databasen.
        const hashedPassword = await bcrypt.hash(password, salt);

        //Den nye bruger oprettes i første omgang på serveren (som objekt)
        const newUserObject = {
            
                fullName,
                birthday: new Date(birthday),
                gender,
                username,
                password: hashedPassword

            
        };
        

        //Hvis alt er vel oprettes der en JWT token og brugeren gemmes i databasen.
        if (newUserObject) {

            generateTokenAndSetCookie(newUserObject.id, response);
            const newUser = await prisma.user.create({
                data: newUserObject
            });
            response.status(201).json({ id: newUser.id, fullName: newUser.fullName, username: newUser.username, birthday: newUser.birthday });
        }
        else { //I tilfælde af brugerfejl.
            response.status(400).json({ error: "Invalid User Data" });
        }

    } catch (error) { //I tilfælde af server fejl.
        console.log(error);
        response.status(500).json({ clown: "BAD!", error: error.message });
    }



}

//Login Endpoint
export const login = async (request, response) => {
    try {

        //Her får serveren inputs fra brugeren (sendes med request body) og gemmer dem i en const.
        const { username, password } = request.body;

        //Her tjekker serveren om brugeren eksisterer i databasen eller ej
        const user = await prisma.user.findFirst({
            where: {
                username: username
            }
        });

        //Her tjekker vi om adgangskoden er korrekt eller ikke
        //Det der sker her med bcrypt er at vi sammenligner password vi modtager med password i databasen. 
        //Hvis brugeren ikke eksisterer er der empty string for at man ikke får fejlbeskeder.
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        //Og hvis der er nogle fejl, bruges denne.
        if (!user || !isPasswordCorrect) {
            return response.status(400).json({ error: "Invalid Username or Password" });
        }

        generateTokenAndSetCookie(user.id, response);


        //Hvis der er sucess, så sendes denne respons tilbage til klienten.
        response.status(200).json({
            id: user.id,
            fullName: user.fullName,
        });


    } catch (error) {
        console.log("Error login controller", error.message);
        response.status(500).json({ error: "Internal Server Error" });
    }
}

export const logout = async (request, response) => {
    try {
        response.cookie("jwt", "", { maxAge: 0 });
        response.status(200).json({ message: "Logged out!" });

    } catch (error) {
        console.log("Error logout controller", error.message);
        response.status(500).json({ error: "Internal Server Error" });
    }
}

