import React from "react";
import { Calendar, Clock, MapPin } from "lucide-react";

export type EventCardProps = {
    image: string;
    title: string;
    description?: string;
    date: string;          // "13.10.2025 / Pazartesi"
    time: string;          // "10:00 - 20:00"
    location: string;      // "Yeditepe Üniversitesi"
    type?: string;         // "Yüz Yüze Etkinlik" vb.
    href?: string;         // detay linki
};

const EventCard: React.FC<EventCardProps> = ({
    image,
    title,
    description,
    date,
    time,
    location,
    type,
    href,
}) => {
    return (
        <article className="group bg-white rounded-2xl border border-slate-200/70 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 w-full max-w-[620px]">
            {/* Görsel */}
            <div className="aspect-[4/3] w-full overflow-hidden rounded-t-2xl">
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    loading="lazy"
                />
            </div>

            {/* Gövde */}
            <div className="p-5 md:p-6 space-y-3">
                {/* Tür rozeti */}
                {type && (
                    <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 px-3 py-1 text-[11px] font-bold tracking-wide">
                        {type}
                    </span>
                )}

                {/* Başlık */}
                <h3 className="text-xl md:text-[22px] font-extrabold tracking-tight text-slate-900">
                    {title}
                </h3>

                {/* Kısa açıklama */}
                {description && (
                    <p className="text-slate-600 leading-relaxed">{description}</p>
                )}

                {/* Bilgi satırları */}
                <ul className="mt-2 space-y-2 text-[15px]">
                    <li className="flex items-center gap-2 text-slate-700">
                        <Calendar className="h-[18px] w-[18px] text-slate-500" />
                        <span className="font-semibold">{date}</span>
                    </li>
                    <li className="flex items-center gap-2 text-slate-700">
                        <Clock className="h-[18px] w-[18px] text-slate-500" />
                        <span>{time}</span>
                    </li>
                    <li className="flex items-center gap-2 text-slate-700">
                        <MapPin className="h-[18px] w-[18px] text-slate-500" />
                        <span>{location}</span>
                    </li>
                </ul>

                {/* CTA */}
                {href && (
                    <div className="pt-2">
                        <a
                            href={href}
                            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 text-white font-semibold px-4 py-2.5 shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            Detaylı Bilgi
                        </a>
                    </div>
                )}
            </div>
        </article>
    );
};

export default EventCard;