// src/HaberCard.tsx
import React from "react";
import { Newspaper, CalendarDays } from "lucide-react";

type HaberCardProps = {
    image: string;
    title: string;
    summary: string;
    date: string;
    source?: string;
};

const HaberCard: React.FC<HaberCardProps> = ({ image, title, summary, date, source }) => {
    return (
        <div className="card border-0 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col group">
            {/* Görsel */}
            <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />
            </div>

            {/* Body */}
            <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-semibold text-lg md:text-xl text-slate-800 group-hover:text-emerald-700 transition-colors line-clamp-2">
                    {title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 font-light line-clamp-3">{summary}</p>
            </div>

            {/* Footer */}
            <div className="p-4 border-t text-sm text-slate-500 flex justify-between items-center mt-auto">
                <span className="flex items-center gap-1">
                    <CalendarDays size={16} /> {date}
                </span>
                {source && (
                    <span className="flex items-center gap-1">
                        <Newspaper size={16} /> {source}
                    </span>
                )}
            </div>
        </div>
    );
};

export default HaberCard;