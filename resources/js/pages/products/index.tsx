import { Head, Link, usePage } from "@inertiajs/react";
import {
    ChevronLeft,
    ChevronRight,
    Leaf,
    SlidersHorizontal,
} from "lucide-react";

import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import type { Category, PaginatedMeta, Product } from "@/types";

interface ProductsPageProps {
    products: {
        data: (Product & { category: Category })[];
        meta: PaginatedMeta;
    };
    categories: Category[];
    filters: {
        category: string | null;
    };
}

export default function ProductsIndex() {
    const { products, categories, filters } = usePage()
        .props as unknown as ProductsPageProps;
    const activeCategory = categories.find((c) => c.slug === filters.category);

    return (
        <>
            <Head
                title={
                    activeCategory
                        ? `${activeCategory.name_en} — Ghorer Bazar`
                        : "All Products — Ghorer Bazar"
                }
            />
            <div className="min-h-screen" style={{ background: "#FDF6EC" }}>
                {/* Page header */}
                <div className="border-b border-[#ece1d2] bg-white">
                    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <h1 className="gb-font-display text-2xl font-bold text-[#1F2A22]">
                                    {activeCategory
                                        ? activeCategory.name_en
                                        : "All Products"}
                                </h1>
                                <p className="mt-1 text-sm text-[#756a5c]">
                                    {products.meta.total} products found
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                className="gap-2 rounded-full border-[#ece1d2]"
                            >
                                <SlidersHorizontal className="h-4 w-4" /> Filter
                            </Button>
                        </div>

                        {/* Category pills */}
                        <div className="mt-4 flex flex-wrap gap-2">
                            <Link
                                href="/products"
                                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                                    !filters.category
                                        ? "text-white"
                                        : "border border-[#ece1d2] bg-white text-[#1F2A22] hover:bg-[#f4ece0]"
                                }`}
                                style={
                                    !filters.category
                                        ? { background: "#F4801F" }
                                        : undefined
                                }
                            >
                                All
                            </Link>
                            {categories.map((cat) => (
                                <Link
                                    key={cat.id}
                                    href={`/products?category=${cat.slug}`}
                                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                                        filters.category === cat.slug
                                            ? "text-white"
                                            : "border border-[#ece1d2] bg-white text-[#1F2A22] hover:bg-[#f4ece0]"
                                    }`}
                                    style={
                                        filters.category === cat.slug
                                            ? { background: cat.color_fg }
                                            : undefined
                                    }
                                >
                                    {cat.name_en}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Product grid */}
                <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
                    {products.data.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <Leaf className="h-12 w-12 text-[#756a5c]" />
                            <h3 className="mt-4 text-lg font-semibold text-[#1F2A22]">
                                No products found
                            </h3>
                            <p className="mt-1 text-sm text-[#756a5c]">
                                Try another category
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                            {products.data.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {products.meta.last_page > 1 && (
                        <div className="mt-8 flex items-center justify-center gap-2">
                            {products.meta.links.map((link, i) =>
                                link.url ? (
                                    <Link
                                        key={i}
                                        href={link.url}
                                        preserveScroll
                                        className={`flex h-9 min-w-[2.25rem] items-center justify-center rounded-full px-3 text-sm font-medium transition-colors ${
                                            link.active
                                                ? "text-white"
                                                : "border border-[#ece1d2] bg-white text-[#1F2A22] hover:bg-[#f4ece0]"
                                        }`}
                                        style={
                                            link.active
                                                ? { background: "#F4801F" }
                                                : undefined
                                        }
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ) : (
                                    <span
                                        key={i}
                                        className="flex h-9 min-w-[2.25rem] items-center justify-center rounded-full px-3 text-sm text-[#756a5c]"
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ),
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
