//Imports
import express, { NextFunction, Request, Response } from 'express'

//Routes Imports
import usersRoute from './routes/users.route'

const app = express();

//Routes
app.use('/api/users', usersRoute);


const PORT = 3000;


app.get('/', (request: Request, response: Response, next: NextFunction) => {
    response.send([]);

});

app.listen(PORT, () => {

    console.log(`Server kører på PORT (lol): ${PORT}`);
});