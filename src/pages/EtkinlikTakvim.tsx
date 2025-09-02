import React from "react";

/* ---------- Tipler ---------- */
type EventType = "Seminer" | "Konferans" | "Tiyatro" | "Kulüp Etkinliği" | "Spor";

type CalendarEvent = {
    id: string;
    title: string;
    date: string;           // ISO: "2025-10-07"
    type: EventType;
};

type DayCell = {
    date: Date;
    inCurrentMonth: boolean;
};

/* ---------- Renkler / stiller ---------- */
const TYPE_STYLES: Record<EventType, string> = {
    Seminer: "bg-yellow-100 text-yellow-800 ring-1 ring-yellow-200",
    Konferans: "bg-rose-100 text-rose-800 ring-1 ring-rose-200",
    Tiyatro: "bg-violet-100 text-violet-800 ring-1 ring-violet-200",
    "Kulüp Etkinliği": "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200",
    Spor: "bg-cyan-100 text-cyan-800 ring-1 ring-cyan-200",
};

// legend noktaları için daha belirgin renk (küçük daire)
const TYPE_DOT: Record<EventType, string> = {
    Seminer: "bg-yellow-400",
    Konferans: "bg-rose-400",
    Tiyatro: "bg-violet-400",
    "Kulüp Etkinliği": "bg-emerald-400",
    Spor: "bg-cyan-400",
};

/* ---------- Yardımcılar ---------- */
const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

function toISO(d: Date) {
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// Haftanın ilk günü: Pazartesi
function getMonthGrid(year: number, monthIndex0: number): DayCell[] {
    const first = new Date(year, monthIndex0, 1);
    const dow = (first.getDay() + 6) % 7; // 0..6 (0: Pazartesi)
    const start = new Date(year, monthIndex0, 1 - dow);

    const cells: DayCell[] = [];
    for (let i = 0; i < 42; i++) {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        cells.push({
            date: d,
            inCurrentMonth: d.getMonth() === monthIndex0,
        });
    }
    return cells;
}

function monthTitle(d: Date) {
    return d.toLocaleDateString("tr-TR", { year: "numeric", month: "long" });
}

const WEEKDAY_TR = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

/* ---------- Örnek veri (demo) ---------- */
const SAMPLE_EVENTS: CalendarEvent[] = [
    { id: "1", title: "Örnek Etkinlik", date: "2025-10-02", type: "Kulüp Etkinliği" },
    { id: "2", title: "Örnek Etkinlik", date: "2025-10-04", type: "Konferans" },
    { id: "3", title: "Örnek Etkinlik", date: "2025-10-05", type: "Spor" },
    { id: "4", title: "Örnek Etkinlik", date: "2025-10-07", type: "Tiyatro" },
    { id: "5", title: "Örnek Etkinlik", date: "2025-10-07", type: "Kulüp Etkinliği" },
    { id: "6", title: "Örnek Etkinlik", date: "2025-10-09", type: "Kulüp Etkinliği" },
    { id: "7", title: "Örnek Etkinlik", date: "2025-10-11", type: "Konferans" },
    { id: "8", title: "Örnek Etkinlik", date: "2025-10-12", type: "Seminer" },
    { id: "9", title: "Örnek Etkinlik", date: "2025-10-14", type: "Tiyatro" },
    { id: "10", title: "Örnek Etkinlik", date: "2025-10-15", type: "Konferans" },
    { id: "11", title: "Örnek Etkinlik", date: "2025-10-16", type: "Konferans" },
    { id: "12", title: "Örnek Etkinlik", date: "2025-10-16", type: "Seminer" },
    { id: "13", title: "Örnek Etkinlik", date: "2025-10-18", type: "Seminer" },
    { id: "14", title: "Örnek Etkinlik", date: "2025-10-19", type: "Kulüp Etkinliği" },
    { id: "15", title: "Örnek Etkinlik", date: "2025-10-22", type: "Konferans" },
    { id: "16", title: "Örnek Etkinlik", date: "2025-10-22", type: "Tiyatro" },
    { id: "17", title: "Örnek Etkinlik", date: "2025-10-23", type: "Tiyatro" },
    { id: "18", title: "Örnek Etkinlik", date: "2025-10-23", type: "Seminer" },
    { id: "19", title: "Örnek Etkinlik", date: "2025-10-24", type: "Seminer" },
    { id: "20", title: "Örnek Etkinlik", date: "2025-10-25", type: "Konferans" },
];

/* ---------- Bileşen ---------- */
const EtkinlikTakvim: React.FC = () => {
    const [cursor, setCursor] = React.useState(() => new Date(2025, 9, 1)); // Ekim 2025
    const [events, setEvents] = React.useState<CalendarEvent[]>(SAMPLE_EVENTS);

    // Drawer (detay)
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [drawerDate, setDrawerDate] = React.useState<Date | null>(null);
    const [drawerList, setDrawerList] = React.useState<CalendarEvent[]>([]);

    const grid = React.useMemo(
        () => getMonthGrid(cursor.getFullYear(), cursor.getMonth()),
        [cursor]
    );

    const byDate = React.useMemo(() => {
        const map = new Map<string, CalendarEvent[]>();
        for (const e of events) {
            if (!map.has(e.date)) map.set(e.date, []);
            map.get(e.date)!.push(e);
        }
        return map;
    }, [events]);

    const gotoPrev = () =>
        setCursor((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
    const gotoNext = () =>
        setCursor((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
    const gotoToday = () => {
        const t = new Date();
        setCursor(new Date(t.getFullYear(), t.getMonth(), 1));
    };

    const addDummy = () => {
        const day = new Date(
            cursor.getFullYear(),
            cursor.getMonth(),
            1 + Math.floor(Math.random() * 27)
        );
        const types: EventType[] = ["Seminer", "Konferans", "Tiyatro", "Kulüp Etkinliği", "Spor"];
        const type = types[Math.floor(Math.random() * types.length)];
        setEvents((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                title: "Yeni Etkinlik",
                date: toISO(day),
                type,
            },
        ]);
    };

    function openDrawer(date: Date, list: CalendarEvent[]) {
        setDrawerDate(date);
        setDrawerList(list);
        setDrawerOpen(true);
    }

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-6">
            {/* Header */}
            <div className="mb-4 flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-bold">{monthTitle(cursor)}</h1>
                <span className="text-slate-500 ml-2 hidden sm:inline">Aylık görünüm</span>
                <div className="ml-auto flex items-center gap-2">
                    <button
                        onClick={gotoPrev}
                        className="h-9 w-9 rounded-xl border bg-white hover:bg-slate-50 grid place-items-center"
                        aria-label="Önceki ay"
                    >
                        ‹
                    </button>
                    <button
                        onClick={gotoToday}
                        className="h-9 px-3 rounded-xl border bg-white hover:bg-slate-50"
                        aria-label="Bugün"
                    >
                        T
                    </button>
                    <button
                        onClick={gotoNext}
                        className="h-9 w-9 rounded-xl border bg-white hover:bg-slate-50 grid place-items-center"
                        aria-label="Sonraki ay"
                    >
                        ›
                    </button>
                    <button
                        onClick={addDummy}
                        className="ml-2 h-9 px-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
                    >
                        Örnek Ekle
                    </button>
                </div>
            </div>

            {/* Weekdays */}
            <div className="grid grid-cols-7 rounded-t-xl border border-slate-200 bg-slate-50 text-center text-sm font-medium text-slate-600">
                {WEEKDAY_TR.map((w) => (
                    <div key={w} className="py-2">
                        {w}
                    </div>
                ))}
            </div>

            {/* Month grid */}
            <div className="grid grid-cols-7 border-x border-b border-slate-200 rounded-b-xl overflow-hidden">
                {grid.map((cell, idx) => {
                    const iso = toISO(cell.date);
                    const dayEvents = byDate.get(iso) ?? [];
                    const isToday = iso === toISO(new Date());

                    return (
                        <div
                            key={idx}
                            className={`min-h-[108px] border-r border-b border-slate-200 p-2 ${cell.inCurrentMonth ? "bg-white" : "bg-slate-50/60"
                                }`}
                        >
                            {/* gün numarası */}
                            <div className="mb-1 flex items-center justify-between">
                                <span
                                    className={`text-sm ${cell.inCurrentMonth ? "text-slate-800" : "text-slate-400"
                                        }`}
                                >
                                    {cell.date.getDate()}
                                </span>
                                {isToday && (
                                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                                        bugün
                                    </span>
                                )}
                            </div>

                            {/* etkinlik rozetleri */}
                            <div className="space-y-1">
                                {dayEvents.slice(0, 3).map((e) => (
                                    <button
                                        key={e.id}
                                        onClick={() => openDrawer(cell.date, dayEvents)}
                                        title={`${e.title} • ${e.type}`}
                                        className={`w-full text-left flex items-center gap-2 rounded-full px-2 py-1 text-xs truncate ${TYPE_STYLES[e.type]}`}
                                    >
                                        <span className="h-2 w-2 rounded-full bg-current/70 opacity-70" />
                                        <span className="truncate">{e.title}</span>
                                    </button>
                                ))}
                                {dayEvents.length > 3 && (
                                    <button
                                        onClick={() => openDrawer(cell.date, dayEvents)}
                                        className="text-[11px] text-emerald-600 hover:underline"
                                    >
                                        +{dayEvents.length - 3} daha
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="mt-3 flex flex-wrap items-center gap-4 rounded-xl border border-slate-200 bg-white p-3 text-sm">
                {(Object.keys(TYPE_STYLES) as EventType[]).map((t) => (
                    <div key={t} className="flex items-center gap-2">
                        <span className={`h-2.5 w-2.5 rounded-full ${TYPE_DOT[t]}`} />
                        <span className="text-slate-700">{t}</span>
                    </div>
                ))}
            </div>

            {/* Drawer (detay) */}
            {drawerOpen && (
                <aside
                    role="dialog"
                    aria-modal="true"
                    className="fixed right-4 bottom-4 w-[min(520px,calc(100%-32px))] max-h-[70vh] overflow-auto
                     bg-white border border-slate-200 shadow-xl rounded-2xl"
                >
                    <div className="flex items-center justify-between px-4 py-3 border-b">
                        <h3 className="text-base font-semibold">
                            {drawerDate &&
                                `${drawerDate.getDate()} ${drawerDate.toLocaleString("tr-TR", {
                                    month: "long",
                                })} ${drawerDate.getFullYear()}`}
                        </h3>
                        <button
                            onClick={() => setDrawerOpen(false)}
                            className="h-8 w-8 grid place-items-center rounded-md border hover:bg-slate-50"
                            aria-label="Kapat"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="px-4 py-3 space-y-2">
                        {drawerList.map((ev) => (
                            <div key={ev.id} className="flex items-start gap-2 text-sm">
                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${TYPE_STYLES[ev.type]}`}>
                                    {ev.type}
                                </span>
                                <div>
                                    <div className="font-semibold">{ev.title}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>
            )}
        </div>
    );
};

export default EtkinlikTakvim;