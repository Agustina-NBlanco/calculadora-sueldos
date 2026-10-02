import { Router } from "express";
import templatesRouter from "../templates/templates.routes"
import calculationsRouter from "../calculations/calculations.routes";

const router: Router = Router();

router.use("/templates", templatesRouter);
router.use("/calculations", calculationsRouter);

export default router