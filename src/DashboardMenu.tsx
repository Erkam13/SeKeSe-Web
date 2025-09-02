import React from "react";
import {
    CalendarDays,
    Megaphone,
    Users2,
    ClipboardPlus,
    UtensilsCrossed,
    Bus,
    Dumbbell,
    Activity,
    HeartPulse,
    Accessibility,
    Drama,
    FileText,
    BookOpen,
    CircleHelp,
    MessageSquare,
    Phone,
    ArrowDownCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const baseCard =
    "flex flex-col items-center justify-center gap-3 rounded-2xl bg-white shadow p-6 hover:shadow-lg transition cursor-pointer";

const items = [
    { icon: CalendarDays, label: "Etkinlik Takvimi", href: "/etkinlik-takvim" },
    { icon: Megaphone, label: "Duyurular & Haberler", href: "/duyurular" },
    { icon: Users2, label: "Kulüpler", href: "/kulupler" },
    { icon: ClipboardPlus, label: "Kulübe Katıl", href: "/kulube-katil" },
    { icon: UtensilsCrossed, label: "Yemek Menüsü", href: "/yemek-menusu" },
    { icon: Bus, label: "Ring Saatleri", href: "/ring-saatleri" },
    { icon: Dumbbell, label: "Spor Tesisleri", href: "/spor-tesisleri" },
    { icon: Activity, label: "Sağlık Hizmetleri", href: "/saglik" },
    { icon: HeartPulse, label: "Psikolojik Danışmanlık", href: "/psikolojik-danismanlik" },
    { icon: Accessibility, label: "Engelli Öğrenci Birimi", href: "/engelli-ogrenci" },
    { icon: Drama, label: "Kültür Etkinlikleri", href: "/kultur-etkinlikleri" },
    { icon: FileText, label: "Etkinlik Talep Formu", href: "/etkinlik-talep" },
    { icon: BookOpen, label: "Kılavuz & Dokümanlar", href: "/kilavuzlar" },
    { icon: CircleHelp, label: "SSS", href: "/sss" },
    { icon: MessageSquare, label: "Geri Bildirim", href: "/geri-bildirim" },
    { icon: Phone, label: "İletişim", href: "/iletisim" },
];

const DashboardMenu: React.FC = () => {
    return (
        <section className="space-y-8 px-6">
            <h2 className="text-2xl font-bold text-center">SKS Portal</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {items.map((item, i) => (
                    <Link
                        key={i}
                        to={item.href}
                        className="focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-2xl"
                    >
                        <div className={baseCard}>
                            <item.icon size={32} className="text-yellow-500" aria-hidden="true" />
                            <p className="text-gray-800 font-medium text-center">{item.label}</p>
                        </div>
                    </Link>
                ))}

                {/* Tümünü Gör */}
                <button
                    type="button"
                    className="flex flex-col items-center justify-center gap-3 bg-emerald-500 text-white rounded-2xl shadow p-6 hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                    <ArrowDownCircle size={32} aria-hidden="true" />
                    <p className="font-medium">Tümünü Gör</p>
                </button>
            </div>
        </section>
    );
};

export default DashboardMenu;