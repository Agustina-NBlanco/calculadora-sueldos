import "dotenv/config"

function getEnv(name: string) {
    const value = process.env[name]
    if (!value) throw new Error(`Missing environment variable: ${name}`)
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
}