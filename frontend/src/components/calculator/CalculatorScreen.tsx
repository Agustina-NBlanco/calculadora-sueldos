"use client";

import { useState } from "react"
import { MONTH_NAMES } from "@/constants/calendar"
import CalendarCard from "./calendar/CalendarCard"
import DiscountsCard from "./DiscountsCard"
import RatesCard from "./RatesCard"
import TemplateCard from "./TemplateCard"
import WorkConfigCard from "./WorkConfigCard"
import MoneySummary from "./MoneySummary";
import HoursSummary from "./HoursSummary";

export default function CalculatorScreen() {
    const [period, setPeriod] = useState({ month: 8, year: 2026, })
    const [dailyHours, setDailyHours] = useState("8")

    const goToPreviousMonth = () => {
        setPeriod((current) => {
            if (current.month === 0) {
                return {
                    month: 11,
                    year: current.year - 1
                }
            }

            return {
                ...current,
                month: current.month - 1
            }
        })
    }

    const goToNextMonth = () => {
        setPeriod((current) => {
            if (current.month === 11) {
                return {
                    month: 0,
                    year: current.year + 1
                }
            }

            return {
                ...current,
                month: current.month + 1
            }
        })
    }

    return (
        <div className="min-h-screen p-6 lg:p-8">
            <div className="mx-auto max-w-[1600px]">
                <header className="mb-6 flex items-start justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-semibold tracking-tight">
                            Nueva calculadora
                        </h1>

                        <p className="mt-2 text-sm text-zinc-400">
                            Completá los datos, registrá tus horas y obtené tu
                            sueldo mensual.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="rounded-lg border border-white/10 bg-[#0d1422] px-4 py-2.5">
                            <p className="text-xs text-zinc-500">
                                Período
                            </p>

                            <p className="text-sm font-medium text-white">
                                {MONTH_NAMES[period.month]} {period.year}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={goToPreviousMonth}
                            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#0d1422] text-zinc-400 transition hover:border-violet-500/50 hover:text-white"
                            aria-label="Mes anterior"
                        >
                            ←
                        </button>

                        <button
                            type="button"
                            onClick={goToNextMonth}
                            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#0d1422] text-zinc-400 transition hover:border-violet-500/50 hover:text-white"
                            aria-label="Mes siguiente"
                        >
                            →
                        </button>

                        <button
                            type="button"
                            className="rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-500"
                        >
                            Guardar cálculo
                        </button>
                    </div>
                </header>

                <section className="grid gap-4 xl:grid-cols-[1fr_2fr_1fr]">
                    <TemplateCard />
                    <RatesCard />
                    <WorkConfigCard dailyHours={dailyHours} onDailyHoursChange={setDailyHours} />
                </section>

                <section className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_400px]">
                    <CalendarCard period={period} dailyHours={dailyHours} />

                    <div className="flex flex-col gap-4">
                        <DiscountsCard />
                        <MoneySummary />
                    </div>
                </section>

                <HoursSummary />
            </div>
        </div>
    )
}