import "dotenv/config"
import { AppError } from "../utils/AppError"

function getEnv(name: string) {
    const value = process.env[name]
    if (!value) throw new AppError(`Faltar la variable de entorno: ${name}`, 500)
    return value
}

export const ENV = {
    PORT: process.env.PORT || 3001,
    DB_HOST: getEnv("DB_HOST"),
    DB_PORT: Number(getEnv("DB_PORT")),
    DB_USERNAME: getEnv("DB_USERNAME"),
    DB_PASSWORD: getEnv("DB_PASSWORD"),
    DB_NAME: getEnv("DB_NAME"),
    FRONTEND_URL: getEnv("FRONTEND_URL"),
    NODE_ENV: getEnv("NODE_ENV"),
    JWT_SECRET: getEnv("JWT_SECRET")
}