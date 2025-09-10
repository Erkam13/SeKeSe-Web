// src/lib/clubStyles.ts
import type { CatKey } from "../types/club";

export const catLabel: Record<CatKey, string> = {
    teknoloji: "Teknoloji",
    "kultur-sanat": "Kültür-Sanat",
    sosyal: "Sosyal Sorumluluk",
    spor: "Spor",
    akademik: "Akademik",
};

export const catGrad: Record<CatKey, string> = {
    teknoloji: "from-emerald-600 to-teal-600",
    "kultur-sanat": "from-violet-600 to-fuchsia-600",
    sosyal: "from-orange-600 to-amber-600",
    spor: "from-rose-600 to-red-600",
    akademik: "from-sky-600 to-cyan-600",
};

export const catPill: Record<CatKey, string> = {
    teknoloji: "bg-emerald-100 text-emerald-800",
    "kultur-sanat": "bg-violet-100 text-violet-800",
    sosyal: "bg-orange-100 text-orange-800",
    spor: "bg-rose-100 text-rose-800",
    akademik: "bg-sky-100 text-sky-800",
};