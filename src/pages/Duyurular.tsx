// src/pages/Duyurular.tsx
import React from "react";
import { Link } from "react-router-dom";
import HaberCard from "../HaberCard";
import announcements from "../data/announcements";

const Duyurular: React.FC = () => {
    const ilkBes = announcements.slice(0, 5);

    return (
        <section className="bg-gray-50/60 min-h-screen py-10">
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex items-end justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
                            Duyurular &amp; Haberler
                        </h2>
                        <p className="text-slate-600 mt-1">En güncel duyurular</p>
                    </div>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">
                    {ilkBes.map((h) => (
                        <Link
                            key={h.id}
                            to={`/duyurular/${h.slug}`}
                            className="block focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-2xl"
                            aria-label={`${h.title} duyuru detayı`}
                        >
                            <HaberCard {...h} />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Duyurular;