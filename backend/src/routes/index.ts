import { Router } from "express";
import templatesRouter from "../templates/templates.routes"
import calculationsRouter from "../calculations/calculations.routes";
import authRouter from "../auth/auth.routes"
import { authMiddleware } from "../middlewares/auth";

const router: Router = Router();

router.use("/auth", authRouter)
router.use("/templates", authMiddleware, templatesRouter);
router.use("/calculations", authMiddleware, calculationsRouter);

export default router