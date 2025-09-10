import React from "react";
import { FileText, FileDown, Search, Filter } from "lucide-react";
import { docs, type DocItem, type DocCategory } from "../data/docs";
import { Link } from "react-router-dom";

const TABS: { key: "" | DocCategory; label: string }[] = [
    { key: "", label: "Tümü" },
    { key: "form", label: "Formlar" },
    { key: "dilekce", label: "Dilekçeler" },
    { key: "kilavuz", label: "Kılavuzlar" },
];

const catBadge: Record<DocCategory, string> = {
    form: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    dilekce: "bg-amber-50 text-amber-700 ring-amber-200",
    kilavuz: "bg-sky-50 text-sky-700 ring-sky-200",
};

const catLabel: Record<DocCategory, string> = {
    form: "Form",
    dilekce: "Dilekçe",
    kilavuz: "Kılavuz",
};

const Kilavuzlar: React.FC = () => {
    const [q, setQ] = React.useState("");
    const [tab, setTab] = React.useState<"" | DocCategory>("");

    const filtered: DocItem[] = React.useMemo(() => {
        let data = [...docs];
        if (tab) data = data.filter((d) => d.category === tab);
        if (q.trim()) {
            const s = q.toLowerCase();
            data = data.filter(
                (d) =>
                    d.title.toLowerCase().includes(s) ||
                    (d.description ? d.description.toLowerCase().includes(s) : false)
            );
        }
        return data;
    }, [q, tab]);

    return (
        <div className="mx-auto max-w-7xl p-6 space-y-6">
            {/* Header */}
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 md:p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                            Kılavuz &amp; Dokümanlar
                        </h1>
                        <p className="text-slate-500 text-sm -mt-0.5">
                            Formlar, dilekçeler ve kılavuzlar — hepsi tek yerde
                        </p>
                    </div>

                    <Link
                        to="/formlar"
                        className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-white hover:bg-emerald-700 transition shadow"
                        title="Formlar sayfasına git"
                    >
                        <Filter className="h-4 w-4" />
                        Formlar
                    </Link>
                </div>

                {/* Tabs & Search */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                    <div className="flex w-full md:w-auto rounded-xl border border-slate-200 bg-slate-50 p-1">
                        {TABS.map((t) => (
                            <button
                                key={t.key || "all"}
                                onClick={() => setTab(t.key)}
                                className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition
                 ${tab === t.key
                                        ? "bg-white text-slate-900 shadow ring-1 ring-slate-200"
                                        : "text-slate-600 hover:text-slate-800"
                                    }`}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>

                    <div className="relative ml-auto w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Ara: başlık veya açıklama…"
                            className="h-11 w-full rounded-xl border border-slate-200 pl-9 pr-3 outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                        />
                    </div>
                </div>
            </section>

            {/* Grid */}
            <section
                className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                aria-live="polite"
            >
                {filtered.length === 0 ? (
                    <div className="col-span-full rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
                        Sonuç bulunamadı. Filtreleri değiştirin veya aramayı temizleyin.
                    </div>
                ) : (
                    filtered.map((d) => (
                        <a
                            key={d.id}
                            href={d.href}
                            download
                            className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                        >
                            <div className="flex items-center gap-3">
                                <div className="h-11 w-11 grid place-items-center rounded-lg bg-slate-50 border border-slate-200 text-slate-700">
                                    <FileText className="h-5 w-5" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="truncate text-[16px] font-extrabold text-slate-900">
                                        {d.title}
                                    </h3>
                                    <div className="mt-0.5 flex flex-wrap items-center gap-2 text-[12px]">
                                        <span
                                            className={`rounded-full px-2 py-0.5 ring-1 ${catBadge[d.category]}`}
                                        >
                                            {catLabel[d.category]}
                                        </span>
                                        {d.size ? (
                                            <>
                                                <span className="text-slate-400">•</span>
                                                <span className="text-slate-500">{d.size}</span>
                                            </>
                                        ) : null}
                                        {d.updatedAt ? (
                                            <>
                                                <span className="text-slate-400">•</span>
                                                <span className="text-slate-500">
                                                    Güncelleme: {new Date(d.updatedAt).toLocaleDateString("tr-TR")}
                                                </span>
                                            </>
                                        ) : null}
                                    </div>
                                </div>
                            </div>

                            {d.description ? (
                                <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                                    {d.description}
                                </p>
                            ) : null}

                            <div className="mt-3 flex items-center justify-between">
                                <span className="text-xs font-semibold text-emerald-700">
                                    İndir
                                </span>
                                <FileDown className="h-4 w-4 text-slate-400 group-hover:text-emerald-700" />
                            </div>
                        </a>
                    ))
                )}
            </section>
        </div>
    );
};

export default Kilavuzlar;