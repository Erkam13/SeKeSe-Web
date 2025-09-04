// src/pages/BlogDetail.tsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import blogs from "../data/blogs";

const BlogDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = blogs.find((b) => b.slug === slug);

    if (!post) {
        return (
            <div className="max-w-3xl mx-auto px-6 py-16">
                <h1 className="text-2xl font-bold">Yazı bulunamadı</h1>
                <p className="mt-2 text-slate-600">
                    Aradığınız içerik kaldırılmış ya da bağlantı yanlış olabilir.
                </p>
                <Link to="/blog" className="mt-4 inline-block text-emerald-700 font-semibold hover:underline">
                    ← Tüm yazılar
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
                        <Link to="/blog" className="hover:underline">Blog</Link>
                        <span>•</span>
                        <Link
                            to={`/blog?category=${encodeURIComponent(post.category)}`}
                            className="rounded-full px-2 py-0.5 bg-emerald-100/70 text-emerald-800 font-semibold hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                            aria-label={`Kategori: ${post.category}`}
                        >
                            {post.category}
                        </Link>
                    </div>

                    <h1 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                        {post.title}
                    </h1>

                    <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                        <span className="font-semibold">{post.author}</span>
                        <span>•</span>
                        <time>{post.date}</time>
                    </div>
                </div>
            </div>

            {/* Görsel */}
            <div className="max-w-4xl mx-auto px-6 mt-6">
                <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl bg-slate-100">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                    />
                </div>
            </div>

            {/* İçerik */}
            <div className="max-w-3xl mx-auto px-6 py-10">
                <div className="text-[17px] leading-8 text-slate-800 space-y-6">
                    {/* description (özet) */}
                    {post.description && (
                        <p className="text-slate-600 italic">{post.description}</p>
                    )}

                    {/* asıl içerik */}
                    <div
                        className="[&>h2]:text-2xl [&>h2]:font-extrabold [&>h2]:tracking-tight [&>h2]:text-slate-900 [&>h2]:mt-8 [&>h2]:mb-2
                       [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mt-6
                       [&>p]:my-4 [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5
                       [&>blockquote]:border-l-4 [&>blockquote]:border-slate-300 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-slate-700"
                        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                    />
                </div>

                {/* Alt navigasyon */}
                <div className="mt-10 flex items-center justify-between border-t pt-6">
                    <Link to="/blog" className="text-emerald-700 font-semibold hover:underline">
                        ← Tüm yazılar
                    </Link>
                    <Link to="/" className="text-slate-600 hover:underline">
                        Ana Sayfa
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default BlogDetail;
