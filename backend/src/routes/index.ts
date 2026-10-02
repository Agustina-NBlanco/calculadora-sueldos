import { Router } from "express";
import templatesRouter from "../templates/templates.routes"
import calculationsRouter from "../calculations/calculations.routes";
import authRouter from "../auth/auth.routes"

const router: Router = Router();

router.use("/templates", templatesRouter);
router.use("/calculations", calculationsRouter);
router.use("/auth", authRouter)

export default router