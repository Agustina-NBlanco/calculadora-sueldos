import { ReactNode } from "react"

interface CardHeaderProps {
    icon: ReactNode
    title: string
    description?: string
    action?: ReactNode
}

export default function CardHeader({ icon, title, description, action, }: CardHeaderProps) {
    return (
        <header className="mb-5 flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
                <div
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400"
                >
                    {icon}
                </div>

                <div>
                    <h2 className="text-sm font-semibold text-white">
                        {title}
                    </h2>

                    {description && (
                        <p className="mt-1 text-xs text-zinc-500">{description}</p>
                    )}
                </div>
            </div>

            {action && action}
        </header>
    )
}