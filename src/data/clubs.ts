// src/data/clubs.ts

/* ===================== Types ===================== */
export type CatKey = "teknoloji" | "kultur-sanat" | "sosyal" | "spor" | "akademik";

export type ClubBase = {
    id: string;               // "ai-tech", "ieee" gibi stabil id
    name: string;
    members: number;
    events: number;
    category: CatKey;
    faculty: string;
    instagram?: string;
};

export type ClubDetail = ClubBase & {
    about?: string;           // Hakkında kısa metin
    emails?: {
        club?: string;          // kulüp e-posta
        president?: string;     // başkan e-posta
    };
    contacts?: {
        president?: string;     // Başkan adı
        vicePresident?: string; // Başkan yardımcısı
        advisor?: string;       // Danışman
    };
};

/* ===================== Sample Data ===================== */

export const clubs: ClubDetail[] = [
    {
        id: "ai-tech",
        name: "Yapay Zeka ve Teknoloji Kulübü",
        members: 380,
        events: 42,
        category: "teknoloji",
        faculty: "Mühendislik ve Doğa Bilimleri",
        instagram: "https://instagram.com/ai_club",
        about:
            "Teknoloji kategorisinde aktif bir kulüptür. Mühendislik ve Doğa Bilimleri çatısı altında faaliyet göstermektedir. Yıl boyunca düzenli etkinlikler, atölyeler ve proje çalışmaları yürütür.",
        emails: { club: "ai.club@uskudar.edu.tr", president: "elif.yilmaz@st.uskudar.edu.tr" },
        contacts: { president: "Elif Yılmaz", vicePresident: "Mert Kaya", advisor: "Dr. Öğr. Üyesi A. Demir" },
    },
    {
        id: "ieee",
        name: "IEEE Öğrenci Kolu",
        members: 520,
        events: 58,
        category: "teknoloji",
        faculty: "Mühendislik ve Doğa Bilimleri",
        instagram: "https://instagram.com/ieee_uu",
        about:
            "Elektrik-Elektronik, yazılım ve benzeri alanlarda teknik etkinlikler, yarışmalar ve seminerler düzenler.",
        emails: { club: "ieee@uskudar.edu.tr" },
        contacts: { president: "Gökhan Aksoy", advisor: "Dr. Öğr. Üyesi B. Yılmaz" },
    },
    {
        id: "tiyatro",
        name: "Tiyatro Kulübü",
        members: 210,
        events: 26,
        category: "kultur-sanat",
        faculty: "İletişim Fakültesi",
        about: "Sahne sanatları ve drama atölyeleri düzenler; sezon boyunca oyun sahneler.",
    },
    {
        id: "muzik",
        name: "Müzik Kulübü",
        members: 340,
        events: 31,
        category: "kultur-sanat",
        faculty: "İletişim Fakültesi",
        about: "Çeşitli müzik türlerinde topluluk çalışmaları ve konserler organize eder.",
    },
    {
        id: "girisimcilik",
        name: "Girişimcilik ve İnovasyon Kulübü",
        members: 460,
        events: 37,
        category: "akademik",
        faculty: "İnsan ve Toplum Bilimleri",
        about: "Girişimcilik ekosistemi, inovasyon ve start-up etkileşimleri üzerine çalışır.",
    },
    {
        id: "sosyal-sorumluluk",
        name: "Sosyal Sorumluluk Kulübü",
        members: 780,
        events: 102,
        category: "sosyal",
        faculty: "İnsan ve Toplum Bilimleri",
        instagram: "https://instagram.com/sskulup",
        about:
            "Toplumsal fayda odaklı projeler yürütür; gönüllülük ve dayanışma kültürünü yaygınlaştırır.",
    },
    {
        id: "spor-saglikli-yasam",
        name: "Spor ve Sağlıklı Yaşam Kulübü",
        members: 290,
        events: 44,
        category: "spor",
        faculty: "Sağlık Bilimleri Fakültesi",
        about: "Spor etkinlikleri, doğa yürüyüşleri ve sağlıklı yaşam seminerleri düzenler.",
    },
    {
        id: "psikoloji",
        name: "Psikoloji Kulübü",
        members: 640,
        events: 49,
        category: "akademik",
        faculty: "İnsan ve Toplum Bilimleri",
        about: "Psikoloji alanında seminerler, vaka analizleri ve atölyeler yapar.",
    },
    {
        id: "sinema",
        name: "Sinema Kulübü",
        members: 230,
        events: 20,
        category: "kultur-sanat",
        faculty: "İletişim Fakültesi",
        about: "Film gösterimleri ve yönetmen söyleşileri organize eder.",
    },
    {
        id: "robotik",
        name: "Robotik ve Otomasyon Kulübü",
        members: 410,
        events: 33,
        category: "teknoloji",
        faculty: "Mühendislik ve Doğa Bilimleri",
        about: "Robotik uygulamalar, yarışmalar ve teknik eğitimler düzenler.",
    },
    {
        id: "uluslararasi-ogrenciler",
        name: "Uluslararası Öğrenciler Kulübü",
        members: 520,
        events: 61,
        category: "sosyal",
        faculty: "İletişim Fakültesi",
        about: "Kültürlerarası etkileşim ve uyum faaliyetleri yürütür.",
    },
    {
        id: "doga-cevre",
        name: "Doğa ve Çevre Kulübü",
        members: 275,
        events: 27,
        category: "sosyal",
        faculty: "Mühendislik ve Doğa Bilimleri",
        about: "Doğa yürüyüşleri, çevre farkındalığı etkinlikleri ve sürdürülebilirlik çalışmaları yapar.",
    },
];

/* ===================== Helpers (etiketler) ===================== */

export const catLabel: Record<CatKey, string> = {
    teknoloji: "Teknoloji",
    "kultur-sanat": "Kültür-Sanat",
    sosyal: "Sosyal Sorumluluk",
    spor: "Spor",
    akademik: "Akademik",
};