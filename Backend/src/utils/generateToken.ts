import jwt from 'jsonwebtoken';
import "dotenv/config";
import type { Response } from 'express';

const generateTokenAndSetCookie = (userId : number, res : Response) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET || "BUqC1n1xRU2D1iVbWyfLgA==", {
        expiresIn:'60d'
    });

    //Development check
    const devMode = true;
    
    res.cookie("jwt",token,{
        maxAge: 15 * 24 *60 * 60 * 1000, //Millisekunder
        httpOnly: true, //Sikkerhed mod XSS angreb
        sameSite:"strict",
        secure: devMode === true
        
    }); 
};

export default generateTokenAndSetCookie;