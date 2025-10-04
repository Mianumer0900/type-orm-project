import "reflect-metadata"
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";


dotenv.config();
const {DB_HOST , DB_USER , DB_PASSWORD ,DB_PORT , DB_DATABASE} = process.env;
export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST || "localhost",
    port: 5432,
    username: DB_USER || "postgres",
    password: DB_PASSWORD || "MianUmer1998",
    database: DB_DATABASE || "mern_crud",
    synchronize: false,
    logging: false,
    entities:["src/entity/**/*.ts"],
    migrations:["src/migration/**/*.ts"]
})


