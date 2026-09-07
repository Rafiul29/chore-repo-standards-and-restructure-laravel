import { Link, usePage } from "@inertiajs/react";
import {
    Heart,
    Info,
    Leaf,
    Menu,
    MessageCircleMore,
    Phone,
    Search,
    ShoppingBag,
    Truck,
    User,
    X,
} from "lucide-react";

function MoreIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M6 5h12" />
            <path d="M4 12h10" />
            <path d="M12 19h8" />
        </svg>
    );
}
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { login } from "@/routes";

export function HomeHeader() {
    const { auth } = usePage().props;
    const { count, total } = useCart();
    const [searchQuery, setSearchQuery] = useState("");
    const [moreOpen, setMoreOpen] = useState(false);
    const moreRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!moreOpen) return;
        const onClick = (event: MouseEvent) => {
            if (
                moreRef.current &&
                !moreRef.current.contains(event.target as Node)
            ) {
                setMoreOpen(false);
            }
        };
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") setMoreOpen(false);
        };
        document.addEventListener("mousedown", onClick);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onClick);
            document.removeEventListener("keydown", onKey);
        };
    }, [moreOpen]);

    return (
        <header className="sticky top-0 z-30 border-b border-[#ece1d2] bg-white/95 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 lg:gap-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex shrink-0 items-center gap-2">
                    <span
                        className="flex h-10 w-10 items-center justify-center rounded-full text-white"
                        style={{
                            background:
                                "linear-gradient(145deg,#F4801F,#D9670F)",
                        }}
                    >
                        <Leaf className="h-5 w-5" strokeWidth={2.5} />
                    </span>
                    <span className="gb-font-display flex flex-col leading-none">
                        <span
                            className="text-xl font-bold tracking-tight"
                            style={{ color: "#F4801F" }}
                        >
                            Ghorer
                            <span style={{ color: "#1F6B3B" }}>Bazar</span>
                        </span>
                        <span className="text-[11px] font-medium tracking-wide text-[#756a5c]">
                            Organic Food Marketplace
                        </span>
                    </span>
                </Link>

                {/* Search */}
                <div className="mx-auto hidden max-w-xl flex-1 md:block">
                    <label className="flex items-center overflow-hidden rounded-md border border-[#ece1d2] bg-[#f4ece0] pl-4 focus-within:border-[#F4801F]">
                        <input
                            type="text"
                            placeholder="Search in..."
                            className="w-full bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-[#756a5c]"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                            type="button"
                            aria-label="Search"
                            className="flex h-10 shrink-0 items-center justify-center px-4 text-[#1f2a22] transition-opacity hover:opacity-70"
                        >
                            <Search className="h-5 w-5" />
                        </button>
                    </label>
                </div>

                {/* Right icon cluster */}
                <nav className="ml-auto flex items-center gap-1 lg:gap-2">
                    <button
                        type="button"
                        className="hidden flex-col items-center gap-0.5 rounded-lg px-2.5 py-1.5 text-[#1f2a22] transition-colors hover:bg-[#f4ece0] lg:flex"
                    >
                        <Truck className="h-5 w-5" />
                        <span className="text-[11px] font-medium whitespace-nowrap">
                            Track Order
                        </span>
                    </button>

                    {auth.user ? (
                        <Link
                            href="/dashboard"
                            className="hidden flex-col items-center gap-0.5 rounded-lg px-2.5 py-1.5 text-[#1f2a22] transition-colors hover:bg-[#f4ece0] sm:flex"
                        >
                            <User className="h-5 w-5" />
                            <span className="text-[11px] font-medium whitespace-nowrap">
                                Sign In
                            </span>
                        </Link>
                    ) : (
                        <Link
                            href={login()}
                            className="hidden flex-col items-center gap-0.5 rounded-lg px-2.5 py-1.5 text-[#1f2a22] transition-colors hover:bg-[#f4ece0] sm:flex"
                        >
                            <User className="h-5 w-5" />
                            <span className="text-[11px] font-medium whitespace-nowrap">
                                Sign In
                            </span>
                        </Link>
                    )}

                    <button
                        type="button"
                        className="relative flex flex-col items-center gap-0.5 rounded-lg px-2.5 py-1.5 text-[#1f2a22] transition-colors hover:bg-[#f4ece0]"
                    >
                        <Heart className="h-5 w-5" />
                        <span
                            className="absolute top-0.5 right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white"
                            style={{ background: "#F4801F" }}
                        >
                            0
                        </span>
                        <span className="hidden text-[11px] font-medium whitespace-nowrap sm:inline">
                            Wishlist
                        </span>
                    </button>

                    <Link
                        href="/cart"
                        className="flex flex-col items-center gap-0.5 rounded-lg px-2.5 py-1.5 text-[#1f2a22] transition-colors hover:bg-[#f4ece0]"
                    >
                        <span className="relative">
                            <ShoppingBag className="h-5 w-5" />
                            <span
                                className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white"
                                style={{ background: "#F4801F" }}
                            >
                                {count}
                            </span>
                        </span>
                        <span className="hidden text-[11px] font-medium whitespace-nowrap sm:inline">
                            Cart
                        </span>
                    </Link>

                    {/* More dropdown */}
                    <div className="relative" ref={moreRef}>
                        <button
                            type="button"
                            aria-label="More"
                            aria-expanded={moreOpen}
                            aria-haspopup="menu"
                            onClick={() => setMoreOpen((open) => !open)}
                            className="flex flex-col items-center gap-0.5 rounded-lg px-2.5 py-1.5 text-[#1f2a22] transition-colors hover:bg-[#f4ece0]"
                        >
                            <MoreIcon className="h-5 w-5" />
                            <span className="hidden text-[11px] font-medium whitespace-nowrap sm:inline">
                                More
                            </span>
                        </button>

                        {moreOpen && (
                            <div
                                role="menu"
                                className="absolute top-full right-0 z-40 mt-2 w-56 overflow-hidden rounded-2xl border border-[#ece1d2] bg-white py-1.5 shadow-lg"
                            >
                                <Link
                                    role="menuitem"
                                    href="/about"
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#1f2a22] transition-colors hover:bg-[#f4ece0]"
                                    onClick={() => setMoreOpen(false)}
                                >
                                    <Info className="h-4 w-4 text-[#1F6B3B]" />
                                    About Us
                                </Link>
                                <Link
                                    role="menuitem"
                                    href="/wishlist"
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#1f2a22] transition-colors hover:bg-[#f4ece0]"
                                    onClick={() => setMoreOpen(false)}
                                >
                                    <Heart className="h-4 w-4 text-[#1F6B3B]" />
                                    Wishlists
                                </Link>
                                <Link
                                    role="menuitem"
                                    href="/faq"
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#1f2a22] transition-colors hover:bg-[#f4ece0]"
                                    onClick={() => setMoreOpen(false)}
                                >
                                    <MessageCircleMore className="h-4 w-4 text-[#1F6B3B]" />
                                    Faqs
                                </Link>
                                <Link
                                    role="menuitem"
                                    href="tel:+8800000000000"
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#1f2a22] transition-colors hover:bg-[#f4ece0]"
                                    onClick={() => setMoreOpen(false)}
                                >
                                    <Phone className="h-4 w-4 text-[#1F6B3B]" />
                                    Call Us
                                </Link>
                                <Link
                                    role="menuitem"
                                    href="https://wa.me/8800000000000"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#1f2a22] transition-colors hover:bg-[#f4ece0]"
                                    onClick={() => setMoreOpen(false)}
                                >
                                    <MessageCircleMore className="h-4 w-4 text-[#1F6B3B]" />
                                    WhatsApp
                                </Link>
                            </div>
                        )}
                    </div>
                </nav>
            </div>

            {/* Mobile search */}
            <div className="border-t border-[#ece1d2] px-4 py-2 md:hidden">
                <label className="flex items-center overflow-hidden rounded-full border border-[#ece1d2] bg-[#f4ece0] pl-3">
                    <Search className="h-4 w-4 shrink-0 text-[#756a5c]" />
                    <input
                        type="text"
                        placeholder="Search in..."
                        className="w-full bg-transparent px-2 py-2 text-sm outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </label>
            </div>
        </header>
    );
}
