"use client";

import CalendarCard from "./CalendarCard";
import DiscountsCard from "./DiscountsCard";
import RatesCard from "./RatesCard";
import TemplateCard from "./TemplateCard";
import WorkConfigCard from "./WorkConfigCard";

export default function CalculatorScreen() {
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
                                Septiembre 2026
                            </p>
                        </div>

                        <button
                            type="button"
                            className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-[#0d1422] text-zinc-400 transition hover:bg-white/5 hover:text-white"
                        >
                            ‹
                        </button>

                        <button
                            type="button"
                            className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-[#0d1422] text-zinc-400 transition hover:bg-white/5 hover:text-white"
                        >
                            ›
                        </button>

                        <button
                            type="button"
                            className="rounded-lg bg-violet-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-violet-500"
                        >
                            Guardar cálculo
                        </button>
                    </div>
                </header>

                <section className="grid gap-4 xl:grid-cols-[1fr_2fr_1fr]">

                    <TemplateCard />

                    <RatesCard />

                    <WorkConfigCard />

                </section>

                <section className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_400px]">

                    <CalendarCard />

                    <div className="flex flex-col gap-4">

                        <DiscountsCard />

                        <div className="min-h-[300px] rounded-2xl border border-white/10 bg-[#0d1422] p-5">
                            <h2 className="text-sm font-semibold text-white">
                                Resumen
                            </h2>
                        </div>

                    </div>

                </section>

                <section className="mt-4 rounded-2xl border border-white/10 bg-[#0d1422] p-5">
                    <h2 className="text-sm font-semibold text-white">
                        Resumen de horas
                    </h2>
                </section>

            </div>
        </div>
    );
}