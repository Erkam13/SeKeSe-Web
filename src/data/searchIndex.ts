// Ortak arama kaydı tipi
export type SearchKind = "blog" | "etkinlik" | "yemek" | "ring" | "duyuru";

export type SearchRecord = {
    id: string;
    kind: SearchKind;
    title: string;
    description?: string;
    dateText?: string;  // "13.10.2025 / Pazartesi" gibi
    tags?: string[];
    // kartları çizerken ihtiyacın olabilecek alanlar:
    image?: string;
    author?: string;
    category?: string;
    location?: string;
    time?: string;
    href?: string;      // detay sayfası varsa
};

// Basit normalize (TR küçük-büyük uyumu/aksan)
const normalize = (s: string) =>
    s
        .toLocaleLowerCase("tr-TR")
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "");

// Basit includes tabanlı arama
export function searchIndex(records: SearchRecord[], query: string) {
    const q = normalize(query.trim());
    if (!q) return [];
    return records.filter((r) => {
        const hay =
            [
                r.title,
                r.description || "",
                r.author || "",
                r.category || "",
                r.location || "",
                (r.tags || []).join(" "),
                r.dateText || "",
            ]
                .map((x) => normalize(x))
                .join(" ");
        return hay.includes(q);
    });
}