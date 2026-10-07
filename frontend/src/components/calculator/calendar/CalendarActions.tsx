"use client"

import { Check, X } from "lucide-react"

type SelectionMode = "hours" | "holidays"

interface CalendarActionsProps {
    selectionMode: SelectionMode | null
    selectedDaysCount: number
    onToggleHoursSelection: () => void
    onApply: () => void
    onCancelSelection: () => void
}

export default function CalendarActions({
    selectionMode,
    selectedDaysCount,
    onToggleHoursSelection,
    onApply,
    onCancelSelection
}: CalendarActionsProps) {
    if (selectionMode === null) {
        return (
            <div className="mt-4 flex justify-end">
                <button
                    type="button"
                    onClick={onToggleHoursSelection}
                    className="rounded-lg border border-white/10 bg-[#080d18] px-3 py-2 text-xs font-medium text-zinc-300 transition hover:border-violet-500/50 hover:text-white"
                >
                    Seleccionar días
                </button>
            </div>
        )
    }

    const isHolidayMode = selectionMode === "holidays"

    return (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-violet-500/20 bg-violet-500/5 p-3">
            <div>
                <p className="text-xs font-medium text-white">
                    {isHolidayMode ? "Selección de feriados" : "Selección de días"}
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                    {selectedDaysCount === 0
                        ? isHolidayMode
                            ? "Seleccioná los días que quieras marcar como feriados."
                            : "Seleccioná los días a los que querés aplicar una jornada."
                        : `${selectedDaysCount} ${selectedDaysCount === 1
                            ? "día seleccionado"
                            : "días seleccionados"
                        }`}
                </p>
            </div>

            <div className="flex items-center gap-2">
                <button
                    type="button"
                    onClick={onCancelSelection}
                    className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-zinc-400 transition hover:bg-white/5 hover:text-white"
                >
                    <X size={15} />
                    Cancelar
                </button>

                <button
                    type="button"
                    onClick={onApply}
                    disabled={selectedDaysCount === 0}
                    className="flex items-center gap-2 rounded-lg bg-violet-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <Check size={15} />
                    {isHolidayMode ? "Aplicar cambios" : "Aplicar jornada"}
                </button>
            </div>
        </div>
    );
}