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
    { icon: Users2, label: "Kulüpler & Destek", href: "/kulupler" },
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
    { icon: ClipboardPlus, label: "Etkinliğe Katıl", href: "/etkinlik-katilim" },
];

const DashboardMenu: React.FC = () => {
    return (
        <section className="space-y-8 px-6">
            <h2 className="text-2xl font-bold text-center">SKS Portal</h2>

            <div className="mx-auto grid justify-center gap-3 sm:gap-4 grid-cols-[repeat(auto-fit,minmax(150px,0fr))] sm:grid-cols-[repeat(auto-fit,minmax(170px,0fr))]">
                {items.map((item, i) => (
                    <Link
                        key={i}
                        to={item.href}
                        className="focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-2xl"
                    >
                        <div className="group flex flex-col items-center justify-center gap-2 rounded-2xl bg-white text-slate-800 ring-1 ring-slate-200 shadow transition-colors duration-200 hover:bg-yellow-500 hover:text-white hover:ring-yellow-500 w-[150px] h-[100px] sm:w-[170px] sm:h-[110px]">
                            <item.icon size={28} className="text-yellow-500 group-hover:text-white transition-colors duration-200" aria-hidden="true" />
                            <p className="font-medium text-center text-[13px] sm:text-[14px] leading-tight group-hover:text-white transition-colors duration-200">
                                {item.label}
                            </p>
                        </div>
                    </Link>
                ))}

                {/* Tümünü Gör */}
                <button
                    type="button"
                    className="group flex flex-col items-center justify-center gap-2 w-[150px] h-[100px] sm:w-[170px] sm:h-[110px] rounded-2xl bg-emerald-600 text-white ring-1 ring-emerald-600 shadow transition-colors duration-200 hover:bg-white hover:text-emerald-600 hover:ring-emerald-600"
                >
                    <ArrowDownCircle size={32} className="transition-colors duration-200 group-hover:text-emerald-600" aria-hidden="true" />
                    <p className="font-medium">Tümünü Gör</p>
                </button>
            </div>
        </section>
    );
};

export default DashboardMenu;