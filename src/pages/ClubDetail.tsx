// src/pages/ClubDetail.tsx
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Mail, Users2, CalendarDays, ExternalLink, ArrowLeft } from "lucide-react";
import type { ClubDetail as ClubDetailType } from "../types/club"; import { catLabel, catGrad, catPill } from "../lib/clubStyles";

// DEMO: gerçek uygulamada bunu API'den/Store'dan al
import { clubs } from "../data/clubs"; // bu listede ClubDetailType alanları bulunsun

const InfoRow: React.FC<{ label: string; value?: React.ReactNode }> = ({ label, value }) => (
    <div className="flex items-center justify-between gap-4 border-b last:border-none border-slate-200/70 py-3">
        <span className="text-sm text-slate-500">{label}</span>
        <span className="text-sm font-semibold text-slate-900 text-right min-w-0 truncate">{value || "-"}</span>
    </div>
);

const ClubDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const nav = useNavigate();

    const club = React.useMemo<ClubDetailType | undefined>(
        () => clubs.find((c) => c.id === id),
        [id]
    );

    if (!club) {
        return (
            <div className="max-w-4xl mx-auto px-6 py-16">
                <button onClick={() => nav(-1)} className="inline-flex items-center gap-2 text-emerald-700 font-semibold mb-4">
                    <ArrowLeft className="h-4 w-4" /> Geri
                </button>
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Kulüp bulunamadı</h1>
                <p className="text-slate-600 mt-2">Bağlantı yanlış veya içerik kaldırılmış olabilir.</p>
            </div>
        );
    }

    return (
        <article className="mx-auto max-w-5xl p-4 md:p-6">
            {/* HEADER / GRADIENT */}
            <div className={`rounded-3xl overflow-hidden shadow ring-1 ring-black/5`}>
                <div className={`bg-gradient-to-r ${catGrad[club.category]} px-6 md:px-8 pt-8 pb-10 text-white`}>
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold bg-white/20 backdrop-blur`}>
                                {catLabel[club.category]}
                            </span>
                            <h1 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
                                {club.name}
                            </h1>
                            <p className="mt-2 text-white/90">{club.faculty}</p>
                        </div>

                        <div className="flex gap-2 mt-1">
                            {club.instagram && (
                                <a
                                    href={club.instagram}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 h-10 rounded-xl bg-white/15 hover:bg-white/25 px-3 text-sm font-semibold"
                                >
                                    Instagram <ExternalLink className="h-4 w-4" />
                                </a>
                            )}
                            <button
                                onClick={() => nav(-1)}
                                className="inline-flex items-center gap-2 h-10 rounded-xl bg-white/15 hover:bg-white/25 px-3 text-sm font-semibold"
                            >
                                Kapat
                            </button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="mt-6 flex flex-wrap gap-3">
                        <div className="flex items-center gap-2 bg-white/15 rounded-xl px-3 py-2">
                            <Users2 className="h-4 w-4" />
                            <div className="text-sm"><span className="font-extrabold">{club.members.toLocaleString("tr-TR")}</span> Üye</div>
                        </div>
                        <div className="flex items-center gap-2 bg-white/15 rounded-xl px-3 py-2">
                            <CalendarDays className="h-4 w-4" />
                            <div className="text-sm"><span className="font-extrabold">{club.events.toLocaleString("tr-TR")}</span> Etkinlik</div>
                        </div>
                    </div>
                </div>

                {/* BODY */}
                <div className="grid md:grid-cols-[1.3fr,0.9fr] gap-6 p-6 md:p-8 bg-white">
                    {/* About */}
                    <section>
                        <h2 className="text-lg font-extrabold tracking-tight text-slate-900">Hakkında</h2>
                        <div className="mt-2 text-slate-700 leading-7">
                            {club.about ? (
                                <p>{club.about}</p>
                            ) : (
                                <p>
                                    {club.name}, {catLabel[club.category].toLowerCase()} kategorisinde aktif bir kulüptür. {club.faculty} çatısı altında
                                    etkinlikler, atölyeler ve proje çalışmaları yürütür.
                                </p>
                            )}
                        </div>

                        {/* emails */}
                        <div className="mt-6 grid sm:grid-cols-2 gap-3">
                            {club.emailClub && (
                                <a
                                    href={`mailto:${club.emailClub}`}
                                    className="flex items-center justify-between rounded-xl border px-4 py-3 hover:bg-slate-50"
                                >
                                    <div className="flex items-center gap-3">
                                        <Mail className="h-4 w-4 text-emerald-700" />
                                        <div>
                                            <div className="text-xs text-slate-500">Kulüp e-posta</div>
                                            <div className="font-semibold text-slate-900">{club.emailClub}</div>
                                        </div>
                                    </div>
                                </a>
                            )}
                            {club.emailPresident && (
                                <a
                                    href={`mailto:${club.emailPresident}`}
                                    className="flex items-center justify-between rounded-xl border px-4 py-3 hover:bg-slate-50"
                                >
                                    <div className="flex items-center gap-3">
                                        <Mail className="h-4 w-4 text-emerald-700" />
                                        <div>
                                            <div className="text-xs text-slate-500">Başkan e-posta</div>
                                            <div className="font-semibold text-slate-900">{club.emailPresident}</div>
                                        </div>
                                    </div>
                                </a>
                            )}
                        </div>
                    </section>

                    {/* SIDE INFO */}
                    <aside className="rounded-2xl border bg-white">
                        <div className="px-4 py-3 border-b">
                            <h3 className="font-extrabold tracking-tight text-slate-900">Bilgiler</h3>
                        </div>
                        <div className="px-4">
                            <InfoRow label="Kategori" value={
                                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${catPill[club.category]}`}>
                                    {catLabel[club.category]}
                                </span>
                            } />
                            <InfoRow label="Fakülte" value={club.faculty} />
                            <InfoRow label="Başkan" value={club.president} />
                            <InfoRow label="Başkan Yrd." value={club.vicePresident} />
                            <InfoRow label="Danışman" value={club.advisor} />
                        </div>

                        {/* CTA buttons */}
                        <div className="p-4 border-t flex flex-wrap gap-2">
                            {club.instagram && (
                                <a
                                    href={club.instagram}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center justify-center rounded-xl bg-emerald-600 text-white px-3 py-2 text-sm font-semibold hover:bg-emerald-700"
                                >
                                    Instagram’da Gör
                                </a>
                            )}
                            {club.emailClub && (
                                <a
                                    href={`mailto:${club.emailClub}`}
                                    className="inline-flex items-center justify-center rounded-xl border px-3 py-2 text-sm font-semibold hover:bg-slate-50"
                                >
                                    Kulübe Mail At
                                </a>
                            )}
                            {club.emailPresident && (
                                <a
                                    href={`mailto:${club.emailPresident}`}
                                    className="inline-flex items-center justify-center rounded-xl border px-3 py-2 text-sm font-semibold hover:bg-slate-50"
                                >
                                    Başkana Mail At
                                </a>
                            )}
                        </div>
                    </aside>
                </div>
            </div>
        </article>
    );
};

export default ClubDetail;