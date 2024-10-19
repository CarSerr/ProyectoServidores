import { Sequelize } from "sequelize-typescript";
import { Tarea } from "./models/tarea.model";
import { envs } from "../config/envs";

const db = new Sequelize ({
    database: envs.MYSQL_DB,
    username: envs.MYSQL_USER,
    password: envs.MYSQL_PASSWORD,
    host: envs.MYSQL_HOST,
    port: envs.MYSQL_PORT,
    dialect: 'mysql',
    models: [Tarea]
});

export const dbConnection = async () => {
    try {
        await db.sync({ force: false });
        console.log("Database connected");
    } catch(error) {
        console.error(`Èrror connecting to Database ${error}`);
    }
}