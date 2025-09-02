import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export type Slide = {
    id: string;
    image: string;          // arka plan görseli
    title?: string;         // büyük başlık
    subtitle?: string;      // alt başlık
    ctaText?: string;       // buton yazısı
    ctaHref?: string;       // buton linki
    darkText?: boolean;     // metin rengi (arka plana göre)
};

type Props = {
    slides: Slide[];
    heightClass?: string;   // örn: "h-[420px] md:h-[500px]"
    autoplayMs?: number;    // örn: 4500
};

const HeroSlider: React.FC<Props> = ({
    slides,
    heightClass = "h-[420px] md:h-[500px]",
    autoplayMs = 4500,
}) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, align: "start", skipSnaps: false },
        [Autoplay({ delay: autoplayMs })]
    );

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    return (
        <div className="relative">
            {/* VIEWPORT */}
            <div className="overflow-hidden rounded-2xl shadow-lg" ref={emblaRef}>
                {/* CONTAINER */}
                <div className="flex">
                    {slides.map((s) => (
                        <div className="min-w-0 flex-[0_0_100%]" key={s.id}>
                            <div className={`relative ${heightClass}`}>
                                {/* background image */}
                                <img
                                    src={s.image}
                                    alt={s.title ?? "slide"}
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                                {/* gradient overlay for readability */}
                                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
                                {/* content */}
                                <div className={`absolute inset-0 flex items-center`}>
                                    <div className="mx-auto w-full max-w-6xl px-6">
                                        <div
                                            className={`max-w-2xl space-y-3 ${s.darkText ? "text-slate-900" : "text-white"
                                                }`}
                                        >
                                            {s.subtitle && (
                                                <span className={`inline-block rounded-full px-3 py-1 text-sm ${s.darkText ? "bg-white/70" : "bg-white/20"
                                                    }`}>
                                                    {s.subtitle}
                                                </span>
                                            )}
                                            {s.title && (
                                                <h2 className="text-3xl md:text-5xl font-extrabold leading-tight drop-shadow">
                                                    {s.title}
                                                </h2>
                                            )}
                                            {s.ctaText && s.ctaHref && (
                                                <a
                                                    href={s.ctaHref}
                                                    className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-white font-semibold hover:bg-emerald-700 transition"
                                                >
                                                    {s.ctaText}
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* arrows */}
            <button
                onClick={scrollPrev}
                aria-label="Önceki"
                className="absolute left-3 top-1/2 -translate-y-1/2 grid place-items-center h-11 w-11 rounded-full bg-white/90 shadow hover:bg-white"
            >
                ‹
            </button>
            <button
                onClick={scrollNext}
                aria-label="Sonraki"
                className="absolute right-3 top-1/2 -translate-y-1/2 grid place-items-center h-11 w-11 rounded-full bg-white/90 shadow hover:bg-white"
            >
                ›
            </button>

            {/* dots */}
            <Dots slides={slides.length} emblaApi={emblaApi} />
        </div>
    );
};

export default HeroSlider;

/* ---- Dots subcomponent ---- */
type DotsProps = { slides: number; emblaApi: ReturnType<typeof useEmblaCarousel>[1] };
const Dots: React.FC<DotsProps> = ({ slides, emblaApi }) => {
    const [, setIndex] = React.useState(0);
    React.useEffect(() => {
        if (!emblaApi) return;
        const onSelect = () => setIndex(emblaApi.selectedScrollSnap());
        emblaApi.on("select", onSelect);
        onSelect();
    }, [emblaApi]);

    return (
        <div className="mt-3 flex justify-center gap-2">
            {Array.from({ length: slides }).map((_, i) => (
                <span key={i} className="h-2 w-2 rounded-full bg-slate-300 inline-block" />
            ))}
        </div>
    );
};