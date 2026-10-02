import { Router } from "express";
import { login, register } from "./auth.controller";
import { asyncHandler } from "../middlewares/asyncHandler";

const router: Router = Router()

router.post("/register", asyncHandler(register))
router.post("/login", asyncHandler(login))



export default router