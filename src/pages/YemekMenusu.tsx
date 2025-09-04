import React from "react";
import { CalendarDays, UtensilsCrossed, Soup, Beef, Salad, IceCream2 } from "lucide-react";
import menuDays, { type MenuDay, type Dish } from "../data/menu";

// Bu sayfa, data/menu.ts yapısına göre çalışır (soup, mains[], sides[], salad, dessert)
// Görsel ikon anahtarlarını yerel olarak eşliyoruz

type IconKey = "soup" | "beef" | "salad" | "dessert" | "utensils";

const ICONS: Record<IconKey, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
    soup: Soup,
    beef: Beef,
    salad: Salad,
    dessert: IceCream2,
    utensils: UtensilsCrossed,
};

// MenuDay -> UI için listelenebilir öğelere dönüştür
function toItems(m: MenuDay): { label: string; value: string; icon?: IconKey }[] {
    const items: { label: string; value: string; icon?: IconKey }[] = [];

    if (m.soup) items.push({ label: "Çorba", value: m.soup.name, icon: "soup" });

    if (m.mains && m.mains.length) {
        for (const d of m.mains) items.push({ label: "Ana Yemek", value: d.name, icon: "beef" });
    }

    if (m.sides && m.sides.length) {
        for (const d of m.sides) items.push({ label: "Yan / Garnitür", value: d.name, icon: "salad" });
    }

    if (m.salad) items.push({ label: "Salata / İçecek", value: m.salad.name, icon: "salad" });
    if (m.dessert) items.push({ label: "Tatlı", value: m.dessert.name, icon: "dessert" });

    return items;
}

function sumKcal(m: MenuDay): number | undefined {
    // varsa toplamı kullan; yoksa öğelerden tahmini topla
    if (typeof m.totalKcal === "number") return m.totalKcal;
    let total = 0;
    const add = (d?: Dish | Dish[]) => {
        if (!d) return;
        if (Array.isArray(d)) {
            for (const x of d) total += x.kcal ?? 0;
        } else {
            total += d.kcal ?? 0;
        }
    };
    add(m.soup); add(m.mains); add(m.sides); add(m.salad); add(m.dessert);
    return total || undefined;
}

/* ========= Kart bileşeni ========= */
const MealCard: React.FC<{ menu: MenuDay }> = ({ menu }) => {
    const dt = new Date(menu.date);
    const dateText = dt.toLocaleDateString("tr-TR", { day: "2-digit", month: "long" });
    const items = toItems(menu);
    const kcal = sumKcal(menu);

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
                        {menu.day}
                    </h3>
                </div>
                <div className="rounded-lg bg-emerald-600/10 text-emerald-700 text-xs px-2 py-1 font-semibold">
                    {typeof kcal === "number" ? `${kcal} kcal` : "Günlük Menü"}
                </div>
            </header>

            {/* Liste */}
            <ul className="mt-1 space-y-2">
                {items.map((it, idx) => {
                    const Icon = it.icon ? ICONS[it.icon] : UtensilsCrossed;
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
                {menuDays.map((m) => (
                    <MealCard key={m.id} menu={m} />
                ))}
            </section>
        </div>
    );
};

export default YemekMenusu;