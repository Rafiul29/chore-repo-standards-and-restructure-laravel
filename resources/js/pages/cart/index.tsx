import { Head, Link } from "@inertiajs/react";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

function formatTaka(paise: number): string {
    return (
        "Tk " +
        (paise / 100).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
    );
}

export default function CartIndex() {
    const { items, total, count, remove, updateQuantity, clear } = useCart();

    return (
        <>
            <Head title="Cart — Ghorer Bazar" />
            <div className="min-h-screen" style={{ background: "#FDF6EC" }}>
                <div className="mx-auto max-w-5xl px-4 py-8 lg:px-8">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="gb-font-display text-2xl font-bold text-[#1F2A22]">
                            Your Cart ({count})
                        </h1>
                        {items.length > 0 && (
                            <button
                                type="button"
                                onClick={clear}
                                className="text-sm font-medium text-[#C0472A] hover:underline"
                            >
                                Clear Cart
                            </button>
                        )}
                    </div>

                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-2xl border border-[#ece1d2] bg-white py-20 text-center">
                            <ShoppingBag className="h-12 w-12 text-[#756a5c]" />
                            <h3 className="mt-4 text-lg font-semibold text-[#1F2A22]">
                                Your Cart is Empty
                            </h3>
                            <p className="mt-1 text-sm text-[#756a5c]">
                                Add products to start shopping
                            </p>
                            <Link href="/products" className="mt-6">
                                <Button
                                    className="rounded-full px-6 py-5 text-sm font-semibold text-white"
                                    style={{ background: "#F4801F" }}
                                >
                                    Browse Products
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-6 lg:grid-cols-3">
                            {/* Items */}
                            <div className="space-y-3 lg:col-span-2">
                                {items.map((item) => {
                                    const unit = item.sale_price ?? item.price;
                                    const hasSale =
                                        item.sale_price !== null &&
                                        item.sale_price < item.price;
                                    return (
                                        <div
                                            key={item.id}
                                            className="flex gap-4 rounded-2xl border border-[#ece1d2] bg-white p-4"
                                        >
                                            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#f4ece0]">
                                                {item.image ? (
                                                    <img
                                                        src={item.image}
                                                        alt={item.name_en}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center text-3xl">
                                                        🍯
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex flex-1 flex-col">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <Link
                                                            href={`/products/${item.slug}`}
                                                            className="text-sm font-semibold text-[#1F2A22] hover:text-[#F4801F]"
                                                        >
                                                            {item.name_en}
                                                        </Link>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            remove(item.id)
                                                        }
                                                        className="rounded-full p-1.5 text-[#756a5c] hover:bg-[#f4ece0] hover:text-[#C0472A]"
                                                        aria-label="Remove item"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>

                                                <div className="mt-auto flex items-center justify-between pt-3">
                                                    <div className="flex items-center gap-2 rounded-full border border-[#ece1d2]">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    item.id,
                                                                    item.quantity -
                                                                        1,
                                                                )
                                                            }
                                                            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-[#f4ece0]"
                                                            aria-label="Decrease quantity"
                                                        >
                                                            <Minus className="h-3.5 w-3.5" />
                                                        </button>
                                                        <span className="w-6 text-center text-sm font-semibold">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    item.id,
                                                                    item.quantity +
                                                                        1,
                                                                )
                                                            }
                                                            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-[#f4ece0]"
                                                            aria-label="Increase quantity"
                                                        >
                                                            <Plus className="h-3.5 w-3.5" />
                                                        </button>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-sm font-bold text-[#1F6B3B]">
                                                            {formatTaka(
                                                                unit *
                                                                    item.quantity,
                                                            )}
                                                        </span>
                                                        {hasSale && (
                                                            <span className="block text-[11px] text-[#756a5c] line-through">
                                                                {formatTaka(
                                                                    item.price *
                                                                        item.quantity,
                                                                )}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Summary */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-24 rounded-2xl border border-[#ece1d2] bg-white p-5">
                                    <h2 className="text-base font-semibold text-[#1F2A22]">
                                        Order Summary
                                    </h2>
                                    <div className="mt-4 flex items-center justify-between border-t border-[#ece1d2] pt-4">
                                        <span className="text-sm text-[#756a5c]">
                                            Subtotal
                                        </span>
                                        <span className="text-lg font-bold text-[#1F2A22]">
                                            {formatTaka(total)}
                                        </span>
                                    </div>
                                    <Button
                                        className="mt-5 w-full rounded-full py-5 text-sm font-semibold text-white"
                                        style={{ background: "#F4801F" }}
                                    >
                                        Checkout
                                    </Button>
                                    <Link
                                        href="/products"
                                        className="mt-3 block text-center text-sm font-medium text-[#1F6B3B] hover:underline"
                                    >
                                        Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
