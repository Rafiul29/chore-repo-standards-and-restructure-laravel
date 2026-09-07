import { Link, usePage } from "@inertiajs/react";
import {
    Heart,
    Leaf,
    Menu,
    Search,
    ShoppingBag,
    Truck,
    User,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { login } from "@/routes";

export function HomeHeader() {
    const { auth } = usePage().props;
    const { count } = useCart();
    const [searchQuery, setSearchQuery] = useState("");

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
                    <label className="flex items-center overflow-hidden rounded-full border border-[#ece1d2] bg-[#f4ece0] pl-4 focus-within:ring-2 focus-within:ring-[#F4801F]">
                        <Search className="h-4 w-4 shrink-0 text-[#756a5c]" />
                        <input
                            type="text"
                            placeholder="What are you looking for? (e.g. honey, dates, spices)"
                            className="w-full bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-[#756a5c]"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                            type="button"
                            aria-label="Search"
                            className="flex h-10 shrink-0 items-center justify-center px-4 text-white transition-opacity hover:opacity-90"
                            style={{ background: "#F4801F" }}
                        >
                            <Search className="h-4 w-4" />
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
                                Dashboard
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
                        className="flex items-center gap-2 rounded-lg border border-[#ece1d2] px-2.5 py-1.5 transition-colors hover:bg-[#f4ece0]"
                    >
                        <span className="relative">
                            <ShoppingBag className="h-5 w-5" />
                            {count > 0 && (
                                <span
                                    className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white"
                                    style={{ background: "#1F6B3B" }}
                                >
                                    {count}
                                </span>
                            )}
                        </span>
                        <span className="hidden flex-col items-start leading-none sm:flex">
                            <span className="text-[11px] text-[#756a5c]">
                                {count} Items
                            </span>
                            <span className="text-xs font-semibold">
                                Tk 0.00
                            </span>
                        </span>
                    </Link>

                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="More"
                        className="text-[#1f2a22]"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                </nav>
            </div>

            {/* Mobile search */}
            <div className="border-t border-[#ece1d2] px-4 py-2 md:hidden">
                <label className="flex items-center overflow-hidden rounded-full border border-[#ece1d2] bg-[#f4ece0] pl-3">
                    <Search className="h-4 w-4 shrink-0 text-[#756a5c]" />
                    <input
                        type="text"
                        placeholder="What are you looking for?"
                        className="w-full bg-transparent px-2 py-2 text-sm outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </label>
            </div>
        </header>
    );
}
