

export type RingRoute = {
    id: string;
    title: string;
    description: string;
    times: string[];
    route?: string; // "Çarşı Yerleşke → Sağlık Yerleşke" gibi
};

export const ringRoutes: RingRoute[] = [
    {
        id: "carsi-saglik",
        title: "Çarşı Yerleşke → Sağlık Yerleşke",
        description: "Güzergah: Çarşı Yerleşke - Merkez Yerleşke - Güney Yerleşke - Sağlık Yerleşke",
        times: ["08:00", "08:20", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
    },
    {
        id: "merkez-saglik",
        title: "Merkez Yerleşke → Sağlık Yerleşke",
        description: "Güzergah: Merkez Yerleşke - Güney Yerleşke - Sağlık Yerleşke",
        times: ["08:05", "08:25", "09:05", "10:05", "11:05", "12:05", "13:05", "14:05", "15:05", "16:05", "17:05"],
    },
    {
        id: "saglik-carsi",
        title: "Sağlık Yerleşke → Çarşı Yerleşke",
        description: "Güzergah: Sağlık Yerleşke - Merkez Yerleşke - Çarşı Yerleşke",
        times: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
    },
];

export default ringRoutes;