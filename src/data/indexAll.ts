import type { SearchRecord, SearchKind } from "./searchIndex";
import blogs from "./blogs";
import { events } from "./events";
import announcements from "./announcements";
import menu from "./menu";
import rings from "./rings";

type Announcement = {
    id: string | number;
    title: string;
    description?: string;
    image?: string;
    date?: string;
    href?: string;
};

const slugify = (s: string) =>
    s
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // aksanları temizle (diacritics)
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

export const allRecords: SearchRecord[] = [
    // Bloglar
    ...blogs.map((b: { id: string | number; title: string; description?: string; image?: string; author?: string; category?: string; date?: string }, i) => ({
        id: (typeof b.id === "number" ? (b.id as number).toString() : b.id) ?? `blog-${i}-${slugify(b.title)}`,
        kind: "blog" as SearchKind,
        title: b.title,
        description: b.description,
        image: b.image,
        author: b.author,
        category: b.category,
        dateText: b.date,
        href: "/blog",
    })),

    // Etkinlikler
    ...events.map((e: { id: string | number; title: string; description?: string; image?: string; location?: string; time?: string; date?: string }) => ({
        id: typeof e.id === "number" ? e.id.toString() : e.id,
        kind: "etkinlik" as SearchKind,
        title: e.title,
        description: e.description,
        image: e.image,
        location: e.location,
        time: e.time,
        dateText: e.date,
        href: "/etkinlik-takvim",
    })),

    // Duyurular/Haberler
    ...announcements.map((d: any, i: number) => ({
        id: (typeof d.id === "number" ? d.id.toString() : d.id) ?? `duyuru-${i}-${slugify(d.title)}`,
        kind: "duyuru" as SearchKind,
        title: d.title,
        description: d.description,
        image: d.image,
        dateText: d.date,
        href: `/duyurular/${(typeof d.id === "number" ? d.id.toString() : d.id) ?? `duyuru-${i}-${slugify(d.title)}`}`,
    })),

    // Yemek menüsü (her gün için tek kayıt; detay sayfana göre uyarlarsın)
    ...menu.map((m: { id: string | number; day: string; mains?: any[]; sides?: any[]; soup?: any; salad?: any }) => ({
        id: typeof m.id === "number" ? m.id.toString() : m.id,
        kind: "yemek" as SearchKind,
        title: `${m.day} Yemek Menüsü`,
        description:
            [
                ...(m.mains || []).map((x: any) => x.name),
                ...(m.sides || []).map((x: any) => x.name),
                m.soup?.name,
                m.salad?.name,
            ]
                .filter(Boolean)
                .join(" • "),
        href: "/yemek-menusu",
    })),

    // Ring saatleri
    ...rings.map((r: { id: string | number; title: string; description?: string; times: string[] }) => ({
        id: typeof r.id === "number" ? r.id.toString() : r.id,
        kind: "ring" as SearchKind,
        title: `Ring • ${r.title}`,
        description: `${r.description ?? ""} ${r.times.join(" / ")}`.trim(),
        href: "/ring-saatleri",
    })),
];