import { SelectHTMLAttributes } from "react";


export default function Select({ className = "", children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
    return (
        <select
            {...props}
            className={`rounded-lg border border-white/10 bg-[#080d18] px-3 py-2.5 text-sm text-white outline-none transition focus:border-violet-500 ${className}`}
        >
            {children}
        </select>
    );
}