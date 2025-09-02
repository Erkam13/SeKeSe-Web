import React from "react";
import { BarChart3, Users2, BookmarkCheck, Mic2 } from "lucide-react";

type StatItem = {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    value: number;
    suffix?: string;        // örn: "+"
    label: string;          // ana etiket (kalın)
    sublabel?: string;      // ikinci satır
};

type StatsProps = {
    items?: StatItem[];
};

function useCountUp(target: number, durationMs = 900) {
    const [val, setVal] = React.useState(0);
    React.useEffect(() => {
        let start: number | null = null;
        const tick = (t: number) => {
            if (start === null) start = t;
            const p = Math.min(1, (t - start) / durationMs);
            setVal(Math.round(target * p));
            if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [target, durationMs]);
    return val;
}

const defaultItems: StatItem[] = [
    { icon: BarChart3, value: 642, suffix: "+", label: "Toplam Etkinlik Sayısı" },
    { icon: Users2, value: 93, label: "Öğrenci Kulüpleri", sublabel: "Üye Sayısı" },
    { icon: BookmarkCheck, value: 23000, suffix: "+", label: "Toplam Üye Sayısı", sublabel: "Sayısı" },
    { icon: Mic2, value: 100, suffix: "+", label: "Toplam Konuşmacı", sublabel: "Sayısı" },
];

const Stats: React.FC<StatsProps> = ({ items = defaultItems }) => {
    return (
        <section className="px-6">
            <div className="mx-auto max-w-7xl rounded-2xl border border-slate-200 bg-white/70 backdrop-blur shadow-sm p-3 sm:p-4">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {items.map((it, i) => {
                        const counted = useCountUp(it.value);
                        const Icon = it.icon;
                        return (
                            <div
                                key={i}
                                className="rounded-xl border border-slate-200 bg-white px-5 py-6 shadow hover:shadow-md transition"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="h-10 w-10 grid place-items-center rounded-lg bg-emerald-600/10 text-emerald-700">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-2xl font-extrabold tracking-tight text-slate-900">
                                            {counted.toLocaleString("tr-TR")}
                                            {it.suffix ?? ""}
                                        </div>
                                        <div className="mt-1 text-sm font-medium text-slate-800">
                                            {it.label}
                                        </div>
                                        {it.sublabel && (
                                            <div className="text-xs text-slate-500">{it.sublabel}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <p className="mt-3 px-1 text-[11px] text-right text-slate-500">
                    * Rakamlar dönemsel olarak güncellenir.
                </p>
            </div>
        </section>
    );
};

export default Stats;