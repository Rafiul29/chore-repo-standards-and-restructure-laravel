import { Link } from "@inertiajs/react";
import {
    Cherry,
    ChevronLeft,
    ChevronRight,
    Coffee,
    Droplet,
    Flame,
    Leaf,
    Package,
    Sprout,
    Wheat,
} from "lucide-react";
import { useRef } from "react";

const featured = [
    {
        label: "Organic",
        sub: "Organic",
        slug: "organic",
        icon: Leaf,
        bg: "#EAF5EA",
        fg: "#1F6B3B",
    },
    {
        label: "Honey",
        sub: "Honey",
        slug: "honey",
        icon: Droplet,
        bg: "#FCEFD8",
        fg: "#B9740A",
    },
    {
        label: "Dates",
        sub: "Dates",
        slug: "dates",
        icon: Cherry,
        bg: "#F6E7DE",
        fg: "#8A4B2A",
    },
    {
        label: "Spices",
        sub: "Spices",
        slug: "spices",
        icon: Flame,
        bg: "#FBE7E3",
        fg: "#C0472A",
    },
    {
        label: "Nuts & Seeds",
        sub: "Nuts & Seeds",
        slug: "nuts-seeds",
        icon: Sprout,
        bg: "#F1EAD9",
        fg: "#8A6A2A",
    },
    {
        label: "Beverages",
        sub: "Beverage",
        slug: "beverage",
        icon: Coffee,
        bg: "#EFE3D6",
        fg: "#6B4226",
    },
    {
        label: "Rice",
        sub: "Rice",
        slug: "rice",
        icon: Wheat,
        bg: "#F8F1DF",
        fg: "#9C7C1F",
    },
    {
        label: "Flours & Lentils",
        sub: "Flours & Lentils",
        slug: "flours-lentils",
        icon: Package,
        bg: "#EDE8F5",
        fg: "#5B4A96",
    },
];

export function HomeFeaturedCategories() {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const scrollBy = (dir: 1 | -1) =>
        scrollerRef.current?.scrollBy({ left: dir * 280, behavior: "smooth" });

    return (
        <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
            <div className="mb-5 flex items-end justify-between">
                <div>
                    <h2 className="gb-font-display text-2xl font-bold text-[#1F2A22]">
                        Featured Categories
                    </h2>
                    <p className="text-sm text-[#756a5c]">
                        Everyday essentials by category
                    </p>
                </div>
                <div className="hidden items-center gap-2 sm:flex">
                    <button
                        type="button"
                        aria-label="Scroll left"
                        onClick={() => scrollBy(-1)}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ece1d2] bg-white text-[#1f2a22] transition-colors hover:bg-[#f4ece0]"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        aria-label="Scroll right"
                        onClick={() => scrollBy(1)}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ece1d2] bg-white text-[#1f2a22] transition-colors hover:bg-[#f4ece0]"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div
                ref={scrollerRef}
                className="gb-scrollbar-hide gb-nav-scroll flex gap-5 overflow-x-auto pb-2"
            >
                {featured.map((cat) => (
                    <Link
                        key={cat.label}
                        href={`/products?category=${cat.slug}`}
                        className="group flex w-24 shrink-0 flex-col items-center gap-2 text-center sm:w-28"
                    >
                        <span
                            className="flex h-20 w-20 items-center justify-center rounded-full border border-[#ece1d2] shadow-sm transition-transform group-hover:-translate-y-1 group-hover:shadow-md sm:h-24 sm:w-24"
                            style={{ background: cat.bg, color: cat.fg }}
                        >
                            <cat.icon
                                className="h-8 w-8 sm:h-9 sm:w-9"
                                strokeWidth={1.75}
                            />
                        </span>
                        <span className="text-[13px] leading-tight font-semibold text-[#1F2A22]">
                            {cat.label}
                        </span>
                        <span className="text-[11px] text-[#756a5c]">
                            {cat.sub}
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
