import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import cookieParser from "cookie-parser"
import router from './routes';

const app = express();

app.use(express.json());
app.use(errorHandler)
app.use(cookieParser())
app.use("/api", router)
export default app;