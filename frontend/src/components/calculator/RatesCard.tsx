import { Clock3 } from "lucide-react";
import Card from "@/components/ui/Card";
import CardHeader from "@/components/ui/CardHeader";
import Input from "@/components/ui/Input";

export default function RatesCard() {
    return (
        <Card>
            <CardHeader
                icon={<Clock3 size={19} />}
                title="Tarifas por hora"
                description="Indicá cuánto te pagan por cada tipo de hora."
            />

            <div className="space-y-4">
                <div>
                    <label htmlFor="normalRate" className="mb-2 block text-xs font-medium text-zinc-400">
                        Hora normal
                    </label>

                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                            $
                        </span>

                        <Input
                            id="normalRate"
                            type="number"
                            min={0}
                            placeholder="0"
                            className="w-full pl-8"
                        />
                    </div>
                </div>

                <div>
                    <div className="mb-2 flex items-center justify-between">
                        <label htmlFor="sundayRate" className="text-xs font-medium text-zinc-400">
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

                        <Input id="sundayRate" type="number" min={0} placeholder="0" className="w-full pl-8" />
                    </div>
                </div>

                <div>
                    <div className="mb-2 flex items-center justify-between">
                        <label htmlFor="holidayRate" className="text-xs font-medium text-zinc-400">
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

                        <Input id="holidayRate" type="number" min={0} placeholder="0" className="w-full pl-8" />
                    </div>
                </div>
            </div>
        </Card>
    );
}