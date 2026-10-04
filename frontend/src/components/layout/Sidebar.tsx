"use client"

import { Calculator, CircleHelp, ClipboardList, FileText, LogOut, Plus, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";


const navigationItems = [
    {
        label: "Nuevo cálculo",
        href: "/calculator",
        icon: Plus,
    },
    {
        label: "Mis cálculos",
        href: "/calculations",
        icon: ClipboardList,
    },
    {
        label: "Plantillas",
        href: "/templates",
        icon: FileText,
    },
    {
        label: "Configuración",
        href: "/settings",
        icon: Settings,
    },
    {
        label: "Acerca de",
        href: "/about",
        icon: CircleHelp,
    },
];

export default function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className="flex h-screen w-64 flex-col border-r border-white/10 bg-[#0b1120]">
            <div className="flex h-24 items-center border-b border-white/10 px-6">
                <Link href="/calculator" className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600">
                        <Calculator size={22} />
                    </div>

                    <div>
                        <h1 className="text-lg font-semibold text-white">
                            CalculaTuSueldo
                        </h1>

                        <p className="text-xs text-zinc-400">
                            Tu trabajo, tu cálculo.
                        </p>
                    </div>
                </Link>
            </div>

            <nav className="flex flex-1 flex-col gap-2 p-4">
                {navigationItems.map((item) => {
                    const Icon = item.icon;

                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${isActive
                                ? "bg-violet-600 text-white"
                                : "text-zinc-400 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            <Icon size={19} />

                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="border-t border-white/10 p-4">
                <div className="mb-4 flex items-center gap-3 px-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-600 font-semibold">
                        A
                    </div>

                    <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white">
                            Usuario
                        </p>

                        <p className="truncate text-xs text-zinc-500">
                            usuario@email.com
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-white"
                >
                    <LogOut size={18} />
                    <span>Cerrar sesión</span>
                </button>
            </div>
        </aside>
    );
}
