import { Router } from "express";
import { createCalculation, deleteCalculation, getCalculationById, getCalculations, updateCalculation } from "./calculations.controller";
import { validateDto } from "../middlewares/validateDto";
import { CreateCalculationDto, UpdateCalculationDto } from "./calculations.dto";


const router: Router = Router();

router.post("/", validateDto(CreateCalculationDto), createCalculation);
router.get("/", getCalculations);
router.get("/:id", getCalculationById);
router.patch("/:id", validateDto(UpdateCalculationDto), updateCalculation);
router.delete("/:id", deleteCalculation);


export default router