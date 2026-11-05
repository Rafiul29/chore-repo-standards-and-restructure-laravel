import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";

import type { Product } from "@/types";

export type CartItem = {
    id: number;
    name_en: string;
    slug: string;
    price: number;
    sale_price: number | null;
    image: string | null;
    quantity: number;
};

interface CartContextValue {
    items: CartItem[];
    count: number;
    total: number;
    add: (product: Product, quantity?: number) => void;
    remove: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clear: () => void;
}

const STORAGE_KEY = "ghorerbazar_cart";

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    // Load from localStorage once on mount
    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) setItems(JSON.parse(raw));
        } catch {
            // ignore corrupt storage
        }
    }, []);

    // Persist on change
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } catch {
            // ignore quota errors
        }
    }, [items]);

    const add = useCallback((product: Product, quantity = 1) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.id === product.id);
            if (existing) {
                return prev.map((i) =>
                    i.id === product.id
                        ? { ...i, quantity: i.quantity + quantity }
                        : i,
                );
            }
            return [
                ...prev,
                {
                    id: product.id,
                    name_en: product.name_en,
                    slug: product.slug,
                    price: product.price,
                    sale_price: product.sale_price,
                    image: product.image,
                    quantity,
                },
            ];
        });
    }, []);

    const remove = useCallback((id: number) => {
        setItems((prev) => prev.filter((i) => i.id !== id));
    }, []);

    const updateQuantity = useCallback((id: number, quantity: number) => {
        setItems((prev) =>
            prev
                .map((i) =>
                    i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i,
                )
                .filter((i) => i.quantity > 0),
        );
    }, []);

    const clear = useCallback(() => setItems([]), []);

    const count = useMemo(
        () => items.reduce((sum, i) => sum + i.quantity, 0),
        [items],
    );

    const total = useMemo(
        () =>
            items.reduce(
                (sum, i) => sum + (i.sale_price ?? i.price) * i.quantity,
                0,
            ),
        [items],
    );

    const value = useMemo(
        () => ({ items, count, total, add, remove, updateQuantity, clear }),
        [items, count, total, add, remove, updateQuantity, clear],
    );

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
}
