import React from "react";
import AddEventModal from "../AddEventModal";

/* ---------- Tipler ---------- */
type EventType = "Seminer" | "Konferans" | "Tiyatro" | "Kulüp Etkinliği" | "Spor";

type CalendarEvent = {
    id: string;
    title: string;
    date: string;   // ISO: "2025-10-07"
    type: EventType;
    time?: string;  // "14:00" gibi - opsiyonel
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

// legend noktaları
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

function normalizeDate(input: string | Date): string {
    if (input instanceof Date) return toISO(input);
    // accept values like "2025-10-02" or "2025-10-02T00:00" and similar
    const match = typeof input === 'string' ? input.match(/^\d{4}-\d{2}-\d{2}/) : null;
    if (match && match[0]) return match[0];
    // fallback: try to construct a Date and convert
    const d = new Date(input as any);
    return toISO(d);
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
    { id: "1", title: "Sürdürülebilirlik ve İklim Paneli", date: "2025-09-02", type: "Kulüp Etkinliği" },
    { id: "2", title: "Yapay Zeka Konferansı", date: "2025-09-04", type: "Konferans" },
    { id: "3", title: "Spor Festivali", date: "2025-09-05", type: "Spor" },
    { id: "4", title: "Sabır Taşı Tiyatro Gösterimi", date: "2025-09-07", type: "Tiyatro" },
    { id: "5", title: "Tebessüm Kulübü Tanışma Toplantısı", date: "2025-09-07", type: "Kulüp Etkinliği" },
    { id: "6", title: "Robotik Çalıştayı", date: "2025-09-09", type: "Kulüp Etkinliği" },
    { id: "7", title: "Uluslararası Öğrenciler Buluşması", date: "2025-09-11", type: "Konferans" },
    { id: "8", title: "Psikoloji Semineri", date: "2025-09-12", type: "Seminer" },
    { id: "9", title: "Sinema Kulübü Gösterimi", date: "2025-09-14", type: "Tiyatro" },
    { id: "10", title: "Girişimcilik Zirvesi", date: "2025-09-15", type: "Konferans" },
    { id: "11", title: "Akademik Yayın Çalıştayı", date: "2025-09-16", type: "Konferans" },
    { id: "12", title: "Sağlık Bilimleri Söyleşisi", date: "2025-09-16", type: "Seminer" },
    { id: "13", title: "Kültür ve Sanat Festivali", date: "2025-09-18", type: "Seminer" },
    { id: "14", title: "Çevre Kulübü Etkinliği", date: "2025-09-19", type: "Kulüp Etkinliği" },
    { id: "15", title: "Mühendislik Kariyer Günü", date: "2025-09-22", type: "Konferans" },
    { id: "16", title: "Tiyatro Atölyesi", date: "2025-09-22", type: "Tiyatro" },
    { id: "17", title: "Dans Gösterisi", date: "2025-09-23", type: "Tiyatro" },
    { id: "18", title: "İnovasyon Semineri", date: "2025-09-23", type: "Seminer" },
    { id: "19", title: "Veri Bilimi Workshop", date: "2025-09-24", type: "Seminer" },
    { id: "20", title: "Uluslararası Konferans", date: "2025-09-25", type: "Konferans" },
];

/* ---------- Bileşen ---------- */
const EtkinlikTakvim: React.FC = () => {
    const [cursor, setCursor] = React.useState(() => {
        const t = new Date();
        return new Date(t.getFullYear(), t.getMonth(), 1);
    });
    const [events, setEvents] = React.useState<CalendarEvent[]>(SAMPLE_EVENTS);

    // Drawer (detay)
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [drawerDate, setDrawerDate] = React.useState<Date | null>(null);
    const [drawerList, setDrawerList] = React.useState<CalendarEvent[]>([]);

    // Modal
    const [isModalOpen, setIsModalOpen] = React.useState(false);

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


    // Modal'dan gelen veriyi ekle
    const addEventManual = (data: { title: string; date: string | Date; time: string; type: string }) => {
        const iso = normalizeDate(data.date);
        const t = (data.type as EventType) || "Seminer";
        const newEvent: CalendarEvent = {
            id: crypto.randomUUID(),
            title: data.title?.trim() || "Yeni Etkinlik",
            date: iso,
            type: t,
            time: data.time || undefined,
        };

        setEvents((prev) => [...prev, newEvent]);
        // kullanıcı eklediği ayı hemen görsün
        setCursor(new Date(iso));
        setIsModalOpen(false);
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

                    {/* Etkinlik ekleme */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="ml-2 h-9 px-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
                    >
                        Etkinlik Ekle
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
                                        title={`${e.title} • ${e.type}${e.time ? " • " + e.time : ""}`}
                                        className={`w-full text-left flex items-center gap-2 rounded-full px-2 py-1 text-xs truncate ${TYPE_STYLES[e.type]}`}
                                    >
                                        <span className="h-2 w-2 rounded-full bg-current/70 opacity-70" />
                                        <span className="truncate">
                                            {e.time ? `${e.time} • ` : ""}
                                            {e.title}
                                        </span>
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
                                    {ev.time && <div className="text-slate-500">{ev.time}</div>}
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>
            )}

            {/* Etkinlik Ekle Modal */}
            <AddEventModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={addEventManual}
            />
        </div>
    );
};

export default EtkinlikTakvim;