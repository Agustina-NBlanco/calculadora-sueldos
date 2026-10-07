"use client";

import { WorkDay } from "@/types/calculator";

type SelectionMode = "hours" | "holidays" | null;

interface CalendarDayProps {
    dayNumber: number;
    date: string;
    isSunday: boolean;
    workDay?: WorkDay;
    isSelected: boolean;
    selectionMode: SelectionMode;
    onUpdate: (date: string, field: keyof WorkDay, value: string | boolean) => void
    onToggleSelection: (date: string) => void
}

export default function CalendarDay({
    dayNumber,
    date,
    isSunday,
    workDay,
    isSelected,
    selectionMode,
    onUpdate,
    onToggleSelection,
}: CalendarDayProps) {
    const data = workDay ?? {
        hours: "",
        minutes: "",
        isHoliday: false,
    };

    const isHoliday = data.isHoliday
    const isSelectable = selectionMode !== null

    const handleDayClick = () => {
        if (!isSelectable) {
            return
        }

        onToggleSelection(date)
    }

    return (
        <div
            role={isSelectable ? "button" : undefined}
            tabIndex={isSelectable ? 0 : undefined}
            onClick={handleDayClick}
            onKeyDown={(event) => {
                if (isSelectable && (event.key === "Enter" || event.key === " ")) {
                    event.preventDefault()
                    handleDayClick()
                }
            }}
            aria-label={
                isSelectable
                    ? isSelected
                        ? `Quitar selección del ${date}`
                        : `Seleccionar ${date}`
                    : `Día ${date}`
            }
            className={`min-h-[100px] rounded-xl border p-2 transition ${isSelected
                ? "border-violet-500 bg-violet-500/10"
                : isHoliday
                    ? "border-amber-400/30 bg-amber-400/5"
                    : isSunday
                        ? "border-violet-500/20 bg-violet-500/5"
                        : "border-white/10 bg-[#080d18]"
                } ${isSelectable
                    ? "cursor-pointer hover:border-violet-500/50"
                    : ""
                }`}
        >
            <div className="mb-2">
                <span
                    className={`text-xs font-medium ${isSelected
                        ? "text-violet-300"
                        : isHoliday
                            ? "text-amber-300"
                            : isSunday
                                ? "text-violet-300"
                                : "text-zinc-400"
                        }`}
                >
                    {dayNumber}
                </span>
            </div>

            <div className="flex items-center gap-1" onClick={(event) => event.stopPropagation()}>
                <input type="text" inputMode="numeric" value={data.hours} onChange={(event) => onUpdate(
                    date,
                    "hours",
                    event.target.value.replace(/\D/g, "")
                )
                }
                    placeholder="00"
                    className="h-8 min-w-0 flex-1 rounded-md border border-white/10 bg-[#0d1422] px-1 text-center text-xs text-white outline-none transition placeholder:text-zinc-700 focus:border-violet-500"
                    aria-label={`Horas trabajadas el ${date}`}
                />

                <span className="text-xs text-zinc-600">
                    :
                </span>

                <input type="text" inputMode="numeric" value={data.minutes} onChange={(event) => onUpdate(
                    date,
                    "minutes",
                    event.target.value.replace(/\D/g, "")
                )
                }
                    placeholder="00"
                    className="h-8 min-w-0 flex-1 rounded-md border border-white/10 bg-[#0d1422] px-1 text-center text-xs text-white outline-none transition placeholder:text-zinc-700 focus:border-violet-500"
                    aria-label={`Minutos trabajados el ${date}`}
                />
            </div>
        </div>
    )
}