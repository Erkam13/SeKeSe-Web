// src/data/announcements.ts
import haber1 from "../assets/haber1.webp";
import haber2 from "../assets/haber2.webp";
import haber3 from "../assets/haber3.webp";
import haber4 from "../assets/haber4.webp";
import haber5 from "../assets/haber5.webp";

// Basit slug helper (başlık → url-dostu anahtar)
export const slugify = (s: string) =>
    s
        .toLowerCase()
        .normalize("NFD").replace(/\p{Diacritic}/gu, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

export type AnnouncementItem = {
    id: string;
    slug: string;
    image: string;
    title: string;
    date: string;        // "26 Ağu 2025"
    source?: string;     // "SKS" vb
    summary: string;     // karttaki kısa metin
    contentHtml?: string; // detay sayfasında gösterilecek HTML içerik
};

const raw = [
    {
        id: "a-1",
        image: haber1,
        title: "2025 – 2026 Akademik Yılı Öğrenci Dolapları Alımları",
        date: "26 Ağu 2025",
        source: "SKS",
        summary: "Öğrenci dolapları duyurusu ve takvim detayları yayımlandı.",
        contentHtml: `
      <p>2025 – 2026 akademik yılı için öğrenci dolapları alım süreçleri ve teslim/tesellüm takvimi yayımlanmıştır.</p>
      <h2>Başvuru</h2>
      <ul>
        <li>Online başvuru formu üzerinden yapılacaktır.</li>
        <li>Talep yoğunluğunda kura yöntemi uygulanabilir.</li>
      </ul>
      <p>Detaylı bilgi için SKS ile iletişime geçebilirsiniz.</p>
    `,
    },
    {
        id: "a-2",
        image: haber2,
        title: "2025 – 2026 Çalışma ve Yemek Bursu Başvuru Süreçleri",
        date: "26 Ağu 2025",
        source: "SKS",
        summary: "Burs başvuruları 6–24 Ekim tarihleri arasında yapılacaktır.",
        contentHtml: `
      <p>Çalışma ve Yemek Bursu başvuruları <strong>6–24 Ekim</strong> arasında çevrimiçi olarak alınacaktır.</p>
      <p>Ön koşullar, istenen belgeler ve değerlendirme kriterleri duyuruda yer almaktadır.</p>
    `,
    },
    {
        id: "a-3",
        image: haber3,
        title: "Yeni Öğrenci Kulüpleri Kurulum Süreçleri",
        date: "26 Ağu 2025",
        source: "SKS",
        summary: "Kulüp kurmak isteyen öğrenciler için süreç ve başvuru rehberi.",
        contentHtml: `
      <p>Yeni kulüp kurmak isteyen öğrenciler için yönerge ve başvuru adımları güncellenmiştir.</p>
      <p>Gerekli formlar ve danışman onay süreçleri duyuru ekinde yer alır.</p>
    `,
    },
    {
        id: "a-4",
        image: haber4,
        title: "Öğrenci Kulüpleri Stand Açma Duyurusu",
        date: "26 Ağu 2025",
        source: "SKS",
        summary: "Tanıtım ve üye alım faaliyetleri için stand süreci başladı.",
        contentHtml: `
      <p>Oryantasyon ve tanıtım haftası kapsamında kulüpler için stand başvuruları açılmıştır.</p>
      <p>Mekân tahsisi ve teknik ihtiyaçlar için formları doldurmayı unutmayınız.</p>
    `,
    },
    {
        id: "a-5",
        image: haber5,
        title: "Öğrenci Kulüpleri Genel Kurul Toplantısı",
        date: "26 Ağu 2025",
        source: "SKS",
        summary: "Genel kurul toplantıları 1–31 Ekim tarihleri arasında yapılacak.",
        contentHtml: `
      <p>Tüm kulüplerin yıllık genel kurul toplantılarını <strong>1–31 Ekim</strong> arasında yapması gerekmektedir.</p>
      <p>Tutanak ve sonuç raporlarının SKS'ye iletilmesi zorunludur.</p>
    `,
    },
] as const;

const announcements: AnnouncementItem[] = raw.map((r) => ({
    ...r,
    slug: slugify(r.title),
}));

export default announcements;