import { AppDataSource } from "../config/data-source";
import { Calculation } from "../entities/Calculation";
import { CalculationDay } from "../entities/CalculationDay";
import { CalculationDiscount } from "../entities/CalculationDiscount";
import { Template } from "../entities/Template";
import { parseDateOnly } from "../utils/date.utils";
import { CreateCalculationDto, UpdateCalculationDto } from "./calculations.dto";
import { buildUpdatedCalculationDto } from "./utils/calculations.mappers";
import { calculateTotals } from "./utils/calculations.utils";
import { validateCalculationDays } from "./utils/calculations.validation";


const calculationRepository = AppDataSource.getRepository(Calculation)
const calculationDayRepository = AppDataSource.getRepository(CalculationDay)
const calculationDiscountRepository = AppDataSource.getRepository(CalculationDiscount)
const templateRepository = AppDataSource.getRepository(Template)


export const createCalculation = async (userId: string, dto: CreateCalculationDto): Promise<Calculation> => {

    validateCalculationDays(dto.days, dto.month, dto.year)

    if (dto.templateId) {
        const template = await templateRepository.findOne({
            where: { id: dto.templateId, userId }
        })

        if (!template) throw new Error("Template not found")
    }

    const totals = calculateTotals(dto)

    const calculation = calculationRepository.create({
        userId,
        templateId: dto.templateId ?? null,
        month: dto.month,
        year: dto.year,
        normalRateCents: dto.normalRateCents,
        sundayRateCents: dto.sundayRateCents,
        holidayRateCents: dto.holidayRateCents,
        holidaySundayRule: dto.holidaySundayRule,
        ...totals
    })

    await calculationRepository.save(calculation)

    const calculationDays = dto.days.map(day =>
        calculationDayRepository.create({
            calculationId: calculation.id,
            date: parseDateOnly(day.date),
            minutesWorked: day.minutesWorked,
            isHoliday: day.isHoliday
        })
    )

    await calculationDayRepository.save(calculationDays)

    const calculationDiscounts = (dto.discounts ?? []).map(discount =>
        calculationDiscountRepository.create({
            calculationId: calculation.id,
            name: discount.name,
            type: discount.type,
            percentageBasisPoints:
                discount.percentageBasisPoints ?? null,
            amountCents:
                discount.amountCents ?? null
        })
    )

    if (calculationDiscounts.length > 0) {
        await calculationDiscountRepository.save(calculationDiscounts)
    }

    return await getCalculationById(userId, calculation.id)
}

export const getCalculations = async (userId: string): Promise<Calculation[]> => {
    return await calculationRepository.find({
        where: { userId },
        relations: { days: true, discounts: true },
        order: { createdAt: "DESC" }
    })
}

export const getCalculationById = async (userId: string, id: string): Promise<Calculation> => {
    const calculation = await calculationRepository.findOne({
        where: { id, userId },
        relations: { days: true, discounts: true }
    })

    if (!calculation) {
        throw new Error("Calculation not found")
    }

    return calculation
}

export const updateCalculation = async (userId: string, id: string, dto: UpdateCalculationDto): Promise<Calculation> => {
    const calculation = await getCalculationById(userId, id)

    const updatedDto = buildUpdatedCalculationDto(calculation, dto)

    validateCalculationDays(updatedDto.days, updatedDto.month, updatedDto.year)

    if (updatedDto.templateId) {
        const template = await templateRepository.findOne({
            where: {
                id: updatedDto.templateId,
                userId
            }
        })

        if (!template) {
            throw new Error("Template not found")
        }
    }

    const totals = calculateTotals(updatedDto)

    calculation.templateId = updatedDto.templateId ?? null
    calculation.month = updatedDto.month
    calculation.year = updatedDto.year
    calculation.normalRateCents = updatedDto.normalRateCents
    calculation.sundayRateCents = updatedDto.sundayRateCents
    calculation.holidayRateCents = updatedDto.holidayRateCents
    calculation.holidaySundayRule = updatedDto.holidaySundayRule

    Object.assign(calculation, totals)

    await calculationRepository.save(calculation)

    if (dto.days) {
        await calculationDayRepository.delete({
            calculationId: calculation.id
        })

        const calculationDays = updatedDto.days.map(day =>
            calculationDayRepository.create({
                calculationId: calculation.id,
                date: parseDateOnly(day.date),
                minutesWorked: day.minutesWorked,
                isHoliday: day.isHoliday
            })
        )

        await calculationDayRepository.save(calculationDays)
    }

    if (dto.discounts) {
        await calculationDiscountRepository.delete({
            calculationId: calculation.id
        })

        const calculationDiscounts = dto.discounts.map(discount =>
            calculationDiscountRepository.create({
                calculationId: calculation.id,
                name: discount.name,
                type: discount.type,
                percentageBasisPoints:
                    discount.percentageBasisPoints ?? null,
                amountCents:
                    discount.amountCents ?? null
            })
        )

        if (calculationDiscounts.length > 0) {
            await calculationDiscountRepository.save(calculationDiscounts)
        }
    }

    return await getCalculationById(
        userId,
        calculation.id
    )
}

export const deleteCalculation = async (userId: string, id: string): Promise<void> => {
    const calculation = await getCalculationById(userId, id)

    await calculationRepository.remove(calculation)
}