import React from 'react'
import { CircleUser } from 'lucide-react';


type BlogCardProps = {
    image: string,
    title: string,
    category: string,
    author: string,
    date: string,
    description?: string
}
const categoryColors: Record<string, string> = {
    Çevre: "bg-green-600 text-white",
    Teknoloji: "bg-blue-600 text-white",
    Eğitim: "bg-yellow-500 text-black",
};
const BlogCard: React.FC<BlogCardProps> = ({ image, title, date, category, author, description }) => {
    return (

        <div className="card border-0 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
            {/* Görsel */}
            <div className="image">
                <img src={image} alt={title} className="" />
            </div>

            {/* Body */}
            <div className="body p-4 space-y-2 flex-1">
                <p
                    className={`rounded-2xl border p-1.5 inline-block text-xs ${categoryColors[category] || "bg-gray-400 text-white"
                        }`}
                >
                    {category}
                </p>
                <h3 className="font-bold py-0.5 text-2xl">{title}</h3>
                <p className="font-light py-0.5">{description}</p>
            </div>

            {/* Footer → en alta sabit */}
            <div className="footer p-2 border-t text-sm text-gray-600 font-bold mt-auto flex justify-between items-center">
                <p className="flex items-center gap-1">
                    <CircleUser />
                    {author}
                </p>
                <p>{date}</p>
            </div>
        </div>
    )
}

export default BlogCard