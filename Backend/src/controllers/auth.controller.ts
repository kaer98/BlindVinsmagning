import bcrypt, { hash } from 'bcryptjs';
import type { Request, Response } from 'express';
import { db } from '../drizzle/db';
import { eq } from 'drizzle-orm'; //Tester om 2 værdier er equal.
import { user } from '../drizzle/schema';
import { serial } from 'drizzle-orm/mysql-core';
import generateTokenAndSetCookie from '../utils/generateToken';
import type postgres from 'postgres';

//Sign Up Endpoint
export const signup = async (request: Request, response: Response) => {
    try {

        //Disse er de data som serveren skal bruge til når en bruger skal oprette en ny bruger.
        //Dem får man fra Request bodien. Matchende ting (som fulName fx) gemmes hvor de skal gemmes.
        const { fullName, birthday, gender, username, password, confirmPassword } = request.body;

        // Validering af Request Body
        if (!fullName || !birthday || !gender || !username || !password || !confirmPassword) {
            return response.status(400).json({ error: 'Ugyldige requests fra Request body.' });
        }


        //Her tjekker serveren om confirm adgangskoden matcher med adgangskoden.
        if (password !== confirmPassword) {
            return response.status(400).json({ error: "Password don't match" });
        }

        //Her finder vi en bruger fra databasen med samme brugernavn som den indtastede brugernavn fra req body



        const userToFind = await db.query.user.findFirst({
            where: eq(user.username, username),
        });


        //Hvis denne brugernavn og bruger eksisterer i databasen, må man ikke oprette sig under samme navn.
        if (userToFind) {
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

            fullName: fullName,
            birthday: birthday.toString(),
            gender: gender,

            username: username,
            password: hashedPassword


        };


        //Hvis alt er vel oprettes der en JWT token og brugeren gemmes i databasen.
        if (newUserObject) {

            const newUserCreation = await db.insert(user).values(newUserObject).returning({
                id: user.id,
                fullName: user.fullName,
                username: user.username,
                birthday: user.birthday
            });

            const newUser = newUserCreation[0];

            generateTokenAndSetCookie(newUser.id, response);
            response.status(201).json({ id: newUser.id, fullName: newUser.fullName, username: newUser.username, birthday: newUser.birthday });


        }
        else { //I tilfælde af brugerfejl.
            response.status(400).json({ error: "Invalid User Data" });
        }

    } catch (error) { //I tilfælde af server fejl.
        console.log(error);
        response.status(500).json({ fejl: "BAD!", error: error });
    }



}



export const login = async (request: Request, response: Response) => {
    try {
    console.log("Kørt");
    //Her får serveren inputs fra brugeren (sendes med request body) og gemmer dem i en const.
    const { username, password } = request.body;

    //Her tjekker serveren om brugeren eksisterer i databasen eller ej.
    const userToFind = await db.query.user.findFirst({
        where: eq(username, user.username),
    });

     //Her tjekker vi om adgangskoden er korrekt eller ikke
        //Det der sker her med bcrypt er at vi sammenligner password vi modtager med password i databasen. 
        //Hvis brugeren ikke eksisterer er der empty string for at man ikke får fejlbeskeder.
        const isPasswordCorrect = await bcrypt.compare(password, userToFind?.password || "");

        if (!userToFind || !isPasswordCorrect) {
            return response.status(400).json({ error: "Invalid Username or Password" });
        }

        generateTokenAndSetCookie(userToFind.id, response);

        response.status(200).json({
            id: userToFind.id,
            fullName: userToFind.fullName,
        });

    } catch (error) {
        console.log("Error login controller", error);
        response.status(500).json({ error: "Internal Server Error" });
    }

}


export const logout = async (request: Request, response: Response) => {
    try {
        response.cookie("jwt", "", { maxAge: 0 });
        response.status(200).json({ message: "Logged out!" });

    } catch (error) {
        console.log("Error logout controller", error);
        response.status(500).json({ error: "Internal Server Error" });
    }
}