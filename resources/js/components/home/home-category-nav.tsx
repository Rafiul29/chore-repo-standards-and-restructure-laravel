import { ChevronDown } from "lucide-react";

const categoryNav = [
    { label: "Offer Zone", highlight: true },
    { label: "Honey", dropdown: true },
    { label: "Oil & Ghee", dropdown: true },
    { label: "Dates", dropdown: true },
    { label: "Spices", dropdown: true },
    { label: "Nuts & Seeds", dropdown: true },
    { label: "Beverages", dropdown: true },
    { label: "Rice, Flour & Lentils", dropdown: true },
    { label: "Certified Products" },
    { label: "Pickles" },
];

export function HomeCategoryNav() {
    return (
        <div style={{ background: "#16241C" }}>
            <div className="gb-scrollbar-hide mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 py-2.5 lg:px-8">
                {categoryNav.map((c) => (
                    <button
                        key={c.label}
                        type="button"
                        className="flex shrink-0 items-center gap-1 rounded-full px-3.5 py-1.5 text-[13px] font-medium whitespace-nowrap transition-colors"
                        style={{
                            color: c.highlight
                                ? "#FDF6EC"
                                : "rgba(253,246,236,0.82)",
                            background: c.highlight ? "#F4801F" : "transparent",
                        }}
                        onMouseEnter={(e) => {
                            if (!c.highlight)
                                e.currentTarget.style.background =
                                    "rgba(253,246,236,0.08)";
                        }}
                        onMouseLeave={(e) => {
                            if (!c.highlight)
                                e.currentTarget.style.background =
                                    "transparent";
                        }}
                    >
                        {c.label}
                        {c.dropdown && (
                            <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
