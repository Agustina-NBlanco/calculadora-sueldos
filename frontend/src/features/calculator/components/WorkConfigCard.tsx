import { Settings2 } from "lucide-react";

export default function WorkConfigCard() {
    return (
        <section className="rounded-2xl border border-white/10 bg-[#0d1422] p-5">
            <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                    <Settings2 size={19} />
                </div>

                <div>
                    <h2 className="text-sm font-semibold text-white">Jornada y moneda</h2>

                    <p className="mt-1 text-xs text-zinc-500">
                        Configurá los datos generales del cálculo.
                    </p>
                </div>
            </div>

            <div className="space-y-4">

                <div>
                    <label
                        htmlFor="dailyHours"
                        className="mb-2 block text-xs font-medium text-zinc-400"
                    >
                        Jornada diaria estándar
                        <span className="ml-1 text-zinc-600">
                            (opcional)
                        </span>
                    </label>

                    <div className="flex">
                        <input
                            id="dailyHours"
                            type="text"
                            inputMode="decimal"
                            placeholder="8"
                            className="w-full rounded-l-lg border border-white/10 bg-[#080d18] px-3 py-2.5 text-sm text-white outline-none transition focus:border-violet-500"
                        />

                        <span className="flex items-center rounded-r-lg border border-l-0 border-white/10 bg-[#0d1422] px-3 text-xs text-zinc-400">
                            horas
                        </span>
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="currency"
                        className="mb-2 block text-xs font-medium text-zinc-400"
                    >
                        Moneda
                    </label>

                    <select
                        id="currency"
                        defaultValue="ARS"
                        className="w-full rounded-lg border border-white/10 bg-[#080d18] px-3 py-2.5 text-sm text-white outline-none transition focus:border-violet-500"
                    >
                        <option value="ARS">Peso argentino ($)</option>

                        <option value="USD">Dólar estadounidense (US$)</option>

                        <option value="EUR">Euro (€)</option>
                    </select>
                </div>

            </div>
        </section>
    );
}