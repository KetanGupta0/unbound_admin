import { LucideIcon } from "lucide-react";

interface StatCardProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
        value: number;
        isUp: boolean;
    };
    color: string;
}

export default function StatCard({ label, value, icon: Icon, trend, color }: StatCardProps) {
    return (
        <div className="p-6 bg-white rounded-2xl shadow-premium border border-border transition-soft hover:translate-y-[-2px]">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">{label}</p>
                    <h3 className="text-2xl font-bold mt-1 text-foreground">{value}</h3>

                    {trend && (
                        <div className={`flex items-center gap-1 mt-2 text-xs font-semibold ${trend.isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                            <svg
                                className={`w-3 h-3 ${trend.isUp ? '' : 'rotate-180'}`}
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                            >
                                <path d="m5 12 7-7 7 7M12 19V5" />
                            </svg>
                            {trend.value}%
                            <span className="text-muted-foreground font-normal ml-1">since last month</span>
                        </div>
                    )}
                </div>

                <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-opacity-100 flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
                </div>
            </div>
        </div>
    );
}
