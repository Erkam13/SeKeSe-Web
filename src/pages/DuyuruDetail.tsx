// src/pages/DuyuruDetail.tsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import announcements from "../data/announcements";

const DuyuruDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const item = announcements.find((a) => a.slug === slug);

    if (!item) {
        return (
            <div className="max-w-3xl mx-auto px-6 py-16">
                <h1 className="text-2xl font-bold">Duyuru bulunamadı</h1>
                <p className="mt-2 text-slate-600">
                    Aradığınız içerik kaldırılmış ya da bağlantı yanlış olabilir.
                </p>
                <Link to="/duyurular" className="mt-4 inline-block text-emerald-700 font-semibold hover:underline">
                    ← Tüm duyurular
                </Link>
            </div>
        );
    }

    return (
        <article className="min-h-screen">
            {/* Kapak */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-4xl mx-auto px-6 py-12">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                        <Link to="/duyurular" className="hover:underline">Duyurular</Link>
                        <span>•</span>
                        <time>{item.date}</time>
                        {item.source && (
                            <>
                                <span>•</span>
                                <span className="font-semibold">{item.source}</span>
                            </>
                        )}
                    </div>

                    <h1 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                        {item.title}
                    </h1>
                </div>
            </div>

            {/* Görsel */}
            <div className="max-w-xl mx-auto px-6 mt-6">
                <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-100">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                    />
                </div>
            </div>

            {/* İçerik */}
            <div className="max-w-3xl mx-auto px-6 py-10">
                <div className="text-[17px] leading-8 text-slate-800 space-y-6">
                    {/* özet */}
                    {item.summary && <p className="text-slate-600 italic">{item.summary}</p>}

                    {/* asıl içerik */}
                    {item.contentHtml && (
                        <div
                            className="[&>h2]:text-2xl [&>h2]:font-extrabold [&>h2]:tracking-tight [&>h2]:text-slate-900 [&>h2]:mt-8 [&>h2]:mb-2
                         [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mt-6
                         [&>p]:my-4 [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5
                         [&>blockquote]:border-l-4 [&>blockquote]:border-slate-300 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-slate-700"
                            dangerouslySetInnerHTML={{ __html: item.contentHtml }}
                        />
                    )}
                </div>

                {/* Alt navigasyon */}
                <div className="mt-10 flex items-center justify-between border-t pt-6">
                    <Link to="/duyurular" className="text-emerald-700 font-semibold hover:underline">
                        ← Tüm duyurular
                    </Link>
                    <Link to="/" className="text-slate-600 hover:underline">
                        Ana Sayfa
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default DuyuruDetail;