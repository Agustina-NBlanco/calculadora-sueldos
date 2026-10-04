import { Settings2 } from "lucide-react";

export default function CalculationConfigCard() {
    return (
        <section className="rounded-2xl border border-white/10 bg-[#0d1422] p-5">
            <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                    <Settings2 size={19} />
                </div>

                <div>
                    <h2 className="text-sm font-semibold text-white">
                        Configuración
                    </h2>

                    <p className="mt-1 text-xs text-zinc-500">
                        Definí cómo se aplicarán las tarifas.
                    </p>
                </div>
            </div>

            <div>
                <label
                    htmlFor="holidaySundayRule"
                    className="mb-2 block text-xs font-medium text-zinc-400"
                >
                    Si un feriado cae domingo
                </label>

                <select
                    id="holidaySundayRule"
                    defaultValue="holiday_priority"
                    className="w-full rounded-lg border border-white/10 bg-[#080d18] px-3 py-2.5 text-sm text-white outline-none transition focus:border-violet-500"
                >
                    <option value="holiday_priority">
                        Aplicar tarifa de feriado
                    </option>

                    <option value="sunday_priority">
                        Aplicar tarifa de domingo
                    </option>
                </select>

                <p className="mt-3 text-xs leading-5 text-zinc-500">
                    Esta opción solo se utiliza cuando una misma fecha es
                    domingo y también está marcada como feriado.
                </p>
            </div>
        </section>
    );
}