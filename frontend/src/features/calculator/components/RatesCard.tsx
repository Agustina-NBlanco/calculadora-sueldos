import { Clock3 } from "lucide-react";

export default function RatesCard() {
    return (
        <section className="rounded-2xl border border-white/10 bg-[#0d1422] p-5">
            <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                    <Clock3 size={19} />
                </div>

                <div>
                    <h2 className="text-sm font-semibold text-white">
                        Tarifas por hora
                    </h2>

                    <p className="mt-1 text-xs text-zinc-500">
                        Indicá cuánto te pagan por cada tipo de hora.
                    </p>
                </div>
            </div>

            <div className="space-y-4">

                <div>
                    <label className="mb-2 block text-xs font-medium text-zinc-400">
                        Hora normal
                    </label>

                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                            $
                        </span>

                        <input
                            type="number"
                            min={0}
                            placeholder="0"
                            className="w-full rounded-lg border border-white/10 bg-[#080d18] py-2.5 pl-8 pr-3 text-sm text-white outline-none transition focus:border-violet-500"
                        />
                    </div>
                </div>

                <div>
                    <div className="mb-2 flex items-center justify-between">
                        <label className="text-xs font-medium text-zinc-400">
                            Hora domingo
                        </label>

                        <span className="rounded-md bg-violet-500/10 px-2 py-1 text-[11px] font-medium text-violet-400">
                            +40%
                        </span>
                    </div>

                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                            $
                        </span>

                        <input
                            type="number"
                            min={0}
                            placeholder="0"
                            className="w-full rounded-lg border border-white/10 bg-[#080d18] py-2.5 pl-8 pr-3 text-sm text-white outline-none transition focus:border-violet-500"
                        />
                    </div>
                </div>

                <div>
                    <div className="mb-2 flex items-center justify-between">
                        <label className="text-xs font-medium text-zinc-400">
                            Hora feriado
                        </label>

                        <span className="rounded-md bg-violet-500/10 px-2 py-1 text-[11px] font-medium text-violet-400">
                            +60%
                        </span>
                    </div>

                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                            $
                        </span>

                        <input
                            type="number"
                            min={0}
                            placeholder="0"
                            className="w-full rounded-lg border border-white/10 bg-[#080d18] py-2.5 pl-8 pr-3 text-sm text-white outline-none transition focus:border-violet-500"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}