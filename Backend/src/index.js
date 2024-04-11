import express from 'express';
import { Sequelize } from 'sequelize';


const app = express();

//Burde nok laves som environmental variable
const port = 3001;

//Connection String
const sequelize = new Sequelize('mysql://wine:i4g5WNxi5KBr8s@hjem.jazper.dk:3306/WINE_DB');

try {
  await sequelize.authenticate();
  console.log('Connection to DB Sucessfull');
} catch (error) {
  console.error('Connection to DB Failed', error);
}




app.listen(port, () => {
  console.log(`Listening on port ${port})...`);
});