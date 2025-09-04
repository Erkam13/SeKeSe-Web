// Görselleri istersen /public altından URL'le de verebilirsin
import haber1 from "../assets/haber1.webp";
import haber2 from "../assets/haber2.webp";
import haber3 from "../assets/haber3.webp";
import haber4 from "../assets/haber4.webp";
import haber5 from "../assets/haber5.webp";

export type Haber = {
    image: string;
    title: string;
    summary: string;
    date: string;
    source?: string;
};

const haberler: Haber[] = [
    {
        image: haber1,
        title: "2025 – 2026 Akademik Yılı Öğrenci Dolapları Alımları",
        summary: "Öğrenci dolapları duyurusu ve takvim detayları yayımlandı.",
        date: "26 Ağu 2025",
        source: "SKS",
    },
    {
        image: haber2,
        title: "2025 – 2026 Çalışma ve Yemek Bursu Başvuru Süreçleri",
        summary: "Burs başvuruları 6–24 Ekim tarihleri arasında yapılacaktır.",
        date: "26 Ağu 2025",
        source: "SKS",
    },
    {
        image: haber3,
        title: "Yeni Öğrenci Kulüpleri Kurulum Süreçleri",
        summary: "Kulüp kurmak isteyen öğrenciler için süreç ve başvuru rehberi.",
        date: "26 Ağu 2025",
        source: "SKS",
    },
    {
        image: haber4,

        title: "Öğrenci Kulüpleri Stand Açma Duyurusu",
        summary: "Tanıtım ve üye alım faaliyetleri için stand süreci başladı.",
        date: "26 Ağu 2025",
        source: "SKS",
    },
    {
        image: haber5,
        title: "Öğrenci Kulüpleri Genel Kurul Toplantısı",
        summary: "Genel kurul toplantıları 1–31 Ekim tarihleri arasında yapılacak.",
        date: "26 Ağu 2025",
        source: "SKS",
    },

];

export default haberler;