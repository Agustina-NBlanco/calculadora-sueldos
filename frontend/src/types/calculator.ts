export interface WorkDay {
    hours: string
    minutes: string
    isHoliday: boolean
}

export interface CalendarDay {
    date: string
    dayNumber: number
    isSunday: boolean
    isCurrentMonth: boolean
}

export interface CalendarWeek {
    days: CalendarDay[]
}

export interface CalculationPeriod {
    month: number
    year: number
}