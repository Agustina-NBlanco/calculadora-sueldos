import { DataSource } from "typeorm";
import { ENV } from "./env";
import { User } from "../entities/User";
import { Template } from "../entities/Template";
import { Calculation } from "../entities/Calculation";
import { CalculationDiscount } from "../entities/CalculationDiscount";
import { CalculationDay } from "../entities/CalculationDay";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: ENV.DB_HOST,
    port: ENV.DB_PORT,
    username: ENV.DB_USERNAME,
    password: ENV.DB_PASSWORD,
    database: ENV.DB_NAME,
    synchronize: ENV.NODE_ENV === "development" ? true : false,
    logging: false,
    entities: [User, Template, Calculation, CalculationDiscount, CalculationDay],
    dropSchema: false
})