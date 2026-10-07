import { InputHTMLAttributes } from "react";


export default function Input({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className={`rounded-lg border border-white/10 bg-[#080d18] px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500 ${className}`}
        />
    );
}