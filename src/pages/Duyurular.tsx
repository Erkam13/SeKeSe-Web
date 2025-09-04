// src/pages/Duyurular.tsx
import React from "react";
import HaberCard from "../HaberCard";
import announcements from "../data/announcements";

const Duyurular: React.FC = () => {
    const ilkBes = announcements.slice(0, 5);   // <<< ilk 5 haberi al

    return (
        <section className="bg-gray-50/60 min-h-screen py-10">
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex items-end justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
                            Duyurular & Haberler
                        </h2>
                        <p className="text-slate-600 mt-1">En güncel duyurular</p>
                    </div>
                    {/* <Link to="/duyurular/tum" className="text-emerald-700 font-semibold">Tümünü Gör</Link> */}
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">
                    {ilkBes.map((h, i) => (
                        <HaberCard key={i} {...h} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Duyurular;