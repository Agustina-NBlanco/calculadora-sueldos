"use client";

import { Plus, Trash2, Percent, DollarSign } from "lucide-react";
import { useState } from "react";
import Card from "@/components/ui/Card";
import CardHeader from "@/components/ui/CardHeader";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

type DiscountType = "percentage" | "fixed_amount";

interface Discount {
    id: number;
    name: string;
    type: DiscountType;
    value: string;
}

interface DiscountItemProps {
    discount: Discount;
    onRemove: (id: number) => void;
    onUpdate: (id: number, field: keyof Discount, value: string) => void;
}

function DiscountItem({ discount, onRemove, onUpdate, }: DiscountItemProps) {
    return (
        <div className="rounded-lg border border-white/10 bg-[#080d18] p-3">
            <div className="mb-3 flex items-center justify-between gap-2">
                <Input type="text" value={discount.name} onChange={(event) =>
                    onUpdate(
                        discount.id,
                        "name",
                        event.target.value
                    )
                }
                    className="min-w-0 flex-1 border-transparent bg-transparent px-0 py-1 font-medium focus:border-transparent"
                    placeholder="Nombre del descuento"
                    aria-label="Nombre del descuento"
                />

                <Button
                    type="button"
                    variant="danger"
                    onClick={() => onRemove(discount.id)}
                    className="flex h-8 w-8 shrink-0 items-center justify-center p-0"
                    aria-label={`Eliminar ${discount.name}`}
                >
                    <Trash2 className="size-[18px] shrink-0" />
                </Button>
            </div>

            <div className="grid grid-cols-[1fr_90px] gap-2">
                <div className="relative">
                    {discount.type === "fixed_amount" && (
                        <DollarSign
                            size={15}
                            aria-hidden="true"
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                        />
                    )}

                    <Input type="text" inputMode="decimal" value={discount.value} onChange={(event) =>
                        onUpdate(
                            discount.id,
                            "value",
                            event.target.value
                        )
                    }
                        className={
                            discount.type === "fixed_amount"
                                ? "w-full pl-8 pr-3"
                                : "w-full pl-3 pr-8"
                        }
                        placeholder="0"
                        aria-label={`Valor de ${discount.name}`}
                    />

                    {discount.type === "percentage" && (
                        <Percent
                            size={15}
                            aria-hidden="true"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500"
                        />
                    )}
                </div>

                <Select value={discount.type} onChange={(event) =>
                    onUpdate(
                        discount.id,
                        "type",
                        event.target.value
                    )
                }
                    className="w-full px-2"
                    aria-label={`Tipo de ${discount.name}`}
                >
                    <option value="percentage">%</option>
                    <option value="fixed_amount">$</option>
                </Select>
            </div>
        </div>
    );
}

export default function DiscountsCard() {
    const [discounts, setDiscounts] = useState<Discount[]>([]);

    const addDiscount = () => {
        setDiscounts((current) => [
            ...current,
            {
                id: Date.now(),
                name: `Descuento ${current.length + 1}`,
                type: "percentage",
                value: "",
            },
        ]);
    };

    const removeDiscount = (id: number) => {
        setDiscounts((current) => current.filter((discount) => discount.id !== id));
    };

    const updateDiscount = (id: number, field: keyof Discount, value: string) => {
        setDiscounts((current) =>
            current.map((discount) =>
                discount.id === id
                    ? { ...discount, [field]: value }
                    : discount
            )
        );
    };

    return (
        <Card className="flex flex-col xl:h-[390px]">
            <CardHeader
                icon={<Percent size={19} />}
                title="Descuentos"
                description="Agregá los descuentos que se aplicarán al total."
            />

            <div className="min-h-0 flex-1 overflow-y-auto pr-1 [scrollbar-gutter:stable]">
                {discounts.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-white/10 px-4 py-6 text-center">
                        <p className="text-xs text-zinc-500">
                            Todavía no agregaste ningún descuento.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {discounts.map((discount) => (
                            <DiscountItem
                                key={discount.id}
                                discount={discount}
                                onRemove={removeDiscount}
                                onUpdate={updateDiscount}
                            />
                        ))}
                    </div>
                )}
            </div>

            <Button
                type="button"
                variant="ghost"
                onClick={addDiscount}
                className="mt-4 flex shrink-0 items-center gap-2 px-0 text-violet-400 hover:bg-transparent hover:text-violet-300"
            >
                <Plus size={17} />
                Agregar descuento
            </Button>
        </Card>
    );
}