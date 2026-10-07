import { ButtonHTMLAttributes } from "react";

type ButtonVariant =
    | "primary"
    | "secondary"
    | "ghost"
    | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
}

const variantClasses: Record<ButtonVariant, string> = {
    primary: "bg-violet-600 text-white hover:bg-violet-500",

    secondary: "border border-white/10 bg-[#080d18] text-zinc-300 hover:border-violet-500/50 hover:text-white",

    ghost: "text-zinc-400 hover:bg-white/5 hover:text-white",

    danger: "text-zinc-500 hover:bg-red-500/10 hover:text-red-400",
}

export default function Button({ variant = "secondary", className = "", children, ...props }: ButtonProps) {
    return (
        <button
            {...props}
            className={`rounded-lg px-3 py-2 text-xs font-medium transition ${variantClasses[variant]} ${className}`}
        >
            {children}
        </button>
    )
}