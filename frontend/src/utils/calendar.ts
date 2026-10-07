import { CalendarDay, CalendarWeek } from "@/types/calculator";

export const getCalendarWeeks = (month: number, year: number): CalendarWeek[] => {
    const firstDayOfMonth = new Date(year, month, 1)
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const firstWeekDay = firstDayOfMonth.getDay()
    const mondayBasedFirstDay = firstWeekDay === 0 ? 6 : firstWeekDay - 1

    const days: CalendarDay[] = []

    for (let dayNumber = 1; dayNumber <= daysInMonth; dayNumber++) {
        const date = new Date(year, month, dayNumber)

        days.push({
            date: `${year}-${String(month + 1).padStart(2, "0")}-${String(
                dayNumber
            ).padStart(2, "0")}`,
            dayNumber,
            isSunday: date.getDay() === 0,
            isCurrentMonth: true,
        })
    }

    const weeks: CalendarWeek[] = [];
    let currentWeek: CalendarDay[] = [];

    for (let index = 0; index < mondayBasedFirstDay; index++) {
        currentWeek.push({
            date: "",
            dayNumber: 0,
            isSunday: false,
            isCurrentMonth: false,
        })
    }

    for (const day of days) {
        currentWeek.push(day);

        if (currentWeek.length === 7) {
            weeks.push({ days: currentWeek });
            currentWeek = [];
        }
    }

    if (currentWeek.length > 0) {
        while (currentWeek.length < 7) {
            currentWeek.push({
                date: "",
                dayNumber: 0,
                isSunday: false,
                isCurrentMonth: false,
            });
        }

        weeks.push({ days: currentWeek })
    }

    return weeks
};