import React from "react";
import { useLocation, Link } from "react-router-dom";
import { searchIndex } from "../data/searchIndex";
import { allRecords } from "../data/indexAll";
import BlogCard from "../BlogCard";
import EventCard from "../EventCard";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Search: React.FC = () => {
    const q = useQuery().get("q") || "";
    const results = q ? searchIndex(allRecords, q) : [];

    // Gruplama: türüne göre bölümlendir
    const groups = results.reduce<Record<string, typeof results>>((acc, r) => {
        (acc[r.kind] ||= []).push(r);
        return acc;
    }, {});

    return (
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
            <h1 className="text-2xl md:text-3xl font-bold">
                “{q}” için arama sonuçları
            </h1>

            {!q && <p className="text-slate-500">Aramak için bir kelime yazın.</p>}
            {q && results.length === 0 && <p className="text-slate-500">Sonuç bulunamadı.</p>}

            {/* Etkinlikler */}
            {groups["etkinlik"] && (
                <section>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-xl font-semibold">Etkinlikler</h2>
                        <Link to="/etkinlik-takvim" className="text-emerald-600 hover:underline">Tümü</Link>
                    </div>
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {groups["etkinlik"].map((r) => (
                            <EventCard
                                key={r.id}
                                image={r.image || ""}
                                title={r.title}
                                date={r.dateText || ""}
                                time={r.time || ""}
                                location={r.location || ""}
                                description={r.description || ""}
                                type="Yüz Yüze Etkinlik"
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* Blog / Duyuru */}
            {(groups["blog"] || groups["duyuru"]) && (
                <section className="space-y-6">
                    {groups["blog"] && (
                        <>
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold">Blog Yazıları</h2>
                                <Link to="/duyurular" className="text-emerald-600 hover:underline">Tümü</Link>
                            </div>
                            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {groups["blog"].map((r) => (
                                    <BlogCard
                                        key={r.id}
                                        image={r.image || ""}
                                        title={r.title}
                                        category={r.category || "Genel"}
                                        author={r.author || "SKS"}
                                        date={r.dateText || ""}
                                        description={r.description || ""}
                                    />
                                ))}
                            </div>
                        </>
                    )}

                    {groups["duyuru"] && (
                        <>
                            <h2 className="text-xl font-semibold">Duyurular & Haberler</h2>
                            <ul className="divide-y rounded-xl border bg-white">
                                {groups["duyuru"].map((r) => (
                                    <li key={r.id} className="p-4">
                                        <Link to={r.href || "/duyurular"} className="font-medium hover:underline">
                                            {r.title}
                                        </Link>
                                        {r.dateText && <div className="text-sm text-slate-500">{r.dateText}</div>}
                                        {r.description && <p className="text-slate-700 mt-1">{r.description}</p>}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </section>
            )}

            {/* Yemek Menüsü */}
            {groups["yemek"] && (
                <section>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-xl font-semibold">Yemek Menüsü</h2>
                        <Link to="/yemek-menusu" className="text-emerald-600 hover:underline">Tümü</Link>
                    </div>
                    <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {groups["yemek"].map((r) => (
                            <li key={r.id} className="p-4 rounded-xl border bg-white">
                                <div className="font-semibold">{r.title}</div>
                                {r.description && <div className="text-sm text-slate-600 mt-1">{r.description}</div>}
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Ring Saatleri */}
            {groups["ring"] && (
                <section>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-xl font-semibold">Ring Saatleri</h2>
                        <Link to="/ring-saatleri" className="text-emerald-600 hover:underline">Tümü</Link>
                    </div>
                    <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {groups["ring"].map((r) => (
                            <li key={r.id} className="p-4 rounded-xl border bg-white">
                                <div className="font-semibold">{r.title}</div>
                                {r.description && <div className="text-sm text-slate-600 mt-1">{r.description}</div>}
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
};

export default Search;