// src/pages/EventDetail.tsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { events } from "../data/events";
import { Calendar, Clock, MapPin } from "lucide-react";

const EventDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const event = events.find((e) => e.id === id);

    if (!event) {
        return <div className="max-w-4xl mx-auto p-6">Etkinlik bulunamadı.</div>;
    }

    return (
        <section className="bg-gray-50/60">
            <div className="mx-auto max-w-5xl px-6 pt-8 pb-12">
                {/* Görsel */}
                <div className="overflow-hidden rounded-2xl bg-white border border-slate-200 shadow">
                    <div className="aspect-[16/9] w-full overflow-hidden">
                        <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Başlık ve bilgiler */}
                    <div className="p-6 md:p-8">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                            {event.title}
                        </h1>

                        {event.description && (
                            <p className="mt-3 text-slate-700">{event.description}</p>
                        )}

                        <ul className="mt-5 space-y-2 text-[15px]">
                            <li className="flex items-center gap-2 text-slate-700">
                                <Calendar className="h-[18px] w-[18px] text-slate-500" />
                                <span className="font-semibold">{event.date}</span>
                            </li>
                            <li className="flex items-center gap-2 text-slate-700">
                                <Clock className="h-[18px] w-[18px] text-slate-500" />
                                <span>{event.time}</span>
                            </li>
                            <li className="flex items-center gap-2 text-slate-700">
                                <MapPin className="h-[18px] w-[18px] text-slate-500" />
                                <span>{event.location}</span>
                            </li>
                        </ul>

                        {/* >>> BU BUTON KATILIM FORMUNA GÖNDERİR <<< */}
                        <div className="mt-6">
                            <Link
                                to={`/etkinlik-katilim?eventId=${event.id}`}
                                state={{ event }} // opsiyonel: state ile de gönderiyoruz
                                className="inline-flex items-center justify-center rounded-xl bg-emerald-600 text-white font-semibold px-5 py-3 shadow hover:bg-emerald-700"
                            >
                                Etkinliğe Katıl
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EventDetail;