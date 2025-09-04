import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";
import DashboardMenu from "./DashboardMenu";
import HeroSlider from "./HeroSlider";
import EventCard from "./EventCard";
import BlogCard from "./BlogCard";
import { blogs } from "./data/blogs";
import { slides } from "./data/slides";
import { events } from "./data/events";
import Stats from "./Stats";

import EtkinlikTakvim from "./pages/EtkinlikTakvim";
import EtkinlikKatilim from "./pages/EtkinlikKatilim";
import Search from "./pages/Search";
import Unilife from "./pages/Unilife";
import Bloglar from "./pages/Bloglar";
import YemekMenusu from "./pages/YemekMenusu";
import Duyurular from "./pages/Duyurular";
import Kulupler from "./pages/Kulupler";
import Rings from "./pages/Rings";
import BlogDetail from "./pages/BlogDetail";


// Layout
const Layout: React.FC = () => (
  <div className="bg-gray-50 min-h-screen flex flex-col">
    <Navbar />
    <div className="flex-1">
      <Outlet />
    </div>
    <Footer />
  </div>
);

// Home
const Home: React.FC = () => {
  return (
    <div className="space-y-12">
      <section>
        <div className="px-6 pt-6">
          <HeroSlider slides={slides} heightClass="h-[460px] md:h-[520px]" autoplayMs={5000} />
        </div>
      </section>
      <Stats />

      <DashboardMenu />

      <section className="bg-gray-50/60">
        <div className="mx-auto max-w-7xl px-6 pt-10">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
            Etkinlikler
          </h2>
        </div>
        <div className="mx-auto max-w-7xl px-6 pb-10 pt-6 grid gap-8 lg:gap-10 justify-items-center
                grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {events.map((e, i) => (
            <EventCard key={i} {...e} />
          ))}
        </div>
      </section>

      <section className="bg-gray-50/60">
        <div className="mx-auto max-w-7xl px-6 pt-10">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
            Blog Yazıları
          </h2>
        </div>
        <div className="mx-auto max-w-7xl px-6 pb-10 pt-6 grid gap-8 lg:gap-10 justify-items-center
               grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {blogs.map((blog, i) => (
            <BlogCard key={i} {...blog} />
          ))}
        </div>

      </section>
    </div>
  );
};

// Router
const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/etkinlik-takvim" element={<EtkinlikTakvim />} />
        <Route path="/yemek-menusu" element={<YemekMenusu />} />
        <Route path="/ring-saatleri" element={<Rings />} />
        <Route path="/duyurular" element={<Duyurular />} />
        <Route path="/kulupler" element={<Kulupler />} />
        <Route path="/blog" element={<Bloglar />} />
        <Route path="/unilife" element={<Unilife />} />
        <Route path="/search" element={<Search />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/etkinlik-katilim" element={<EtkinlikKatilim />} />
        <Route path="*" element={<div className="p-6">Sayfa bulunamadı</div>} />
      </Route>
    </Routes>
  );
};

export default App;