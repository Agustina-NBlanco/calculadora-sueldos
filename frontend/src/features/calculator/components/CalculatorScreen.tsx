"use client";

import CalculationConfigCard from "./CalculationConfigCard";
import DiscountsCard from "./DiscountsCard";
import RatesCard from "./RatesCard";

export default function CalculatorScreen() {
    return (
        <div className="min-h-screen p-6 lg:p-8">
            <div className="mx-auto max-w-[1600px]">

                <header className="mb-8">
                    <h1 className="text-3xl font-semibold tracking-tight">Nueva calculadora</h1>

                    <p className="mt-2 text-sm text-zinc-400">
                        Calculá tu sueldo mensual de forma simple y rápida.
                    </p>
                </header>

                <section className="grid gap-4 xl:grid-cols-4">
                    <RatesCard />

                    <CalculationConfigCard />

                    <DiscountsCard />

                    <div className="rounded-2xl border border-white/10 bg-[#0d1422] p-5">
                        Notas
                    </div>
                </section>

                <section className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">

                    <div className="min-h-[500px] rounded-2xl border border-white/10 bg-[#0d1422] p-5">
                        Calendario
                    </div>

                    <div className="min-h-[500px] rounded-2xl border border-white/10 bg-[#0d1422] p-5">
                        Resumen
                    </div>

                </section>

            </div>
        </div>
    );
} 