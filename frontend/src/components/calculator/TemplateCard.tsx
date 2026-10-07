import { FileText } from "lucide-react";
import Card from "../ui/Card";
import CardHeader from "../ui/CardHeader";

export default function TemplateCard() {
    return (
        <Card>
            <CardHeader
                icon={<FileText size={19} />}
                title="Plantilla"
                description="Usá una plantilla o configurá las tarifas manualmente."
            />

            <div>
                <label htmlFor="template" className="sr-only">
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
        </Card>
    );
}