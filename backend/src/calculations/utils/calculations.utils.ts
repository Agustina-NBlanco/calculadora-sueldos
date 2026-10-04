import { DiscountType } from "../../enums/discount-type.enum"
import { HolidaySundayRule } from "../../enums/holiday-sunday-rule.enum"
import { AppError } from "../../utils/AppError"
import { isSunday } from "../../utils/date.utils"
import { roundCents } from "../../utils/money.utils"
import { CalculationDayDto, CalculationDiscountDto, CreateCalculationDto } from "../calculations.dto"

export const getDayRate = (
    day: CalculationDayDto,
    normalRateCents: number,
    sundayRateCents: number,
    holidayRateCents: number,
    holidaySundayRule: HolidaySundayRule
): number => {
    const sunday = isSunday(day.date)

    if (day.isHoliday && sunday) {
        return holidaySundayRule === HolidaySundayRule.HOLIDAY_PRIORITY
            ? holidayRateCents
            : sundayRateCents
    }

    if (day.isHoliday) {
        return holidayRateCents
    }

    if (sunday) {
        return sundayRateCents
    }

    return normalRateCents
}

export const calculateDayAmount = (
    minutesWorked: number,
    rateCents: number
): number => {
    return (rateCents * minutesWorked) / 60
}

export const calculateDiscounts = (grossAmountCents: number, discounts: CalculationDiscountDto[]): number => {
    return discounts.reduce((total, discount) => {
        if (discount.type === DiscountType.PERCENTAGE) {
            return total + (
                grossAmountCents *
                (discount.percentageBasisPoints ?? 0)
            ) / 10000
        }

        return total + (discount.amountCents ?? 0)
    }, 0)
}

export const calculateTotals = (dto: CreateCalculationDto) => {
    let totalMinutes = 0
    let normalMinutes = 0
    let sundayMinutes = 0
    let holidayMinutes = 0
    let grossAmountCents = 0

    for (const day of dto.days) {
        const sunday = isSunday(day.date)

        totalMinutes += day.minutesWorked

        if (day.isHoliday) {
            holidayMinutes += day.minutesWorked
        } else if (sunday) {
            sundayMinutes += day.minutesWorked
        } else {
            normalMinutes += day.minutesWorked
        }

        const rateCents = getDayRate(
            day,
            dto.normalRateCents,
            dto.sundayRateCents,
            dto.holidayRateCents,
            dto.holidaySundayRule
        )

        grossAmountCents += calculateDayAmount(
            day.minutesWorked,
            rateCents
        )
    }

    const totalDiscountsRaw = calculateDiscounts(
        grossAmountCents,
        dto.discounts ?? []
    )

    const roundedGrossAmountCents = roundCents(grossAmountCents)
    const totalDiscountsCents = roundCents(totalDiscountsRaw)

    if (totalDiscountsCents > roundedGrossAmountCents) {
        throw new AppError("El total de descuentos no puede superar el monto bruto", 400)
    }

    const finalAmountCents =
        roundedGrossAmountCents - totalDiscountsCents

    return {
        totalMinutes,
        normalMinutes,
        sundayMinutes,
        holidayMinutes,
        grossAmountCents: roundedGrossAmountCents,
        totalDiscountsCents,
        finalAmountCents
    }
}