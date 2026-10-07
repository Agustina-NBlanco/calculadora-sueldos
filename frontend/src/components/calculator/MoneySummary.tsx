import { CircleDollarSign } from "lucide-react";
import Card from "@/components/ui/Card";
import CardHeader from "@/components/ui/CardHeader";

export default function MoneySummary() {
    return (
        <Card className="min-h-[300px]">
            <CardHeader
                icon={<CircleDollarSign size={19} />}
                title="Resumen"
                description="Detalle del cálculo y total a cobrar."
            />

            <div className="space-y-4">
                <div className="space-y-3">
                    <div className="flex items-center justify-between gap-4">
                        <span className="text-xs text-zinc-400">
                            Horas normales
                        </span>

                        <span className="text-sm font-medium text-white">
                            $0,00
                        </span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                        <span className="text-xs text-zinc-400">
                            Horas domingo
                        </span>

                        <span className="text-sm font-medium text-white">
                            $0,00
                        </span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                        <span className="text-xs text-zinc-400">
                            Horas feriado
                        </span>

                        <span className="text-sm font-medium text-white">
                            $0,00
                        </span>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                    <div className="flex items-center justify-between gap-4">
                        <span className="text-xs font-medium text-zinc-400">
                            Total bruto
                        </span>

                        <span className="text-sm font-semibold text-white">
                            $0,00
                        </span>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                    <p className="mb-3 text-xs font-medium text-zinc-400">
                        Descuentos
                    </p>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between gap-4">
                            <span className="text-xs text-zinc-500">
                                Sin descuentos
                            </span>

                            <span className="text-xs text-zinc-500">
                                $0,00
                            </span>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                    <div className="flex items-center justify-between gap-4">
                        <span className="text-sm font-semibold text-white">
                            Total a cobrar
                        </span>

                        <span className="text-lg font-semibold text-violet-400">
                            $0,00
                        </span>
                    </div>
                </div>
            </div>
        </Card>
    );
}