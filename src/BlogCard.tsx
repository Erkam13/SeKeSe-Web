import React from "react";
import { Link } from "react-router-dom";
import { CircleUser } from "lucide-react";

type BlogCardProps = {
    image: string;
    title: string;
    category: string;
    author: string;
    date: string;
    description?: string;
    slug?: string;   // detay sayfası için
    href?: string;   // alternatif doğrudan link
};

const categoryColors: Record<string, string> = {
    Çevre: "bg-green-100 text-green-700",
    Teknoloji: "bg-blue-100 text-blue-700",
    Eğitim: "bg-yellow-100 text-yellow-800",
};
const categoryDefault = "bg-slate-100 text-slate-700";

const BlogCard: React.FC<BlogCardProps> = ({
    image,
    title,
    date,
    category,
    author,
    description,
    slug,
    href,
}) => {
    const to = slug ? `/blog/${slug}` : href;

    const CardInner = (
        <article
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg focus:outline-none"
            aria-label={title}
        >
            {/* Görsel */}
            <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
            </div>

            {/* İçerik */}
            <div className="flex-1 p-4 md:p-5">
                <Link
                    to={`/blog?category=${encodeURIComponent(category)}`}
                    className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ring-black/5 transition-colors hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${categoryColors[category] ?? categoryDefault}`}
                    aria-label={`${category} kategorisindeki yazıları gör`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {category}
                </Link>

                <h3 className="mt-2 text-[17px] font-semibold leading-snug text-slate-900 group-hover:underline">
                    {title}
                </h3>

                {description && (
                    <p className="mt-1 text-[13.5px] font-light leading-relaxed text-slate-600 line-clamp-2">
                        {description}
                    </p>
                )}
            </div>

            {/* Footer */}
            <footer className="mt-auto flex items-center justify-between gap-3 border-t px-4 py-2 text-[12px] text-slate-500 md:px-5">
                <span className="inline-flex items-center gap-1.5 font-light">
                    <CircleUser className="h-4 w-4" />
                    {author}
                </span>
                <span className="font-light">{date}</span>
            </footer>
        </article>
    );
    s
    // Link ile sarmala (varsa)
    return to ? (
        <Link
            to={to}
            className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-2xl"
            aria-label={title}
        >
            {CardInner}
        </Link>
    ) : (
        CardInner
    );
};

export default BlogCard;