import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import DashboardMenu from "./DashboardMenu";
import HeroSlider, { type Slide } from "./HeroSlider";
import EventCard from "./EventCard";
import BlogCard from "./BlogCard";
import { blogs } from "./data/blogs";
import Stats from "./Stats";

import EtkinlikTakvim from "./pages/EtkinlikTakvim";
import YemekMenusu from "./pages/YemekMenusu";
import RingSaatleri from "./pages/RingSaatleri";
import Duyurular from "./pages/Duyurular";
import Kulupler from "./pages/Kulupler";


// Slider görselleri public/banners altında ise:
const slides: Slide[] = [
  {
    id: "the-2025",
    image: "/banners/the-impact.jpg",
    title: "17 SDG etiketiyle Vakıf Üniversiteleri arasında\nTÜRKİYE BİRİNCİSİYİZ!",
    subtitle: "THE Impact Rankings 2025",
    ctaText: "Detaylı Bilgi",
    ctaHref: "/the-impact",
  },
  {
    id: "spor",
    image: "/banners/sports.jpg",
    title: "Spor Tesisleri ve Takımlar",
    subtitle: "SKS • Üsküdar Üniversitesi",
    ctaText: "Tesisleri Keşfet",
    ctaHref: "/spor-tesisleri",
  },
  {
    id: "yemek",
    image: "/banners/food.jpg",
    title: "Haftalık Yemek Menüsü",
    subtitle: "Sağlıklı & Dengeli",
    ctaText: "Menüyü Gör",
    ctaHref: "/yemek-menusu",
  },
];

// ---- Layout: her sayfada Navbar görünsün ----
const Layout: React.FC = () => (
  <div className="bg-gray-50 min-h-screen">
    <Navbar />
    <Outlet />
  </div>
);

// ---- Home: anasayfa içeriği ----
const Home: React.FC = () => {
  const events = [
    {
      image: "https://picsum.photos/400/200?3",
      title: "21. Yüzyılda Uluslararası Göç Konferansı – IX",
      date: "13.10.2025 / Pazartesi",
      time: "10:00 - 20:00",
      location: "Yeditepe Üniversitesi",
      description: "Göç üzerine uluslararası akademik konferans.",
      type: "Yüz Yüze Etkinlik",
    },
    {
      image: "https://picsum.photos/400/200?2",
      title: "2025 Mezuniyet Törenleri",
      date: "02.07.2025 / Çarşamba",
      time: "10:00 - 17:00",
      location: "Üsküdar Üniversitesi",
      description: "Üsküdar Üniversitesi mezuniyet törenleri.",
      type: "Yüz Yüze Etkinlik",
    },
  ];



  return (
    <div className="space-y-12">
      <section>
        <div className="px-6 pt-6">
          <HeroSlider slides={slides} heightClass="h-[460px] md:h-[520px]" autoplayMs={5000} />
        </div>
      </section>
      <Stats />

      <DashboardMenu />

      <section>
        <h2 className="text-2xl font-bold px-6 pt-6">Etkinlikler</h2>
        <div className="justify-center flex flex-wrap gap-6 p-6">
          {events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold px-6">Blog Yazıları</h2>
        <div className="flex justify-center gap-6 p-6 flex-wrap">
          {blogs.map((blog, index) => (
            <div key={index} className="w-80">
              <BlogCard {...blog} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// ---- Router ----
const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/etkinlik-takvim" element={<EtkinlikTakvim />} />
        <Route path="/yemek-menusu" element={<YemekMenusu />} />
        <Route path="/ring-saatleri" element={<RingSaatleri />} />
        <Route path="/duyurular" element={<Duyurular />} />
        <Route path="/kulupler" element={<Kulupler />} />
        <Route path="*" element={<div className="p-6">Sayfa bulunamadı</div>} />
      </Route>
    </Routes>
  );
};

export default App;