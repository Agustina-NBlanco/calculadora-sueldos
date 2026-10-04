import { AppDataSource } from "../config/data-source";
import { Template } from "../entities/Template";
import { AppError } from "../utils/AppError";
import { CreateTemplateDto, UpdateTemplateDto } from "./templates.dto";

const templateRepository = AppDataSource.getRepository(Template)

export const createTemplate = async (userId: string, dto: CreateTemplateDto): Promise<Template> => {
    const template = templateRepository.create({ ...dto, userId })

    return await templateRepository.save(template)
}

export const getTemplates = async (userId: string): Promise<Template[]> => {
    return await templateRepository.find({
        where: { userId },
        order: { createdAt: "DESC" }
    })
}

export const getTemplateById = async (userId: string, id: string): Promise<Template> => {
    const template = await templateRepository.findOne({
        where: { id, userId }
    })

    if (!template) {
        throw new AppError('Plantilla no encontrada', 404)
    }

    return template
}

export const updateTemplate = async (userId: string, id: string, dto: UpdateTemplateDto): Promise<Template> => {
    const template = await getTemplateById(userId, id)

    Object.assign(template, dto)

    return await templateRepository.save(template)
}

export const deleteTemplate = async (userId: string, id: string): Promise<void> => {
    const template = await getTemplateById(userId, id)

    await templateRepository.remove(template)
}