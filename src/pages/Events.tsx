import React from "react";
import EventCard from "../EventCard";
import { events } from "../data/events";

const Events: React.FC = () => {
    return (
        <section className="bg-gray-50/60">
            <div className="mx-auto max-w-7xl px-6 pt-10">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
                    Etkinlikler
                </h1>
            </div>

            <div
                className="mx-auto max-w-7xl px-6 pb-12 pt-6 grid gap-8 lg:gap-10 justify-items-center
                    grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
                {events.map((e) => (
                    <EventCard
                        key={e.id}
                        image={e.image}
                        title={e.title}
                        description={e.description}
                        date={e.date}
                        time={e.time}
                        location={e.location}
                        type={e.type}
                        // kartı tıklanabilir yapan link:
                        href={`/etkinlik/${e.id}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Events;