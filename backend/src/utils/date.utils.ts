export const getDayOfWeek = (date: string): number => {
    const [year, month, day] = date.split("-").map(Number) as [number, number, number]

    return new Date(year, month - 1, day).getDay()
}

export const isSunday = (date: string): boolean => {
    return getDayOfWeek(date) === 0
}

export const isValidDateString = (date: string): boolean => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return false
    }

    const [year, month, day] = date.split("-").map(Number) as [number, number, number]

    if (
        !Number.isInteger(year) ||
        !Number.isInteger(month) ||
        !Number.isInteger(day)
    ) {
        return false
    }

    const parsedDate = new Date(year, month - 1, day)

    return (
        parsedDate.getFullYear() === year &&
        parsedDate.getMonth() === month - 1 &&
        parsedDate.getDate() === day
    )
}

export const isDateInMonth = (date: string, month: number, year: number): boolean => {
    const [dateYear, dateMonth] = date.split("-").map(Number) as [number, number, number]

    return dateYear === year && dateMonth === month
}

export const isValidMonth = (month: number): boolean => {
    return Number.isInteger(month) && month >= 1 && month <= 12
}

export const isValidYear = (year: number): boolean => {
    return Number.isInteger(year) && year >= 2000
}