import React, { useState } from "react";
import { Menu, X, Search, Globe } from "lucide-react";
import logo from "./assets/logo.webp";

type Item = { label: string; href: string };

const primary: Item[] = [
    { label: "SKS UniLife", href: "/unilife" },
    { label: "SKS Blog", href: "/blog" },
    { label: "Kulüpler", href: "/kulupler" },
    { label: "Etkinlik Takvimi", href: "/etkinlik-takvim" },
    { label: "Yemek Listesi", href: "/yemek-menusu" },
    { label: "Servis Saatleri", href: "/ring-saatleri" },
    { label: "Duyurular", href: "/duyurular" },
    { label: "İletişim", href: "/iletisim" },
];

const Navbar: React.FC = () => {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur">
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Left: Logo + Title */}
                <a href="/" className="flex items-center gap-3">
                    <img
                        src={logo}
                        alt="Üsküdar Üniversitesi"
                        className="h-9 w-9 rounded-full object-contain"
                    />
                    <div className="leading-tight">
                        <p className="text-xs text-emerald-700 font-medium">SKS</p>
                        <p className="text-sm sm:text-base font-semibold text-slate-900">
                            Sağlık Kültür Spor
                        </p>
                    </div>
                </a>

                {/* Center: Desktop menu */}
                <ul className="hidden md:flex items-center gap-6 lg:gap-8">
                    {primary.map((it) => (
                        <li key={it.href}>
                            <a
                                href={it.href}
                                className="text-[15px] text-slate-700 hover:text-emerald-700 transition
                           relative after:absolute after:-bottom-2 after:left-0 after:h-[2px]
                           after:w-0 hover:after:w-full after:bg-emerald-600 after:transition-all"
                            >
                                {it.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Right: actions */}
                <div className="flex items-center gap-3">
                    <button
                        aria-label="Ara"
                        className="hidden md:inline-flex h-9 w-9 items-center justify-center rounded-full
                       bg-slate-100 hover:bg-slate-200 text-slate-700"
                    >
                        <Search size={18} />
                    </button>
                    <button
                        aria-label="Dil"
                        className="hidden md:flex items-center gap-1 text-sm text-slate-700 hover:text-emerald-700"
                    >
                        <Globe size={18} />
                        EN
                    </button>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setOpen((v) => !v)}
                        className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg
                       text-slate-700 hover:bg-slate-100"
                        aria-label="Menüyü aç/kapat"
                    >
                        {open ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>

            {/* Mobile drawer */}
            <div
                className={`md:hidden transition-[max-height] overflow-hidden border-t
                    ${open ? "max-h-[80vh]" : "max-h-0"}`}
            >
                <ul className="flex flex-col gap-1 p-3 bg-white">
                    {primary.map((it) => (
                        <li key={it.href}>
                            <a
                                href={it.href}
                                className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100"
                                onClick={() => setOpen(false)}
                            >
                                {it.label}
                            </a>
                        </li>
                    ))}
                    <div className="mt-2 flex items-center gap-3 px-3">
                        <button className="flex h-9 flex-1 items-center gap-2 rounded-lg bg-slate-100 px-3 text-slate-700">
                            <Search size={18} /> Ara
                        </button>
                        <button className="flex items-center gap-1 text-sm text-slate-700">
                            <Globe size={18} />
                            EN
                        </button>
                    </div>
                </ul>
            </div>
        </header>
    );
};

export default Navbar;