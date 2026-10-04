import { AppError } from "../../utils/AppError"
import { isDateInMonth, isValidDateString } from "../../utils/date.utils"
import { CalculationDayDto } from "../calculations.dto"

export const validateCalculationDays = (days: CalculationDayDto[], month: number, year: number): void => {
    const dates = new Set<string>()

    for (const day of days) {
        if (dates.has(day.date)) {
            throw new AppError(`La fecha ${day.date} está repetida`, 400)
        }

        dates.add(day.date)

        if (!isValidDateString(day.date)) {
            throw new AppError(`Fecha inválida: ${day.date}`, 400)
        }

        if (!isDateInMonth(day.date, month, year)) {
            throw new AppError(`La fecha ${day.date} no pertenece al mes seleccionado`, 400)
        }
    }
}
