import { Head, Link, usePage } from "@inertiajs/react";
import { Leaf, Minus, Plus, Share2, ShoppingBag, Truck } from "lucide-react";
import { useState } from "react";

import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import type { Category, Product } from "@/types";

interface ProductShowProps {
    product: Product & { category: Category };
    related: (Product & { category: Category })[];
}

export default function ProductShow() {
    const { product, related } = usePage().props as unknown as ProductShowProps;
    const { add } = useCart();
    const [quantity, setQuantity] = useState(1);

    const hasSale =
        product.sale_price !== null && product.sale_price < product.price;

    return (
        <>
            <Head title={`${product.name_en} — Ghorer Bazar`} />
            <div className="min-h-screen" style={{ background: "#FDF6EC" }}>
                <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="mb-6 flex items-center gap-2 text-sm text-[#756a5c]">
                        <Link href="/" className="hover:text-[#F4801F]">
                            Home
                        </Link>
                        <span>/</span>
                        <Link href="/products" className="hover:text-[#F4801F]">
                            Products
                        </Link>
                        <span>/</span>
                        <Link
                            href={`/products?category=${product.category.slug}`}
                            className="hover:text-[#F4801F]"
                        >
                            {product.category.name_en}
                        </Link>
                        <span>/</span>
                        <span className="text-[#1F2A22]">
                            {product.name_en}
                        </span>
                    </nav>

                    <div className="grid gap-8 lg:grid-cols-2">
                        {/* Image */}
                        <div className="overflow-hidden rounded-2xl border border-[#ece1d2] bg-white">
                            <div className="aspect-square bg-[#f4ece0]">
                                {product.image ? (
                                    <img
                                        src={product.image}
                                        alt={product.name_en}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center">
                                        <span className="text-6xl">🍯</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Details */}
                        <div className="flex flex-col">
                            <Link
                                href={`/products?category=${product.category.slug}`}
                                className="w-fit rounded-full px-3 py-1 text-xs font-medium"
                                style={{
                                    background: product.category.color_bg,
                                    color: product.category.color_fg,
                                }}
                            >
                                {product.category.name_en}
                            </Link>

                            <h1 className="gb-font-display mt-3 text-3xl font-bold text-[#1F2A22]">
                                {product.name_en}
                            </h1>
                            <p className="text-sm text-[#756a5c]">
                                {product.name_en}
                            </p>

                            <div className="mt-4 flex items-baseline gap-3">
                                <span className="text-3xl font-bold text-[#1F6B3B]">
                                    {hasSale
                                        ? product.formatted_sale_price
                                        : product.formatted_price}
                                </span>
                                {hasSale && (
                                    <span className="text-lg text-[#756a5c] line-through">
                                        {product.formatted_price}
                                    </span>
                                )}
                            </div>

                            {product.badges?.includes("organic") && (
                                <div className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#EAF5EA] px-3 py-1.5 text-sm font-medium text-[#1F6B3B]">
                                    <Leaf className="h-4 w-4" /> Certified
                                    Organic
                                </div>
                            )}

                            <p className="mt-6 text-sm leading-relaxed text-[#4A4235]">
                                {product.description ??
                                    "Pure and natural products, sourced directly from origin."}
                            </p>

                            <div className="mt-6 flex items-center gap-2 rounded-xl border border-[#ece1d2] bg-white p-2">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setQuantity((q) => Math.max(1, q - 1))
                                    }
                                    className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-[#f4ece0]"
                                >
                                    <Minus className="h-4 w-4" />
                                </button>
                                <span className="w-10 text-center text-base font-semibold">
                                    {quantity}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setQuantity((q) => q + 1)}
                                    className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-[#f4ece0]"
                                >
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="mt-6 flex gap-3">
                                <Button
                                    className="flex-1 gap-2 rounded-full py-5 text-base font-semibold text-white"
                                    style={{ background: "#F4801F" }}
                                    onClick={() => add(product, quantity)}
                                >
                                    <ShoppingBag className="h-5 w-5" /> Add to
                                    Cart
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-12 w-12 rounded-full border-[#ece1d2]"
                                >
                                    <Share2 className="h-5 w-5" />
                                </Button>
                            </div>

                            <div className="mt-6 flex items-center gap-2 text-sm text-[#756a5c]">
                                <Truck className="h-4 w-4" />
                                <span>Nationwide delivery available</span>
                            </div>
                        </div>
                    </div>

                    {/* Related products */}
                    {related.length > 0 && (
                        <div className="mt-12">
                            <h2 className="gb-font-display text-xl font-bold text-[#1F2A22]">
                                You may also like
                            </h2>
                            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                                {related.map((p) => (
                                    <ProductCard key={p.id} product={p} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
