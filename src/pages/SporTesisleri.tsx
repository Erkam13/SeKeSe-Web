// src/pages/SporTesisleri.tsx
import React from "react";
import { facilities, type Facility, type FacilityType } from "../data/facilities";
import { MapPin, Info, Search, ChevronRight, Clock, BadgeCheck, ExternalLink, X } from "lucide-react";

const uniq = <T extends string>(arr: T[]) => Array.from(new Set(arr));

const badge =
    "inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 px-2.5 py-0.5 text-xs font-semibold";

const chip = (active: boolean) =>
    `rounded-full px-3 py-1 text-sm font-semibold transition ${active ? "bg-emerald-600 text-white shadow" : "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
    }`;

const card =
    "group relative bg-white rounded-2xl border border-slate-200/70 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300";

// shared button styles
const btnBase =
    "inline-flex items-center justify-center gap-2 rounded-xl px-3 h-10 text-sm transition";
const btnOutline =
    btnBase + " border border-slate-200 hover:bg-slate-50 text-slate-800";
const btnPrimary =
    btnBase + " bg-emerald-600 text-white hover:bg-emerald-700";

const SporTesisleri: React.FC = () => {
    const [query, setQuery] = React.useState("");
    const [campus, setCampus] = React.useState<string>("");
    const [type, setType] = React.useState<FacilityType | "">("");

    const [open, setOpen] = React.useState<Facility | null>(null);

    const campuses = React.useMemo(() => uniq(facilities.map(f => f.campus)), []);
    const types = React.useMemo(() => uniq(facilities.map(f => f.type)), []);

    const filtered = React.useMemo(() => {
        let list = [...facilities];
        if (query.trim()) {
            const s = query.toLowerCase();
            list = list.filter(f => f.name.toLowerCase().includes(s) || f.description.toLowerCase().includes(s));
        }
        if (campus) list = list.filter(f => f.campus === campus);
        if (type) list = list.filter(f => f.type === type);
        return list;
    }, [query, campus, type]);

    return (
        <div className="bg-gray-50/60 min-h-screen">
            {/* Header */}
            <div className="mx-auto max-w-7xl px-6 pt-10">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
                            Spor Tesisleri
                        </h1>
                        <p className="text-slate-600">
                            Kampüslerimizdeki salonlar, sahalar ve spor olanakları.
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <div className="mt-5 flex flex-wrap gap-3 items-center">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Ara: tesis adı, özellik…"
                            className="h-11 w-72 rounded-xl border border-slate-200 pl-9 pr-3 outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <button className={chip(!campus)} onClick={() => setCampus("")}>Tüm Yerleşkeler</button>
                        {campuses.map(c => (
                            <button key={c} className={chip(campus === c)} onClick={() => setCampus(c)}>{c}</button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <button className={chip(!type)} onClick={() => setType("")}>Tüm Türler</button>
                        {types.map(t => (
                            <button key={t} className={chip(type === t)} onClick={() => setType(t)}>{t}</button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="mx-auto max-w-7xl px-6 pb-12 pt-6 grid gap-8 lg:gap-10 justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map(f => (
                    <article key={f.id} className={card}>

                        {/* image */}
                        <div className="aspect-[4/3] w-full overflow-hidden">
                            <img
                                src={f.image || `https://picsum.photos/seed/${encodeURIComponent(f.id)}/800/600.webp`}
                                alt={f.name}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                            />
                        </div>

                        <div className="p-5 space-y-3">
                            <div className="flex items-center justify-between gap-3">
                                <h3 className="text-xl font-extrabold tracking-tight text-slate-900">{f.name}</h3>
                                <span className={badge}>{f.campus}</span>
                            </div>

                            <p className="text-slate-600">{f.description}</p>

                            <div className="flex flex-wrap gap-2">
                                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 text-slate-700 ring-1 ring-slate-200 px-2 py-0.5 text-xs font-semibold">
                                    <Clock className="h-3.5 w-3.5" /> {f.hours}
                                </span>
                                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 text-slate-700 ring-1 ring-slate-200 px-2 py-0.5 text-xs font-semibold">
                                    <BadgeCheck className="h-3.5 w-3.5" /> {f.type}
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {f.amenities.slice(0, 4).map((a, i) => (
                                    <span key={i} className="rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 px-2 py-0.5 text-xs font-semibold">
                                        {a}
                                    </span>
                                ))}
                                {f.amenities.length > 4 && (
                                    <span className="rounded-full bg-slate-100 text-slate-700 ring-1 ring-slate-200 px-2 py-0.5 text-xs">
                                        +{f.amenities.length - 4}
                                    </span>
                                )}
                            </div>

                            <div className="pt-1 flex items-center gap-2">
                                {f.mapUrl && (
                                    <a
                                        href={f.mapUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={btnOutline}
                                        title="Haritada göster"
                                    >
                                        <MapPin className="h-4 w-4" /> Haritada Aç
                                    </a>
                                )}
                                {f.reservationUrl && (
                                    <a
                                        href={f.reservationUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={btnPrimary}
                                        title="Rezervasyon"
                                    >
                                        Rezervasyon <ExternalLink className="h-4 w-4" />
                                    </a>
                                )}
                                <button
                                    onClick={() => setOpen(f)}
                                    className={"ml-auto " + btnOutline}
                                    title="Detay"
                                >
                                    <Info className="h-4 w-4" /> Detay
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {/* Drawer / Modal */}
            {open && (
                <aside
                    className="fixed right-4 bottom-4 w-[min(560px,calc(100%-32px))] max-h-[80vh] overflow-auto bg-white border border-slate-200 shadow-2xl rounded-2xl z-50"
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="flex items-center justify-between px-4 py-3 border-b bg-slate-50/60">
                        <div>
                            <h3 className="text-lg font-extrabold text-slate-900">{open.name}</h3>
                            <p className="text-sm text-slate-600">{open.campus} • {open.type}</p>
                        </div>
                        <button
                            onClick={() => setOpen(null)}
                            className="h-8 w-8 grid place-items-center rounded-md border hover:bg-white"
                            aria-label="Kapat"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="px-4 py-4 space-y-4">
                        <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-100">
                            <img
                                src={open.image || `https://picsum.photos/seed/${encodeURIComponent(open.id)}/1200/675.webp`}
                                alt={open.name}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <p className="text-slate-700">{open.description}</p>

                        <div className="flex flex-wrap gap-2">
                            {open.amenities.map((a, i) => (
                                <span key={i} className="rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 px-2 py-0.5 text-xs font-semibold">
                                    {a}
                                </span>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="rounded-xl border p-3">
                                <div className="text-xs text-slate-500">Çalışma Saatleri</div>
                                <div className="font-semibold text-slate-800">{open.hours}</div>
                            </div>
                            {open.contact && (open.contact.email || open.contact.phone) && (
                                <div className="rounded-xl border p-3">
                                    <div className="text-xs text-slate-500">İletişim</div>
                                    <div className="font-semibold text-slate-800">
                                        {open.contact.email && <div>{open.contact.email}</div>}
                                        {open.contact.phone && <div>{open.contact.phone}</div>}
                                    </div>
                                </div>
                            )}
                        </div>

                        {open.rules && open.rules.length > 0 && (
                            <div className="rounded-xl border p-3">
                                <div className="text-xs text-slate-500 mb-1">Tesis Kuralları</div>
                                <ul className="list-disc pl-5 space-y-1 text-slate-700">
                                    {open.rules.map((r, i) => <li key={i}>{r}</li>)}
                                </ul>
                            </div>
                        )}

                        <div className="flex items-center gap-2 pt-1">
                            {open.mapUrl && (
                                <a href={open.mapUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 hover:bg-slate-50">
                                    <MapPin className="h-4 w-4" /> Haritada Aç
                                </a>
                            )}
                            {open.reservationUrl && (
                                <a href={open.reservationUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 text-white px-3 py-2 hover:bg-emerald-700">
                                    Rezervasyon <ExternalLink className="h-4 w-4" />
                                </a>
                            )}
                            <span className="ml-auto text-slate-500 text-sm flex items-center gap-1">
                                Daha fazla bilgi için SKS ile iletişime geçiniz.
                                <ChevronRight className="h-4 w-4" />
                            </span>
                        </div>
                    </div>
                </aside>
            )}
        </div>
    );
};

export default SporTesisleri;