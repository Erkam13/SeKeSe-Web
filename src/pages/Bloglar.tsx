// src/pages/Bloglar.tsx
// src/pages/Bloglar.tsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BlogCard from "../BlogCard";
import blogs from "../data/blogs";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Bloglar: React.FC = () => {
    const q = useQuery();
    const navigate = useNavigate();

    const category = q.get("category"); // örn: "Çevre"

    // Eşsiz kategoriler (verideki sıraya göre)
    const categories = React.useMemo(() => {
        const set = new Set<string>();
        blogs.forEach((b) => set.add(b.category));
        return Array.from(set);
    }, []);

    const filtered = category ? blogs.filter((b) => b.category === category) : blogs;

    const go = (cat?: string | null) => {
        if (!cat) {
            navigate("/blog", { replace: false });
        } else {
            navigate(`/blog?category=${encodeURIComponent(cat)}`, { replace: false });
        }
    };

    return (
        <section className="bg-gray-50/60">
            <div className="mx-auto max-w-7xl px-6 pt-10">
                <div className="flex items-center gap-4 flex-wrap">
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
                        {category ? `Blog • ${category}` : "Blog Yazıları"}
                    </h1>

                    {/* Kategori çipleri */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <button
                            type="button"
                            onClick={() => go(null)}
                            className={`rounded-full px-3 py-1 text-sm font-semibold transition ${!category
                                    ? "bg-emerald-600 text-white shadow"
                                    : "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                                }`}
                            aria-pressed={!category}
                        >
                            Tümü
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => go(cat)}
                                className={`rounded-full px-3 py-1 text-sm font-semibold transition ${category === cat
                                        ? "bg-emerald-600 text-white shadow"
                                        : "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                                    }`}
                                aria-pressed={category === cat}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 pb-10 pt-6 grid gap-8 lg:gap-10 justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((b, i) => (
                    <BlogCard key={b.id ?? i} {...b} />
                ))}
            </div>
        </section>
    );
};

export default Bloglar;