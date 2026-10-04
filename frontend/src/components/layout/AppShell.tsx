import { ReactNode } from "react";
import Sidebar from "./Sidebar";


interface AppShellProps {
    children: ReactNode
}

export default function AppShell({ children }: AppShellProps) {
    return (
        <div className="flex min-h-screen bg-[#080d18] text-white">
            <Sidebar />

            <main className="min-w-0 flex-1">
                {children}
            </main>
        </div>
    );
}