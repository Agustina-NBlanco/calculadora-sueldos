"use client";

import { useMemo, useState } from "react"
import { CalendarDays } from "lucide-react"
import { getCalendarWeeks } from "@/utils/calendar"
import { CalculationPeriod, WorkDay } from "@/types/calculator"
import Card from "@/components/ui/Card"
import CardHeader from "@/components/ui/CardHeader"
import CalendarActions from "./CalendarActions"
import CalendarGrid from "./CalendarGrid"
import CalendarLegend from "./CalendarLegend"

type SelectionMode = "hours" | "holidays" | null

interface CalendarCardProps {
    period: CalculationPeriod
    dailyHours: string
}

export default function CalendarCard({
    period,
    dailyHours,
}: CalendarCardProps) {
    const [workDays, setWorkDays] = useState<Record<string, WorkDay>>({})
    const [selectionMode, setSelectionMode] = useState<SelectionMode>(null)
    const [selectedDays, setSelectedDays] = useState<string[]>([])

    const weeks = useMemo(() => getCalendarWeeks(period.month, period.year), [period.month, period.year])

    const updateDay = (date: string, field: keyof WorkDay, value: string | boolean) => {
        setWorkDays((current) => ({
            ...current,
            [date]: {
                hours: current[date]?.hours ?? "",
                minutes: current[date]?.minutes ?? "",
                isHoliday: current[date]?.isHoliday ?? false,
                [field]: value,
            },
        }))
    }

    const toggleDaySelection = (date: string) => {
        setSelectedDays((current) =>
            current.includes(date)
                ? current.filter((day) => day !== date)
                : [...current, date]
        )
    }

    const toggleSelectionMode = () => {
        setSelectionMode((current) => current === "hours" ? null : "hours")
        setSelectedDays([]);
    }

    const cancelSelection = () => {
        setSelectedDays([])
        setSelectionMode(null)
    }

    const applyHours = () => {
        const hoursValue = Number(dailyHours)

        if (!Number.isFinite(hoursValue) || hoursValue <= 0) {
            return
        }

        const totalMinutes = Math.round(hoursValue * 60)

        const hours = Math.floor(totalMinutes / 60)
        const minutes = totalMinutes % 60

        setWorkDays((current) => {
            const updated = { ...current }

            selectedDays.forEach((date) => {
                updated[date] = {
                    hours: String(hours).padStart(2, "0"),
                    minutes: String(minutes).padStart(2, "0"),
                    isHoliday: current[date]?.isHoliday ?? false,
                };
            });

            return updated
        });

        setSelectedDays([])
        setSelectionMode(null)
    };

    const applyHolidays = () => {
        setWorkDays((current) => {
            const updated = { ...current };

            selectedDays.forEach((date) => {
                updated[date] = {
                    hours: current[date]?.hours ?? "",
                    minutes: current[date]?.minutes ?? "",
                    isHoliday: !(current[date]?.isHoliday ?? false),
                }
            })

            return updated
        })

        setSelectedDays([])
        setSelectionMode(null)
    };

    const handleMarkHolidays = () => {
        setSelectedDays([])
        setSelectionMode("holidays")
    }

    return (
        <Card>
            <CardHeader
                icon={<CalendarDays size={19} />}
                title="Horas trabajadas en el mes"
                description="Registrá las horas y minutos trabajados cada día."
                action={
                    <button
                        type="button"
                        onClick={handleMarkHolidays}
                        className="rounded-lg border border-white/10 bg-[#080d18] px-3 py-2 text-xs font-medium text-zinc-300 transition hover:border-violet-500/50 hover:text-white"
                    >
                        Marcar feriados
                    </button>
                }
            />

            <CalendarLegend />

            <CalendarGrid
                weeks={weeks}
                workDays={workDays}
                selectedDays={selectedDays}
                selectionMode={selectionMode}
                onUpdateDay={updateDay}
                onToggleDaySelection={toggleDaySelection}
            />

            <CalendarActions
                selectionMode={selectionMode}
                selectedDaysCount={selectedDays.length}
                onToggleHoursSelection={toggleSelectionMode}
                onApply={selectionMode === "holidays" ? applyHolidays : applyHours}
                onCancelSelection={cancelSelection}
            />
        </Card>
    )
}