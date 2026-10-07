import { WEEK_DAYS } from "@/constants/calendar"
import { CalendarWeek, WorkDay } from "@/types/calculator"
import CalendarDay from "./CalendarDay"

type SelectionMode = "hours" | "holidays" | null

interface CalendarGridProps {
    weeks: CalendarWeek[]
    workDays: Record<string, WorkDay>
    selectedDays: string[]
    selectionMode: SelectionMode
    onUpdateDay: (date: string, field: keyof WorkDay, value: string | boolean) => void
    onToggleDaySelection: (date: string) => void
}

export default function CalendarGrid({
    weeks,
    workDays,
    selectedDays,
    selectionMode,
    onUpdateDay,
    onToggleDaySelection,
}: CalendarGridProps) {
    return (
        <div className="overflow-x-auto">
            <div className="min-w-[720px]">
                <div className="mb-2 grid grid-cols-7 gap-2">
                    {WEEK_DAYS.map((day) => (
                        <div
                            key={day}
                            className="py-2 text-center text-[11px] font-medium uppercase tracking-wide text-zinc-500"
                        >
                            {day}
                        </div>
                    ))}
                </div>

                <div className="space-y-2">
                    {weeks.map((week, weekIndex) => (
                        <div key={weekIndex} className="grid grid-cols-7 gap-2">
                            {week.days.map((day, dayIndex) => {
                                if (!day.isCurrentMonth) {
                                    return (
                                        <div
                                            key={`empty-${weekIndex}-${dayIndex}`}
                                            className="min-h-[100px] rounded-xl border border-transparent"
                                        />
                                    );
                                }

                                return (
                                    <CalendarDay
                                        key={day.date}
                                        dayNumber={day.dayNumber}
                                        date={day.date}
                                        isSunday={day.isSunday}
                                        workDay={workDays[day.date]}
                                        isSelected={selectedDays.includes(day.date)}
                                        selectionMode={selectionMode}
                                        onUpdate={onUpdateDay}
                                        onToggleSelection={onToggleDaySelection}
                                    />
                                )
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}