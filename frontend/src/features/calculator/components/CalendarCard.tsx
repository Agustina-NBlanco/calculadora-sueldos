"use client";

import { CalendarDays, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

interface CalendarDay {
    date: string;
    dayNumber: number;
    dayName: string;
    isSunday: boolean;
}

interface WorkDay {
    hours: string;
    minutes: string;
    isHoliday: boolean;
}

const WEEK_DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

const MONTH_NAMES = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];

const createCalendarDays = (
    month: number,
    year: number
): CalendarDay[] => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return Array.from({ length: daysInMonth }, (_, index) => {
        const dayNumber = index + 1;
        const date = new Date(year, month, dayNumber);

        const weekDay = date.getDay();

        return {
            date: `${year}-${String(month + 1).padStart(2, "0")}-${String(
                dayNumber
            ).padStart(2, "0")}`,
            dayNumber,
            dayName: WEEK_DAYS[weekDay === 0 ? 6 : weekDay - 1],
            isSunday: weekDay === 0,
        };
    });
};

export default function CalendarCard() {
    const [month, setMonth] = useState(8);
    const [year, setYear] = useState(2026);

    const [workDays, setWorkDays] = useState<Record<string, WorkDay>>({});

    const calendarDays = useMemo(
        () => createCalendarDays(month, year),
        [month, year]
    );

    const updateDay = (
        date: string,
        field: keyof WorkDay,
        value: string | boolean
    ) => {
        setWorkDays((current) => ({
            ...current,
            [date]: {
                hours: current[date]?.hours ?? "",
                minutes: current[date]?.minutes ?? "",
                isHoliday: current[date]?.isHoliday ?? false,
                [field]: value,
            },
        }));
    };

    const getDayData = (date: string): WorkDay => {
        return (
            workDays[date] ?? {
                hours: "",
                minutes: "",
                isHoliday: false,
            }
        );
    };

    const goToPreviousMonth = () => {
        if (month === 0) {
            setMonth(11);
            setYear((current) => current - 1);
            return;
        }

        setMonth((current) => current - 1);
    };

    const goToNextMonth = () => {
        if (month === 11) {
            setMonth(0);
            setYear((current) => current + 1);
            return;
        }

        setMonth((current) => current + 1);
    };

    return (
        <section className="rounded-2xl border border-white/10 bg-[#0d1422] p-5">
            <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                        <CalendarDays size={19} />
                    </div>

                    <div>
                        <h2 className="text-sm font-semibold text-white">
                            Horas trabajadas en el mes
                        </h2>

                        <p className="mt-1 text-xs text-zinc-500">
                            Registrá las horas y minutos trabajados cada día.
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    className="rounded-lg border border-white/10 bg-[#080d18] px-3 py-2 text-xs font-medium text-zinc-300 transition hover:border-violet-500/50 hover:text-white"
                >
                    Marcar feriados
                </button>
            </div>

            <div className="mb-5 flex items-center justify-between rounded-xl border border-white/10 bg-[#080d18] p-2">
                <button
                    type="button"
                    onClick={goToPreviousMonth}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-white/5 hover:text-white"
                    aria-label="Mes anterior"
                >
                    <ChevronLeft size={17} />
                </button>

                <span className="text-sm font-medium text-white">
                    {MONTH_NAMES[month]} {year}
                </span>

                <button
                    type="button"
                    onClick={goToNextMonth}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-white/5 hover:text-white"
                    aria-label="Mes siguiente"
                >
                    <ChevronRight size={17} />
                </button>
            </div>

            <div className="mb-4 flex flex-wrap items-center gap-4 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-500" />
                    Normal
                </div>

                <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-violet-500" />
                    Domingo
                </div>

                <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    Feriado
                </div>
            </div>

            <div className="overflow-x-auto">
                <div className="min-w-[760px]">
                    <div className="grid grid-cols-[70px_repeat(7,minmax(0,1fr))] gap-2">
                        <div />

                        {WEEK_DAYS.map((day) => (
                            <div
                                key={day}
                                className="pb-2 text-center text-[11px] font-medium uppercase tracking-wide text-zinc-500"
                            >
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="space-y-2">
                        {calendarDays.map((day) => {
                            const data = getDayData(day.date);

                            return (
                                <div
                                    key={day.date}
                                    className="grid grid-cols-[70px_repeat(7,minmax(0,1fr))] gap-2"
                                >
                                    <div className="flex items-center">
                                        <div
                                            className={`flex h-12 w-full items-center justify-center rounded-lg border text-sm font-medium ${data.isHoliday
                                                ? "border-amber-400/30 bg-amber-400/10 text-amber-300"
                                                : day.isSunday
                                                    ? "border-violet-500/20 bg-violet-500/10 text-violet-300"
                                                    : "border-white/10 bg-[#080d18] text-zinc-300"
                                                }`}
                                        >
                                            {day.dayNumber}
                                        </div>
                                    </div>

                                    {WEEK_DAYS.map((weekDay) => {
                                        if (weekDay !== day.dayName) {
                                            return (
                                                <div
                                                    key={weekDay}
                                                    className="h-12 rounded-lg border border-transparent"
                                                />
                                            );
                                        }

                                        return (
                                            <div
                                                key={weekDay}
                                                className={`flex items-center gap-1 rounded-lg border p-1.5 ${data.isHoliday
                                                    ? "border-amber-400/20 bg-amber-400/5"
                                                    : day.isSunday
                                                        ? "border-violet-500/20 bg-violet-500/5"
                                                        : "border-white/10 bg-[#080d18]"
                                                    }`}
                                            >
                                                <input
                                                    type="text"
                                                    inputMode="numeric"
                                                    value={data.hours}
                                                    onChange={(event) =>
                                                        updateDay(
                                                            day.date,
                                                            "hours",
                                                            event.target.value.replace(
                                                                /\D/g,
                                                                ""
                                                            )
                                                        )
                                                    }
                                                    placeholder="00"
                                                    className="h-9 min-w-0 flex-1 rounded-md border border-white/10 bg-[#0d1422] px-2 text-center text-xs text-white outline-none transition placeholder:text-zinc-700 focus:border-violet-500"
                                                    aria-label={`Horas ${day.date}`}
                                                />

                                                <span className="text-zinc-600">
                                                    :
                                                </span>

                                                <input
                                                    type="text"
                                                    inputMode="numeric"
                                                    value={data.minutes}
                                                    onChange={(event) =>
                                                        updateDay(
                                                            day.date,
                                                            "minutes",
                                                            event.target.value.replace(
                                                                /\D/g,
                                                                ""
                                                            )
                                                        )
                                                    }
                                                    placeholder="00"
                                                    className="h-9 min-w-0 flex-1 rounded-md border border-white/10 bg-[#0d1422] px-2 text-center text-xs text-white outline-none transition placeholder:text-zinc-700 focus:border-violet-500"
                                                    aria-label={`Minutos ${day.date}`}
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        updateDay(
                                                            day.date,
                                                            "isHoliday",
                                                            !data.isHoliday
                                                        )
                                                    }
                                                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition ${data.isHoliday
                                                        ? "bg-amber-400/15 text-amber-300"
                                                        : "text-zinc-600 hover:bg-white/5 hover:text-zinc-300"
                                                        }`}
                                                    title="Marcar como feriado"
                                                    aria-label={`Marcar ${day.date} como feriado`}
                                                >
                                                    {data.isHoliday && (
                                                        <Check size={15} />
                                                    )}
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}