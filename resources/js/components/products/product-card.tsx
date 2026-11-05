import { Link } from "@inertiajs/react";
import { Leaf, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import type { Category, Product } from "@/types";

interface ProductCardProps {
    product: Product & { category: Category };
}

export function ProductCard({ product }: ProductCardProps) {
    const { add } = useCart();
    const hasSale =
        product.sale_price !== null && product.sale_price < product.price;

    return (
        <div className="group flex flex-col overflow-hidden rounded-2xl border border-[#ece1d2] bg-white transition-shadow hover:shadow-md">
            {/* Image placeholder */}
            <Link
                href={`/products/${product.slug}`}
                className="relative aspect-square overflow-hidden bg-[#f4ece0]"
            >
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.name_en}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <span className="text-4xl">🍯</span>
                    </div>
                )}
                {hasSale && (
                    <span className="absolute top-3 left-3 rounded-full bg-[#C0472A] px-2.5 py-1 text-[11px] font-semibold text-white">
                        Sale
                    </span>
                )}
                {product.badges?.includes("organic") && (
                    <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-[#1F6B3B] px-2.5 py-1 text-[11px] font-semibold text-white">
                        <Leaf className="h-3 w-3" /> Organic
                    </span>
                )}
            </Link>

            <div className="flex flex-1 flex-col p-4">
                <Link
                    href={`/products?category=${product.category.slug}`}
                    className="text-[11px] font-medium uppercase tracking-wide"
                    style={{ color: product.category.color_fg }}
                >
                    {product.category.name_en}
                </Link>

                <Link href={`/products/${product.slug}`} className="mt-1 block">
                    <h3 className="text-sm font-semibold text-[#1F2A22] transition-colors hover:text-[#F4801F]">
                        {product.name_en}
                    </h3>
                </Link>

                <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-baseline gap-2">
                        <span className="text-base font-bold text-[#1F6B3B]">
                            {hasSale
                                ? product.formatted_sale_price
                                : product.formatted_price}
                        </span>
                        {hasSale && (
                            <span className="text-xs text-[#756a5c] line-through">
                                {product.formatted_price}
                            </span>
                        )}
                    </div>
                    <Button
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        style={{ background: "#F4801F" }}
                        onClick={() => add(product)}
                        aria-label="Add to cart"
                    >
                        <ShoppingBag className="h-4 w-4 text-white" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
