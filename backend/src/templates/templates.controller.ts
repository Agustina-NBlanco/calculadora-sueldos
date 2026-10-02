import { Request, Response } from "express";
import { CreateTemplateDto, UpdateTemplateDto } from "./templates.dto";
import {
    createTemplate as createTemplateService,
    getTemplates as getTemplatesService,
    getTemplateById as getTemplateByIdService,
    updateTemplate as updateTemplateService,
    deleteTemplate as deleteTemplateService
} from "./templates.service";


export const createTemplate = async (req: Request<{}, {}, CreateTemplateDto>, res: Response) => {
    const dto = req.body
    const userId = req.user!.id

    const template = await createTemplateService(userId, dto)

    return res.status(201).json(template)
}

export const getTemplates = async (req: Request, res: Response) => {
    const userId = req.user!.id;

    const templates = await getTemplatesService(userId);

    return res.status(200).json(templates);
}

export const getTemplateById = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;

    const template = await getTemplateByIdService(userId, id);

    return res.status(200).json(template);
}

export const updateTemplate = async (req: Request<{ id: string }, {}, UpdateTemplateDto>, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;
    const dto = req.body;

    const template = await updateTemplateService(userId, id, dto);

    return res.status(200).json(template);
}

export const deleteTemplate = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;

    await deleteTemplateService(userId, id);

    return res.status(204).send();
}