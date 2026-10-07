import { Settings2 } from "lucide-react";

import Card from "@/components/ui/Card";
import CardHeader from "@/components/ui/CardHeader";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

interface WorkConfigCardProps {
    dailyHours: string;
    onDailyHoursChange: (value: string) => void;
}

export default function WorkConfigCard({ dailyHours, onDailyHoursChange, }: WorkConfigCardProps) {
    return (
        <Card>
            <CardHeader
                icon={<Settings2 size={19} />}
                title="Jornada y moneda"
                description="Configurá los datos generales del cálculo."
            />

            <div className="space-y-4">
                <div>
                    <label htmlFor="dailyHours" className="mb-2 block text-xs font-medium text-zinc-400">
                        Jornada diaria estándar
                        <span className="ml-1 text-zinc-600">
                            (opcional)
                        </span>
                    </label>

                    <div className="flex">
                        <Input id="dailyHours" type="text" inputMode="decimal" value={dailyHours} onChange={(event) =>
                            onDailyHoursChange(
                                event.target.value.replace(
                                    /[^0-9.]|(?<=\..*)\./g,
                                    ""
                                )
                            )
                        }
                            placeholder="8"
                            className="w-full rounded-r-none"
                        />

                        <span className="flex items-center rounded-r-lg border border-l-0 border-white/10 bg-[#0d1422] px-3 text-xs text-zinc-400">
                            horas
                        </span>
                    </div>
                </div>

                <div>
                    <label htmlFor="currency" className="mb-2 block text-xs font-medium text-zinc-400">
                        Moneda
                    </label>

                    <Select id="currency" defaultValue="ARS" className="w-full">
                        <option value="ARS">Peso argentino ($)</option>
                        <option value="USD">Dólar estadounidense (US$)</option>
                        <option value="EUR">Euro (€)</option>
                    </Select>
                </div>
            </div>
        </Card>
    );
}