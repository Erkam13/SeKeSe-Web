// src/data/facilities.ts
export type FacilityType = "Spor Salonu" | "Fitness" | "Yüzme" | "Açık Saha" | "Salon Sporları" | "Koşu Parkuru";

export type Facility = {
    id: string;
    name: string;
    campus: string;              // Merkez Yerleşke, Güney Yerleşke, Sağlık Yerleşke...
    type: FacilityType;
    image: string;               // /public veya import
    hours: string;               // "Hafta içi 09:00–22:00"
    description: string;         // kısa tanıtım
    amenities: string[];         // "Duş", "Soyunma Odası", "Skorboard" vb.
    reservationUrl?: string;     // rezervasyon sistemi (varsa)
    mapUrl?: string;             // google maps / harita
    rules?: string[];            // temel kurallar
    contact?: { email?: string; phone?: string };
};

export const facilities: Facility[] = [
    {
        id: "f-1",
        name: "Çok Amaçlı Spor Salonu",
        campus: "Merkez Yerleşke",
        type: "Salon Sporları",
        image: "/images/tesisler/cok-amacli-salon.webp",
        hours: "Hafta içi 09:00–22:00, Hafta sonu 10:00–20:00",
        description:
            "Basketbol, voleybol ve hentbol müsabakaları ile antrenmanlarına uygun, tribünlü, zemin kaplamalı çok amaçlı salon.",
        amenities: ["Skorboard", "Profesyonel Aydınlatma", "Soyunma Odası", "Duş", "İlk Yardım Kabini"],
        reservationUrl: "#",
        mapUrl: "https://maps.google.com",
        rules: [
            "Salon zemini için uygun tabanlı spor ayakkabı zorunludur.",
            "Saha; takım antrenmanı ve resmi etkinliklerde önceliklidir.",
        ],
        contact: { email: "spor@sks.edu.tr", phone: "+90 216 000 00 00" },
    },
    {
        id: "f-2",
        name: "Fitness Center",
        campus: "Güney Yerleşke",
        type: "Fitness",
        image: "/images/tesisler/fitness-center.webp",
        hours: "Her gün 08:00–22:00",
        description:
            "Kardiyo, serbest ağırlık ve fonksiyonel antrenman alanlarıyla donatılmış modern fitness merkezi.",
        amenities: ["Koşu Bandı", "Serbest Ağırlık", "Fonksiyonel Alan", "Dolap", "Duş"],
        reservationUrl: "#",
        mapUrl: "https://maps.google.com",
        rules: ["Havlu kullanımı zorunludur.", "Cihazları kullandıktan sonra dezenfekte ediniz."],
        contact: { email: "fitness@sks.edu.tr" },
    },
    {
        id: "f-3",
        name: "Açık Futbol Sahası",
        campus: "Sağlık Yerleşke",
        type: "Açık Saha",
        image: "/images/tesisler/futbol-sahasi.webp",
        hours: "Her gün 09:00–23:00 (rezervasyonlu)",
        description:
            "Gece aydınlatmalı, sentetik çim yüzeyli 7x7 / 8x8 maçlara uygun açık futbol sahası.",
        amenities: ["Aydınlatma", "Sentetik Çim", "Skorboard", "Soyunma Odası"],
        reservationUrl: "#",
        mapUrl: "https://maps.google.com",
    },
    {
        id: "f-4",
        name: "Yarı Olimpik Havuz",
        campus: "Merkez Yerleşke",
        type: "Yüzme",
        image: "/images/tesisler/yari-olimpik-havuz.webp",
        hours: "Hafta içi 07:00–21:00, Cumartesi 09:00–18:00",
        description:
            "Isıtmalı, 25m/6 kulvar yarı olimpik yüzme havuzu. Dönem içi yüzme dersleri ve serbest yüzme saatleri.",
        amenities: ["6 Kulvar", "Can Kurtaran", "Soyunma Odası", "Duş", "Sauna"],
        reservationUrl: "#",
        mapUrl: "https://maps.google.com",
        rules: ["Bone zorunludur.", "Havuz alanında koşmak yasaktır."],
    },
    {
        id: "f-5",
        name: "Koşu & Yürüyüş Parkuru",
        campus: "Güney Yerleşke",
        type: "Koşu Parkuru",
        image: "/images/tesisler/kosu-parkuru.webp",
        hours: "Gün doğumu–gün batımı",
        description:
            "Aydınlatmalı çevre parkuru; koşu, yürüyüş ve ısınma çalışmalarına uygundur.",
        amenities: ["Aydınlatma", "Dinlenme Alanları", "Su İstasyonu"],
        mapUrl: "https://maps.google.com",
    },
];