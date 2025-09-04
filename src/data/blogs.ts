// src/data/blogs.ts
import foto1 from "../assets/foto1.webp";
import foto2 from "../assets/foto2.webp";
import foto3 from "../assets/foto3.webp";

export type BlogItem = {
    id: string;
    slug: string;
    image: string;
    title: string;
    category: string;
    author: string;
    date: string;       // "26 Ağustos 2025"
    description: string;
    contentHtml: string; // Detay sayfasında render edilecek HTML
};

export const blogs: BlogItem[] = [
    {
        id: "b-1",
        slug: "doga-ile-daha-yakin-yasamak",
        image: foto1,
        title: "Doğa ile Daha Yakın Yaşamak",
        category: "Çevre",
        author: "Erkam Kara",
        date: "26 Ağustos 2025",
        description: "Doğanın önemi ve çevre bilincinin artırılması üzerine bir makale.",
        contentHtml: `
      <p>Doğa ile daha yakın yaşamak, yalnızca bir tercih değil; modern dünyanın stresini dengelemenin güçlü bir yoludur. 
      Üniversite yaşamında küçük adımlarla başlamak mümkündür: kampüste yürüyüş rotaları oluşturmak, kulüp etkinliklerini açık havada planlamak ve 
      sürdürülebilirlik farkındalığını artırmak gibi.</p>
      <h2>1) Kampüste mikro alışkanlıklar</h2>
      <p>Her gün 20 dakikalık bir yürüyüş, telefonuzdan uzak kalıp zihninizi tazeler. 
      Bunun yanında kulüp toplantılarını açık alanda yapmak bile ekibi daha yaratıcı hale getirebilir.</p>
      <blockquote>Küçük ve düzenli değişimler, büyük etkiler yaratır.</blockquote>
      <h2>2) Sürdürülebilir seçimler</h2>
      <ul>
        <li>Tek kullanımlık yerine tekrar kullanılabilir ürünler</li>
        <li>Bisiklet ve ring saatlerini tercih ederek karbon ayak izini azaltmak</li>
        <li>Kampüs içi yeşil alanlarda etkinlikler</li>
      </ul>
      <p>Sonuç olarak, doğa ile uyumlu bir ritim; odaklanmayı, mutluluğu ve üretkenliği artırır.</p>
    `,
    },
    {
        id: "b-2",
        slug: "yeni-nesil-teknolojiler-ogrenciler-icin-ne-sunuyor",
        image: foto2,
        title: "Yeni Nesil Teknolojiler Öğrenciler İçin Ne Sunuyor?",
        category: "Teknoloji",
        author: "Ayşe Yılmaz",
        date: "22 Ağustos 2025",
        description: "Teknolojinin eğitimdeki rolü ve öğrencilere sunduğu fırsatlar üzerine bir inceleme.",
        contentHtml: `
      <p>Yapay zeka destekli öğrenme, kişiselleştirilmiş içerik ve anlık geri bildirim imkânı sunuyor.
      Aynı zamanda kulüpler için organizasyon, içerik üretimi ve veri takibi çok daha pratik hale geldi.</p>
      <h2>Pratik kullanımlar</h2>
      <ol>
        <li>Etkinlik planlama ve biletleme</li>
        <li>İçerik üretiminde yardımcı araçlar</li>
        <li>Kulüp verilerinin görselleştirilmesi</li>
      </ol>
      <p>Doğru stratejiyle teknoloji, öğrencilerin zamandan tasarruf etmesini ve daha yaratıcı projeler üretmesini sağlar.</p>
    `,
    },
    {
        id: "b-3",
        slug: "universite-kuluplerinde-sosyal-hayat",
        image: foto3,
        title: "Üniversite Kulüplerinde Sosyal Hayat",
        category: "Eğitim",
        author: "Mehmet Demir",
        date: "15 Ağustos 2025",
        description: "Üniversite kulüplerinin öğrenci yaşamına katkıları ve sosyal etkileşim üzerine bir yazı.",
        contentHtml: `
      <p>Kulüpler, üniversite deneyiminin kalbidir. Sosyalleşmeyi, öğrenmeyi ve network oluşturmayı aynı potada eritir.</p>
      <h2>İpuçları</h2>
      <p>Yıl boyunca düzenli etkinlik ritmi, yeni öğrencilerin katılımını artırır ve kulüp kültürünü güçlendirir.</p>
    `,
    },
];

export default blogs;