import React, { useState } from "react";
import { Menu, X, Search, Globe } from "lucide-react";
import logo from "./assets/logo.webp";
import { Link, NavLink, useNavigate } from "react-router-dom";

type Item = { label: string; href: string };

const primary: Item[] = [
    { label: "SKS UniLife", href: "/unilife" },
    { label: "Duyurular", href: "/duyurular" },
    { label: "Kulüpler", href: "/kulupler" },
    { label: "Etkinlik Takvimi", href: "/etkinlik-takvim" },
    { label: "Yemek Listesi", href: "/yemek-menusu" },
    { label: "Servis Saatleri", href: "/ring-saatleri" },
    { label: "SKS Blog", href: "/blog" },
    { label: "İletişim", href: "/iletisim" },
];

const Navbar: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query)}`);
        }
    };
    return (

        <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur">
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Left: Logo + Title */}
                <Link to="/" className="flex items-center gap-3" aria-label="Anasayfa">
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
                </Link>

                {/* Center: Desktop menu */}
                <ul className={`hidden md:flex items-center gap-6 lg:gap-8 transition-opacity ${searchOpen ? 'md:opacity-0 md:pointer-events-none' : 'md:opacity-100'}`}>
                    {primary.map((it) => (
                        <li key={it.href}>
                            <NavLink
                                to={it.href}
                                className={({ isActive }) =>
                                    `text-[15px] transition relative after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-emerald-600 after:transition-all ${isActive
                                        ? "text-emerald-700 after:w-full"
                                        : "text-slate-700 hover:text-emerald-700 hover:after:w-full"
                                    }`
                                }
                                end
                            >
                                {it.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* Right: actions */}
                <div className="flex items-center gap-3">
                    {/* Desktop search: compact -> expands */}
                    <div className="hidden md:flex items-center">
                        {searchOpen ? (
                            <form onSubmit={handleSearch} className="relative flex items-center">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    id="nav-search"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    autoFocus
                                    placeholder="Ara..."
                                    className="w-64 md:w-72 pl-9 pr-9 h-9 rounded-full border border-emerald-500 bg-white text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => { setSearchOpen(false); setQuery(''); }}
                                    aria-label="Kapat"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                                >
                                    <X size={16} />
                                </button>
                            </form>
                        ) : (
                            <button
                                onClick={() => setSearchOpen(true)}
                                aria-label="Ara"
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 hover:bg-white hover:border-emerald-500"
                            >
                                <Search size={16} />
                            </button>
                        )}
                    </div>
                    <button
                        aria-label="Dil"
                        className="hidden md:flex items-center gap-1 text-sm text-slate-700 hover:text-emerald-700"
                    >
                        <Globe size={18} />
                        EN
                    </button>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => { setOpen(v => !v); setSearchOpen(false); }}
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
                            <Link
                                to={it.href}
                                className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100"
                                onClick={() => setOpen(false)}
                            >
                                {it.label}
                            </Link>
                        </li>
                    ))}
                    <div className="mt-2 flex items-center gap-3 px-3">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (query.trim()) {
                                    navigate(`/search?q=${encodeURIComponent(query)}`);
                                    setOpen(false);
                                }
                            }}
                            className="flex h-9 flex-1 items-center gap-2 rounded-lg bg-slate-100 px-3 text-slate-700"
                        >
                            <Search size={18} className="text-slate-500" />
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Ara..."
                                className="flex-1 bg-transparent outline-none text-sm placeholder-slate-500"
                            />
                        </form>
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