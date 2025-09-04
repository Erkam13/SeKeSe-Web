// src/data/menu.ts
// Arama indeksine uygun haftalık yemek menüsü datası
// allRecords.ts'te beklenen alanlar: id, day, mains[], sides[], soup?, salad?

export type Dish = {
    name: string;
    kcal?: number;
};

export type MenuDay = {
    id: string;         // benzersiz id
    date: string;       // ISO: 2025-09-01
    day: string;        // Pazartesi, Salı ...
    soup?: Dish;
    mains?: Dish[];     // birden fazla ana yemek olabilir
    sides?: Dish[];     // pilav, makarna vb.
    salad?: Dish;       // salata / ayran gibi yan
    dessert?: Dish;     // tatlı (opsiyonel)
    totalKcal?: number; // toplam tahmini kalori (opsiyonel)
};

const menu: MenuDay[] = [
    {
        id: "2025-09-01",
        date: "2025-09-01",
        day: "Pazartesi",
        soup: { name: "Mercimek Çorbası", kcal: 180 },
        mains: [
            { name: "Izgara Tavuk", kcal: 350 },
            { name: "Sebzeli Güveç (Vejetaryen)", kcal: 320 },
        ],
        sides: [
            { name: "Bulgur Pilavı", kcal: 220 },
            { name: "Yoğurt", kcal: 90 },
        ],
        salad: { name: "Mevsim Salata", kcal: 70 },
        dessert: { name: "Meyve", kcal: 80 },
        totalKcal: 900,
    },
    {
        id: "2025-09-02",
        date: "2025-09-02",
        day: "Salı",
        soup: { name: "Tarhana Çorbası", kcal: 160 },
        mains: [
            { name: "Tas Kebabı", kcal: 420 },
            { name: "Fırında Sebzeli Makarna (Vejetaryen)", kcal: 380 },
        ],
        sides: [
            { name: "Pirinç Pilavı", kcal: 240 },
            { name: "Ayran", kcal: 95 },
        ],
        salad: { name: "Çoban Salata", kcal: 75 },
        dessert: { name: "Sütlaç", kcal: 220 },
        totalKcal: 1000,
    },
    {
        id: "2025-09-03",
        date: "2025-09-03",
        day: "Çarşamba",
        soup: { name: "Domates Çorbası", kcal: 140 },
        mains: [
            { name: "Fırında Köfte", kcal: 430 },
            { name: "Nohut Yahni (Vejetaryen)", kcal: 360 },
        ],
        sides: [
            { name: "Fırın Patates", kcal: 210 },
            { name: "Cacık", kcal: 110 },
        ],
        salad: { name: "Mevsim Salata", kcal: 70 },
        dessert: { name: "Kazandibi", kcal: 240 },
        totalKcal: 1000,
    },
    {
        id: "2025-09-04",
        date: "2025-09-04",
        day: "Perşembe",
        soup: { name: "Ezogelin Çorbası", kcal: 170 },
        mains: [
            { name: "Etli Nohut", kcal: 450 },
            { name: "Zeytinyağlı Barbunya (Vejetaryen)", kcal: 330 },
        ],
        sides: [
            { name: "Pirinç Pilavı", kcal: 240 },
            { name: "Turşu", kcal: 20 },
        ],
        salad: { name: "Gavurdağı Salata", kcal: 120 },
        dessert: { name: "Aşure", kcal: 260 },
        totalKcal: 1050,
    },
    {
        id: "2025-09-05",
        date: "2025-09-05",
        day: "Cuma",
        soup: { name: "Sebze Çorbası", kcal: 130 },
        mains: [
            { name: "Tavuk Sote", kcal: 380 },
            { name: "Mantarlı Risotto (Vejetaryen)", kcal: 400 },
        ],
        sides: [
            { name: "Makarna (Tereyağlı)", kcal: 300 },
            { name: "Ayran", kcal: 95 },
        ],
        salad: { name: "Roka Salata", kcal: 60 },
        dessert: { name: "Şekerpare", kcal: 280 },
        totalKcal: 1100,
    },
];

export default menu;