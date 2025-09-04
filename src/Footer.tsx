// src/Footer.tsx
import React from "react";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-900 text-gray-300 mt-16">
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Logo & Info */}
                <div>
                    <h2 className="text-xl font-bold text-white">SKS Sağlık Kültür Spor</h2>
                    <p className="text-sm mt-3">
                        Üsküdar Üniversitesi öğrenci yaşamını destekleyen etkinlikler, kulüpler,
                        kültürel & sportif faaliyetler için resmi SKS portalı.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white font-semibold mb-3">Bağlantılar</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/etkinlik-takvim" className="hover:text-emerald-400">Etkinlik Takvimi</a></li>
                        <li><a href="/yemek-menusu" className="hover:text-emerald-400">Yemek Listesi</a></li>
                        <li><a href="/kulupler" className="hover:text-emerald-400">Kulüpler</a></li>
                        <li><a href="/duyurular" className="hover:text-emerald-400">Duyurular</a></li>
                        <li><a href="/iletisim" className="hover:text-emerald-400">İletişim</a></li>
                    </ul>
                </div>

                {/* Sosyal Medya */}
                <div>
                    <h3 className="text-white font-semibold mb-3">Bizi Takip Et</h3>
                    <div className="flex gap-4">
                        <a href="#" aria-label="Facebook" className="hover:text-emerald-400"><Facebook /></a>
                        <a href="#" aria-label="Instagram" className="hover:text-emerald-400"><Instagram /></a>
                        <a href="#" aria-label="Twitter" className="hover:text-emerald-400"><Twitter /></a>
                        <a href="mailto:info@uskudar.edu.tr" aria-label="Mail" className="hover:text-emerald-400"><Mail /></a>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-slate-700 py-4 text-center text-sm text-gray-400">
                © {new Date().getFullYear()} Üsküdar Üniversitesi SKS. Tüm hakları saklıdır.
            </div>
        </footer>
    );
};

export default Footer;