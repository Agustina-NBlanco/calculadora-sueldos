import { FileText } from "lucide-react";

export default function TemplateCard() {
    return (
        <section className="rounded-2xl border border-white/10 bg-[#0d1422] p-5">
            <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                    <FileText size={19} />
                </div>

                <div>
                    <h2 className="text-sm font-semibold text-white">
                        Plantilla
                    </h2>

                    <p className="mt-1 text-xs text-zinc-500">
                        Usá una plantilla o configurá las tarifas manualmente.
                    </p>
                </div>
            </div>

            <div>
                <label
                    htmlFor="template"
                    className="sr-only"
                >
                    Plantilla
                </label>

                <select
                    id="template"
                    defaultValue=""
                    className="w-full rounded-lg border border-white/10 bg-[#080d18] px-3 py-2.5 text-sm text-white outline-none transition focus:border-violet-500"
                >
                    <option value="">
                        Seleccionar plantilla
                    </option>

                    <option value="default">
                        Plantilla actualizada
                    </option>
                </select>

                <p className="mt-3 text-xs leading-5 text-zinc-500">
                    Podés usar una plantilla guardada o configurar las tarifas
                    manualmente para este cálculo.
                </p>
            </div>
        </section>
    );
}