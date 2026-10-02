import { Router } from "express";
import { createTemplate, deleteTemplate, getTemplateById, getTemplates, updateTemplate } from "./templates.controller";
import { validateDto } from "../middlewares/validateDto";
import { CreateTemplateDto, UpdateTemplateDto } from "./templates.dto";


const router: Router = Router();

router.post("/", validateDto(CreateTemplateDto), createTemplate);
router.get("/", getTemplates);
router.get("/:id", getTemplateById);
router.patch("/:id", validateDto(UpdateTemplateDto), updateTemplate);
router.delete("/:id", deleteTemplate);

export default router