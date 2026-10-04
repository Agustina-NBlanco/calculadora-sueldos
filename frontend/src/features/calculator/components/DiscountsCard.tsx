"use client";

import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

type DiscountType = "percentage" | "fixed_amount";

interface Discount {
    id: number;
    name: string;
    type: DiscountType;
    value: number;
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
                value: 0,
            },
        ]);
    };

    const removeDiscount = (id: number) => {
        setDiscounts((current) =>
            current.filter((discount) => discount.id !== id)
        );
    };

    const updateDiscount = (
        id: number,
        field: keyof Discount,
        value: string
    ) => {
        setDiscounts((current) =>
            current.map((discount) =>
                discount.id === id
                    ? { ...discount, [field]: value }
                    : discount
            )
        );
    };

    return (
        <section className="flex flex-col rounded-2xl border border-white/10 bg-[#0d1422] p-5 xl:h-[390px]">
            <div className="mb-5 shrink-0">
                <h2 className="text-sm font-semibold text-white">Descuentos</h2>

                <p className="mt-1 text-xs text-zinc-500">
                    Agregá los descuentos que se aplicarán al total.
                </p>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto pr-1 [scrollbar-gutter:stable]">
                {discounts.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-white/10 px-4 py-6 text-center">
                        <p className="text-xs text-zinc-500">Todavía no agregaste ningún descuento.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {discounts.map((discount) => (
                            <div key={discount.id}
                                className="rounded-lg border border-white/10 bg-[#080d18] p-3"
                            >
                                <div className="mb-3 flex items-center justify-between gap-2">
                                    <input type="text" value={discount.name} onChange={(event) =>
                                        updateDiscount(discount.id, "name", event.target.value)
                                    }
                                        className="min-w-0 flex-1 bg-transparent text-sm font-medium text-white outline-none placeholder:text-zinc-600"
                                        placeholder="Nombre del descuento"
                                    />

                                    <button type="button" onClick={() => removeDiscount(discount.id)}
                                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-red-500/10 hover:text-red-400"
                                        aria-label={`Eliminar ${discount.name}`}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                <div className="grid grid-cols-[1fr_90px] gap-2">
                                    <div className="relative">
                                        {discount.type === "fixed_amount" && (
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                                                $
                                            </span>
                                        )}

                                        <input type="text" inputMode="decimal" value={discount.value}
                                            onChange={(event) =>
                                                updateDiscount(
                                                    discount.id,
                                                    "value",
                                                    event.target.value
                                                )
                                            }
                                            className={`w-full rounded-lg border border-white/10 bg-[#0d1422] 
                                                py-2.5 pr-3 text-sm text-white outline-none transition 
                                                focus:border-violet-500 ${discount.type === "fixed_amount"
                                                    ? "pl-8"
                                                    : "pl-3"
                                                }`}
                                            placeholder="0"
                                        />

                                        {discount.type === "percentage" && (
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                                                %
                                            </span>
                                        )}
                                    </div>

                                    <select
                                        value={discount.type}
                                        onChange={(event) =>
                                            updateDiscount(
                                                discount.id,
                                                "type",
                                                event.target.value as DiscountType
                                            )
                                        }
                                        className="rounded-lg border border-white/10 bg-[#0d1422] px-2 text-xs text-white outline-none transition focus:border-violet-500"
                                    >
                                        <option value="percentage">%</option>
                                        <option value="fixed_amount">$</option>
                                    </select>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <button type="button" onClick={addDiscount} className="mt-4 flex shrink-0 items-center gap-2 text-sm font-medium text-violet-400 transition hover:text-violet-300">
                <Plus size={17} />
                Agregar descuento
            </button>
        </section>
    );
}