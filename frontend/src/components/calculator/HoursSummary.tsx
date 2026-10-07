import { Clock3 } from "lucide-react";
import Card from "@/components/ui/Card";
import CardHeader from "@/components/ui/CardHeader";

export default function HoursSummary() {
    return (
        <Card className="mt-4">
            <CardHeader
                icon={<Clock3 size={19} />}
                title="Resumen de horas"
                description="Detalle de las horas trabajadas durante el período."
            />

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border border-white/10 bg-[#080d18] p-4">
                    <p className="text-xs text-zinc-500">
                        Total trabajado
                    </p>

                    <p className="mt-2 text-lg font-semibold text-white">
                        0 h 00 min
                    </p>
                </div>

                <div className="rounded-lg border border-white/10 bg-[#080d18] p-4">
                    <p className="text-xs text-zinc-500">
                        Horas normales
                    </p>

                    <p className="mt-2 text-lg font-semibold text-white">
                        0 h 00 min
                    </p>
                </div>

                <div className="rounded-lg border border-white/10 bg-[#080d18] p-4">
                    <p className="text-xs text-zinc-500">
                        Horas domingo
                    </p>

                    <p className="mt-2 text-lg font-semibold text-white">
                        0 h 00 min
                    </p>
                </div>

                <div className="rounded-lg border border-white/10 bg-[#080d18] p-4">
                    <p className="text-xs text-zinc-500">
                        Horas feriado
                    </p>

                    <p className="mt-2 text-lg font-semibold text-white">
                        0 h 00 min
                    </p>
                </div>
            </div>
        </Card>
    );
}