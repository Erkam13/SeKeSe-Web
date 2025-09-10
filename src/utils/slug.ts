export const slugify = (s: string) =>
    s
        .toLowerCase()
        .normalize("NFD").replace(/\p{Diacritic}/gu, "") // aksanları sil
        .replace(/[^a-z0-9]+/g, "-")                     // boşluk & özel karakterler →
        .replace(/(^-|-$)+/g, "");                       // uçlardaki - temizle