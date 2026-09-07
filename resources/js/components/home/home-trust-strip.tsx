import { Percent, RotateCcw, ShieldCheck, Truck } from "lucide-react";

const trust = [
    {
        icon: Truck,
        title: "Nationwide Delivery",
        sub: "Fast & secure delivery",
    },
    {
        icon: ShieldCheck,
        title: "Certified Organic",
        sub: "EU & USDA approved products",
    },
    { icon: RotateCcw, title: "Easy Returns", sub: "Return within 7 days" },
    {
        icon: Percent,
        title: "Best Prices",
        sub: "Sourced directly from origin",
    },
];

export function HomeTrustStrip() {
    return (
        <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-8">
            <div className="grid grid-cols-2 gap-3 rounded-2xl border border-[#ece1d2] bg-white p-4 sm:grid-cols-4 sm:p-5">
                {trust.map((t) => (
                    <div key={t.title} className="flex items-center gap-3">
                        <span
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                            style={{ background: "#EAF5EA", color: "#1F6B3B" }}
                        >
                            <t.icon className="h-5 w-5" />
                        </span>
                        <div className="min-w-0 leading-tight">
                            <p className="truncate text-[13px] font-semibold">
                                {t.title}
                            </p>
                            <p className="truncate text-[11px] text-[#756a5c]">
                                {t.sub}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
