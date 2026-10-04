import { Request, Response } from "express";
import { CreateCalculationDto, UpdateCalculationDto } from "./calculations.dto";
import {
    createCalculation as createCalculationService,
    getCalculations as getCalculationsService,
    getCalculationById as getCalculationByIdService,
    updateCalculation as updateCalculationService,
    deleteCalculation as deleteCalculationService
} from "./calculations.service";


export const createCalculation = async (req: Request<{}, {}, CreateCalculationDto>, res: Response) => {
    const dto = req.body
    const userId = req.user!.id

    const calculation = await createCalculationService(userId, dto)

    return res.status(201).json(calculation)
}

export const getCalculations = async (req: Request, res: Response) => {
    const userId = req.user!.id

    const calculations = await getCalculationsService(userId)

    return res.status(200).json(calculations)
}

export const getCalculationById = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id

    const calculation = await getCalculationByIdService(userId, id)

    return res.status(200).json(calculation)
}

export const updateCalculation = async (req: Request<{ id: string }, {}, UpdateCalculationDto>, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id
    const dto = req.body

    const calculation = await updateCalculationService(userId, id, dto)

    return res.status(200).json(calculation)
}

export const deleteCalculation = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id

    await deleteCalculationService(userId, id)

    return res.status(204).send()
}