import { Sequelize } from "sequelize";

const connectToMySQL = async () => {

    const DB_STRING = process.env.DB_STRING  || 'mysql://wine:i4g5WNxi5KBr8s@hjem.jazper.dk:3306/WINE_DB';

    const sequelize = new Sequelize(DB_STRING);

    try {
        await sequelize.authenticate();
        console.log('Connection to DB Sucessfull');
    } catch (error) {
        console.error('Connection to DB Failed', error);
    }
}

export default connectToMySQL;