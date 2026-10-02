import { Calculation } from "../../entities/Calculation"
import { DiscountType } from "../../enums/discount-type.enum"
import { CreateCalculationDto, UpdateCalculationDto } from "../calculations.dto"

export const buildUpdatedCalculationDto = (calculation: Calculation, dto: UpdateCalculationDto): CreateCalculationDto => {
    const updatedDto: CreateCalculationDto = {
        month: dto.month ?? calculation.month,

        year: dto.year ?? calculation.year,

        normalRateCents: dto.normalRateCents ?? calculation.normalRateCents,

        sundayRateCents: dto.sundayRateCents ?? calculation.sundayRateCents,

        holidayRateCents: dto.holidayRateCents ?? calculation.holidayRateCents,

        holidaySundayRule: dto.holidaySundayRule ?? calculation.holidaySundayRule,

        days:
            dto.days ??
            calculation.days.map(day => ({
                date: day.date.toISOString().slice(0, 10),
                minutesWorked: day.minutesWorked,
                isHoliday: day.isHoliday
            })),

        discounts:
            dto.discounts ??
            calculation.discounts.map(discount => {
                if (discount.type === DiscountType.PERCENTAGE) {
                    return {
                        name: discount.name,
                        type: discount.type,
                        percentageBasisPoints:
                            discount.percentageBasisPoints!
                    }
                }

                return {
                    name: discount.name,
                    type: discount.type,
                    amountCents:
                        discount.amountCents!
                }
            })
    }

    const templateId = dto.templateId ?? calculation.templateId

    if (templateId !== null && templateId !== undefined) {
        updatedDto.templateId = templateId
    }

    return updatedDto
}