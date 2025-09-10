// src/data/docs.ts
export type DocCategory = "form" | "dilekce" | "kilavuz";

export type DocItem = {
    id: string;
    title: string;
    category: DocCategory;
    description?: string;
    href: string;       // public altındaki dosya yolu
    updatedAt?: string; // "2025-08-26" gibi
    size?: string;      // "PDF • 340 KB"
};

export const docs: DocItem[] = [
    // --- Formlar ---
    {
        id: "form-01",
        title: "Etkinlik Talep Formu",
        category: "form",
        href: "/docs/formlar/etkinlik-talep-formu.pdf",
        size: "PDF • 220 KB",
        updatedAt: "2025-08-26",
    },
    {
        id: "form-02",
        title: "Salon / Mekân Tahsis Formu",
        category: "form",
        href: "/docs/formlar/mekan-tahsis-formu.pdf",
        size: "PDF • 180 KB",
    },
    {
        id: "form-03",
        title: "Teknik Ekipman Talep Formu",
        category: "form",
        href: "/docs/formlar/teknik-ekipman-talep.pdf",
    },

    // --- Dilekçeler ---
    {
        id: "dil-01",
        title: "Kulüp Kurulum Dilekçesi",
        category: "dilekce",
        href: "/docs/dilekceler/kulup-kurulum-dilekcesi.docx",
        size: "DOCX • 35 KB",
    },
    {
        id: "dil-02",
        title: "Danışman Onayı Dilekçesi",
        category: "dilekce",
        href: "/docs/dilekceler/danisman-onayi-dilekcesi.docx",
    },

    // --- Kılavuzlar ---
    {
        id: "kil-01",
        title: "Öğrenci Kulüpleri İşleyiş Kılavuzu",
        category: "kilavuz",
        href: "/docs/kilavuzlar/kulupler-isleyis-kilavuzu.pdf",
        size: "PDF • 1.2 MB",
    },
    {
        id: "kil-02",
        title: "Etkinlik Yönetimi Mini Rehber",
        category: "kilavuz",
        href: "/docs/kilavuzlar/etkinlik-yonetimi-rehber.pdf",
    },
];