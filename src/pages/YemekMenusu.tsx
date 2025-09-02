import React from "react";
import { CalendarDays, UtensilsCrossed, Soup, Beef, Salad, IceCream2 } from "lucide-react";

/* ========= Tipler ========= */
type MealItem = {
    label: string;         // "Çorba", "Ana Yemek"...
    value: string;         // "Mercimek Çorbası"...
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

type DayMenu = {
    date: string;          // "2025-09-01"
    dayName: "Pazartesi" | "Salı" | "Çarşamba" | "Perşembe" | "Cuma";
    kcal?: number;         // opsiyonel: toplam kalori
    items: MealItem[];
};

/* ========= Demo veri (haftalık) ========= */
const weekMenus: DayMenu[] = [
    {
        date: "2025-09-01",
        dayName: "Pazartesi",
        kcal: 1850,
        items: [
            { label: "Çorba", value: "Mercimek Çorbası", icon: Soup },
            { label: "Ana Yemek", value: "Izgara Tavuk + Bulgur Pilavı", icon: Beef },
            { label: "Yan / Garnitür", value: "Zeytinyağlı Taze Fasulye", icon: Salad },
            { label: "Tatlı / İçecek", value: "Ayran", icon: IceCream2 },
        ],
    },
    {
        date: "2025-09-02",
        dayName: "Salı",
        kcal: 1780,
        items: [
            { label: "Çorba", value: "Tarhana Çorbası", icon: Soup },
            { label: "Ana Yemek", value: "Tas Kebabı + Pirinç Pilavı", icon: Beef },
            { label: "Yan / Garnitür", value: "Mevsim Salata", icon: Salad },
            { label: "Tatlı / İçecek", value: "Şekerpare", icon: IceCream2 },
        ],
    },
    {
        date: "2025-09-03",
        dayName: "Çarşamba",
        kcal: 1690,
        items: [
            { label: "Çorba", value: "Domates Çorbası", icon: Soup },
            { label: "Ana Yemek", value: "Fırında Köfte + Patates", icon: Beef },
            { label: "Yan / Garnitür", value: "Cacık", icon: Salad },
            { label: "Tatlı / İçecek", value: "Meyve", icon: IceCream2 },
        ],
    },
    {
        date: "2025-09-04",
        dayName: "Perşembe",
        kcal: 1760,
        items: [
            { label: "Çorba", value: "Ezogelin Çorbası", icon: Soup },
            { label: "Ana Yemek", value: "Etli Nohut + Pilav", icon: Beef },
            { label: "Yan / Garnitür", value: "Ayran", icon: Salad },
            { label: "Tatlı / İçecek", value: "Sütlaç", icon: IceCream2 },
        ],
    },
    {
        date: "2025-09-05",
        dayName: "Cuma",
        kcal: 1720,
        items: [
            { label: "Çorba", value: "Sebze Çorbası", icon: Soup },
            { label: "Ana Yemek", value: "Tavuk Sote + Makarna", icon: Beef },
            { label: "Yan / Garnitür", value: "Mevsim Salata", icon: Salad },
            { label: "Tatlı / İçecek", value: "Kazandibi", icon: IceCream2 },
        ],
    },
];

/* ========= Kart bileşeni ========= */
const MealCard: React.FC<{ menu: DayMenu }> = ({ menu }) => {
    const dt = new Date(menu.date);
    const dateText = dt.toLocaleDateString("tr-TR", { day: "2-digit", month: "long" });

    return (
        <article className="rounded-2xl border border-slate-200 bg-white/90 shadow-sm backdrop-blur p-4 flex flex-col gap-3 hover:shadow-lg transition">
            {/* Başlık */}
            <header className="flex items-start justify-between gap-2">
                <div>
                    <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {dateText}
                    </div>
                    <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
                        {menu.dayName}
                    </h3>
                </div>
                <div className="rounded-lg bg-emerald-600/10 text-emerald-700 text-xs px-2 py-1 font-semibold">
                    {menu.kcal ? `${menu.kcal} kcal` : "Günlük Menü"}
                </div>
            </header>

            {/* Liste */}
            <ul className="mt-1 space-y-2">
                {menu.items.map((it, idx) => {
                    const Icon = it.icon ?? UtensilsCrossed;
                    return (
                        <li
                            key={idx}
                            className="flex gap-2 rounded-xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 px-3 py-2"
                        >
                            <Icon className="h-4 w-4 mt-0.5 text-emerald-700 shrink-0" />
                            <div className="min-w-0">
                                <div className="text-[11px] text-slate-500 font-semibold">{it.label}</div>
                                <div className="text-sm font-semibold text-slate-800 truncate">{it.value}</div>
                            </div>
                        </li>
                    );
                })}
            </ul>

            {/* Not alanı (opsiyonel) */}
            <p className="mt-auto pt-1 text-[11px] text-slate-500">
                * Menü içerikleri tedarik ve üretim durumuna göre değişebilir.
            </p>
        </article>
    );
};

/* ========= Sayfa ========= */
const YemekMenusu: React.FC = () => {
    // İstersen haftalar arası seçim ekleyebilirsin (hafta değiştirici state vs.)

    return (
        <div className="mx-auto max-w-7xl p-6 space-y-4">
            {/* Başlık */}
            <div className="flex items-center justify-between gap-2">
                <div>
                    <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                        Haftalık Yemek Menüsü
                    </h1>
                    <p className="text-slate-500 text-sm -mt-0.5">
                        Pazartesi – Cuma • Kampüs yemekhanesi
                    </p>
                </div>
            </div>

            {/* GRID: Mobil 1 sütun, md ve üstü 5 sütun */}
            <section className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {weekMenus.map((m) => (
                    <MealCard key={m.date} menu={m} />
                ))}
            </section>
        </div>
    );
};

export default YemekMenusu;