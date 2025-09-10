import React from "react";
import { Link } from "react-router-dom";
import {
    Users2,
    Calendar,
    RotateCcw,
    ChevronLeft,
    ChevronRight,
    Search,
    FileText,
    FileDown,
    Book
} from "lucide-react";
import { clubs as clubData, type ClubDetail, type CatKey, catLabel } from "../data/clubs";


/* ===================== Helpers ===================== */
const catBadge: Record<CatKey, string> = {
    teknoloji: "bg-emerald-100/70 text-emerald-800 ring-emerald-200",
    "kultur-sanat": "bg-violet-100/70 text-violet-800 ring-violet-200",
    sosyal: "bg-orange-100/70 text-orange-800 ring-orange-200",
    spor: "bg-rose-100/70 text-rose-800 ring-rose-200",
    akademik: "bg-sky-100/70 text-sky-800 ring-sky-200",
};

function initials(name: string) {
    return name
        .split(/\s+/)
        .slice(0, 2)
        .map((s) => s[0])
        .join("")
        .toUpperCase();
}

const forms: { id: string; title: string; href: string }[] = [
    { id: "f1", title: "Etkinlik Talep Formu", href: "/forms/etkinlik-talep-formu.pdf" },
    { id: "f2", title: "Salon / Mekân Tahsis Formu", href: "/forms/mekan-tahsis-formu.pdf" },
    { id: "f3", title: "Kulüp Kurulum Başvuru Formu", href: "/forms/kulup-kurulum-basvuru.pdf" },
    { id: "f4", title: "Kulüp Danışmanı Onay Formu", href: "/forms/danisman-onay-formu.pdf" },
    { id: "f5", title: "Afiş / Duyuru Onay Formu", href: "/forms/afis-duyuru-onay.pdf" },
    { id: "f6", title: "Teknik Ekipman Talep Formu", href: "/forms/teknik-ekipman-talep.pdf" },
    { id: "f7", title: "Seyahat / Ulaşım Talep Formu", href: "/forms/ulasim-talep.pdf" },
    { id: "f8", title: "Bütçe / Destek Talep Formu", href: "/forms/butce-destek-talep.pdf" },
    { id: "f9", title: "Etkinlik Sonuç Raporu", href: "/forms/etkinlik-sonuc-raporu.pdf" },
];

/* ===================== Component ===================== */
const Kulupler: React.FC = () => {
    const all: ClubDetail[] = clubData;

    // filtre durumları
    const [q, setQ] = React.useState("");
    const [cat, setCat] = React.useState<string>("");
    const [fac, setFac] = React.useState<string>("");
    const [sort, setSort] = React.useState<"members_desc" | "events_desc" | "name_asc" | "name_desc">("members_desc");

    // sayfalama
    const [page, setPage] = React.useState(1);
    const perPage = 10;

    // select’ler (dinamik)
    const categories = React.useMemo(
        () => Array.from(new Set(all.map((c) => c.category))) as CatKey[],
        [all]
    );
    const faculties = React.useMemo(
        () => Array.from(new Set(all.map((c) => c.faculty))),
        [all]
    );

    // filtre + sıralama
    const filtered = React.useMemo(() => {
        let data = [...all];

        if (q.trim()) {
            const s = q.toLowerCase();
            data = data.filter((c) => c.name.toLowerCase().includes(s));
        }
        if (cat) data = data.filter((c) => c.category === cat);
        if (fac) data = data.filter((c) => c.faculty === fac);

        switch (sort) {
            case "members_desc":
                data.sort((a, b) => b.members - a.members);
                break;
            case "events_desc":
                data.sort((a, b) => b.events - a.events);
                break;
            case "name_asc":
                data.sort((a, b) => a.name.localeCompare(b.name, "tr"));
                break;
            case "name_desc":
                data.sort((a, b) => b.name.localeCompare(a.name, "tr"));
                break;
            default:
                break;
        }

        return data;
    }, [all, q, cat, fac, sort]);

    // sayfalı dilim
    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / perPage));
    const pageSafe = Math.min(Math.max(1, page), totalPages);
    const start = (pageSafe - 1) * perPage;
    const slice = filtered.slice(start, start + perPage);

    React.useEffect(() => {
        // filtre/sort değişince sayfayı 1’e çek
        setPage(1);
    }, [q, cat, fac, sort]);

    const reset = () => {
        setQ("");
        setCat("");
        setFac("");
        setSort("members_desc");
        setPage(1);
    };


    const membersSum = filtered.reduce((s, c) => s + c.members, 0);
    const eventsSum = filtered.reduce((s, c) => s + c.events, 0);

    return (
        <div className="mx-auto max-w-7xl p-6 space-y-4">
            {/* HERO / FILTER BAR */}
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 md:p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                            Kulüpler &amp; Destek
                        </h1>
                        <p className="text-slate-500 text-sm -mt-0.5">Filtrele, sırala ve keşfet</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <a
                            href="#forms"
                            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-white hover:bg-emerald-700 transition shadow"
                            title="Aşağıdaki formlara git"
                        >
                            <Book className="h-4 w-4" /> Formlar
                        </a>
                    </div>
                </div>

                {/* Controls */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr,1fr,1fr,1fr,auto] gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Ara: kulüp adı…"
                            className="h-11 w-full rounded-xl border border-slate-200 pl-9 pr-3 outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>

                    <select
                        value={cat}
                        onChange={(e) => setCat(e.target.value)}
                        className="h-11 w-full rounded-xl border border-slate-200 px-3 outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                        <option value="">Kategori (Tümü)</option>
                        {categories.map((c) => (
                            <option key={c} value={c}>
                                {catLabel[c]}
                            </option>
                        ))}
                    </select>

                    <select
                        value={fac}
                        onChange={(e) => setFac(e.target.value)}
                        className="h-11 w-full rounded-xl border border-slate-200 px-3 outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                        <option value="">Fakülte (Tümü)</option>
                        {faculties.map((f) => (
                            <option key={f} value={f}>
                                {f}
                            </option>
                        ))}
                    </select>

                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value as any)}
                        className="h-11 w-full rounded-xl border border-slate-200 px-3 outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                        <option value="members_desc">Üye (çoktan aza)</option>
                        <option value="events_desc">Etkinlik (çoktan aza)</option>
                        <option value="name_asc">Ad (A→Z)</option>
                        <option value="name_desc">Ad (Z→A)</option>
                    </select>

                    <button
                        onClick={reset}
                        className="h-11 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 hover:bg-slate-50"
                        title="Filtreleri temizle"
                    >
                        <RotateCcw className="h-4 w-4" /> Sıfırla
                    </button>
                </div>

                {/* Metrics */}
                <div className="mt-4 flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 px-3 py-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
                        <span className="font-extrabold">{filtered.length}</span>
                        <span className="text-slate-500 text-sm">kulüp</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 px-3 py-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                        <span className="font-extrabold">{membersSum.toLocaleString("tr-TR")}</span>
                        <span className="text-slate-500 text-sm">üye</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 px-3 py-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-orange-500/80" />
                        <span className="font-extrabold">{eventsSum.toLocaleString("tr-TR")}</span>
                        <span className="text-slate-500 text-sm">etkinlik</span>
                    </div>
                </div>
            </section>

            {/* Top pagination */}
            <div className="flex items-center justify-between px-1">
                <div className="text-xs font-semibold text-slate-500">
                    Gösterilen {total ? `${start + 1}–${Math.min(start + slice.length, total)}` : "0–0"} / {total} | Sayfa{" "}
                    {total ? pageSafe : 0}/{total ? totalPages : 0}
                </div>
                <div className="flex gap-2">
                    <button
                        className="h-9 w-9 rounded-xl border border-slate-200 grid place-items-center disabled:opacity-50"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={pageSafe <= 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                        className="h-9 w-9 rounded-xl border border-slate-200 grid place-items-center disabled:opacity-50"
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={pageSafe >= totalPages}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* GRID */}
            <section
                className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                aria-live="polite"
            >
                {slice.length === 0 ? (
                    <div className="col-span-full rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
                        Sonuç bulunamadı. Filtreleri değiştirin veya aramayı temizleyin.
                    </div>
                ) : (
                    slice.map((c) => (
                        <article
                            key={c.id}
                            className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                            tabIndex={0}
                        >
                            {/* Top row */}
                            <div className="flex items-center gap-3">
                                <div
                                    className={`h-14 w-14 grid place-items-center rounded-xl border border-black/5 text-slate-800 font-extrabold tracking-wide
                  ${{
                                            teknoloji: "bg-emerald-100/40",
                                            "kultur-sanat": "bg-violet-100/40",
                                            sosyal: "bg-orange-100/40",
                                            spor: "bg-rose-100/40",
                                            akademik: "bg-sky-100/40",
                                        }[c.category]}`}
                                    title={catLabel[c.category]}
                                >
                                    {initials(c.name)}
                                </div>

                                <div className="min-w-0">
                                    <h3 className="truncate text-[17px] font-extrabold text-slate-900">
                                        {c.name}
                                    </h3>
                                    <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-slate-600">
                                        <span
                                            className={`rounded-full px-2 py-0.5 ring-1 ${catBadge[c.category]}`}
                                        >
                                            {catLabel[c.category]}
                                        </span>
                                        <span className="text-slate-400">•</span>
                                        <span className="truncate">{c.faculty}</span>
                                    </div>
                                </div>
                            </div>

                            {/* stats */}
                            <div className="mt-3 grid grid-cols-2 gap-2">
                                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 px-3 py-2">
                                    <Users2 className="h-4 w-4 text-emerald-700" />
                                    <div>
                                        <div className="text-sm font-extrabold leading-4">
                                            {c.members.toLocaleString("tr-TR")}
                                        </div>
                                        <div className="text-[11px] text-slate-500 -mt-0.5">
                                            Üye
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 px-3 py-2">
                                    <Calendar className="h-4 w-4 text-emerald-700" />
                                    <div>
                                        <div className="text-sm font-extrabold leading-4">
                                            {c.events.toLocaleString("tr-TR")}
                                        </div>
                                        <div className="text-[11px] text-slate-500 -mt-0.5">
                                            Etkinlik
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* links */}
                            <div className="mt-2 flex gap-2">
                                {c.instagram && (
                                    <a
                                        href={c.instagram}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-[12px] font-semibold text-emerald-700 ring-1 ring-slate-200 rounded-lg px-2.5 py-1 hover:bg-emerald-50"
                                    >
                                        Instagram
                                    </a>
                                )}
                                <Link
                                    to={`/kulup/${c.id}`}
                                    className="text-[12px] font-semibold text-emerald-700 ring-1 ring-slate-200 rounded-lg px-2.5 py-1 hover:bg-emerald-50"
                                    title="Kulüp detay"
                                >
                                    Detay
                                </Link>
                            </div>
                        </article>
                    ))
                )}
            </section>

            {/* Bottom pagination */}
            <div className="flex items-center justify-end gap-2">
                <button
                    className="h-9 w-9 rounded-xl border border-slate-200 grid place-items-center disabled:opacity-50"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={pageSafe <= 1}
                >
                    <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                    className="h-9 w-9 rounded-xl border border-slate-200 grid place-items-center disabled:opacity-50"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={pageSafe >= totalPages}
                >
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>

            {/* Hızlı Formlar */}
            <section id="forms" className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 md:p-5">
                <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-lg md:text-xl font-extrabold tracking-tight text-slate-900">
                        Hızlı Formlar
                    </h2>
                    <Link
                        to="/formlar"
                        className="text-sm font-semibold text-emerald-700 hover:underline inline-flex items-center gap-1"
                        title="Tüm formları görüntüle"
                    >
                        Tümünü Gör
                        <ChevronRight className="h-4 w-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {forms.map((f) => (
                        <a
                            key={f.id}
                            href={f.href}
                            download
                            className="group flex items-center justify-between rounded-xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 px-3 py-3 hover:shadow transition"
                            title="İndir"
                        >
                            <div className="flex items-center gap-2 min-w-0">
                                <FileText className="h-4 w-4 text-emerald-700 flex-shrink-0" />
                                <span className="truncate font-semibold text-slate-800">{f.title}</span>
                            </div>
                            <FileDown className="h-4 w-4 text-slate-400 group-hover:text-emerald-700" />
                        </a>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Kulupler;