import { Link } from "@inertiajs/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const slides = [
    { image: "/hero-organic.svg", href: "/products" },
    { image: "/hero-market.svg", href: "/products" },
    { image: "/hero-offer.svg", href: "/products" },
];

export function HomeHero() {
    const [slide, setSlide] = useState(0);

    useEffect(() => {
        const id = setInterval(
            () => setSlide((s) => (s + 1) % slides.length),
            4500,
        );
        return () => clearInterval(id);
    }, []);

    return (
        <section className="mx-auto max-w-7xl px-4 pt-5 lg:px-8">
            <div className="grid gap-4 lg:grid-cols-3">
                {/* Left banner — image only */}
                <Link
                    href={slides[slide].href}
                    className="relative col-span-1 block overflow-hidden rounded-2xl lg:col-span-2"
                >
                    <img
                        key={slide}
                        src={slides[slide].image}
                        alt="Ghorer Bazar organic marketplace"
                        className="gb-hero-copy h-[280px] w-full rounded-2xl object-cover sm:h-[340px]"
                    />

                    {/* Carousel dots (icon-only controls) */}
                    <div className="absolute bottom-6 left-6 flex items-center gap-3">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                aria-label={`Slide ${i + 1}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setSlide(i);
                                }}
                                className="gb-dot h-2 rounded-full"
                                style={{
                                    width: i === slide ? "1.75rem" : "0.5rem",
                                    background:
                                        i === slide
                                            ? "#F4801F"
                                            : "rgba(255,255,255,0.7)",
                                }}
                            />
                        ))}
                    </div>
                    <button
                        type="button"
                        aria-label="Previous slide"
                        onClick={(e) => {
                            e.preventDefault();
                            setSlide(
                                (s) => (s - 1 + slides.length) % slides.length,
                            );
                        }}
                        className="absolute top-1/2 left-3 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#1F2A22] shadow hover:bg-white sm:flex"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                        type="button"
                        aria-label="Next slide"
                        onClick={(e) => {
                            e.preventDefault();
                            setSlide((s) => (s + 1) % slides.length);
                        }}
                        className="absolute top-1/2 right-3 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#1F2A22] shadow hover:bg-white sm:flex"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </Link>

                {/* Right banner — image only */}
                <Link
                    href="/products?category=honey"
                    className="relative col-span-1 block overflow-hidden rounded-2xl"
                >
                    <img
                        src="/hero-honey.svg"
                        alt="African organic wild honey"
                        className="h-[280px] w-full rounded-2xl object-cover sm:h-[340px]"
                    />
                </Link>
            </div>
        </section>
    );
}
