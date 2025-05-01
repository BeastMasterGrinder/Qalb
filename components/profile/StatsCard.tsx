interface StatsCardProps {
    title: string;
    value: string | number;
    unit?: string;
}

export default function StatsCard({ title, value, unit }: StatsCardProps) {
    return (
        <div className="bg-primary/5 backdrop-blur-sm rounded-xl border border-primary/20 p-6 transition-all duration-300 hover:border-primary/40 hover:bg-primary/10">
            <h3 className="text-lg font-semibold text-primary/80">{title}</h3>
            <p className="text-3xl font-bold text-primary mt-2 flex items-baseline gap-1">
                {value}
                {unit && <span className="text-lg text-primary/70">{unit}</span>}
            </p>
        </div>
    );
} 