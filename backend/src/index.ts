import { AppDataSource } from "./config/data-source";
import { ENV } from "./config/env";
import app from "./server";

const startServer = () => {
    app.listen(ENV.PORT, () => {
        console.log(`Server is running on port ${ENV.PORT}`);
    })
}

const initializeServer = async () => {
    try {
        await AppDataSource.initialize()
        console.log("Conexión a la base de datos establecida")
        startServer()
    } catch (error) {
        console.error("Error al inicializar el servidor:", error)
        process.exit(1)
    }
}

initializeServer()