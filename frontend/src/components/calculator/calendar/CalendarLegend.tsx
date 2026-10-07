interface LegendItemProps {
    label: string;
    className: string;
}

const LegendItem = ({ label, className }: LegendItemProps) => {
    return (
        <div className="flex items-center gap-2">
            <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${className}`} />
            <span>{label}</span>
        </div>
    );
};

export default function CalendarLegend() {
    return (
        <div
            aria-label="Referencias del calendario"
            className="mb-4 flex flex-wrap items-center gap-4 text-xs text-zinc-400"
        >
            <LegendItem label="Normal" className="bg-zinc-500" />

            <LegendItem label="Domingo" className="bg-violet-500" />

            <LegendItem label="Feriado" className="bg-amber-400" />
        </div>
    );
}