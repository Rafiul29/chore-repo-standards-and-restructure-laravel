export type Category = {
    id: number;
    name_en: string;
    name_bn: string;
    slug: string;
    icon: string | null;
    color_bg: string;
    color_fg: string;
    sort_order: number;
    is_active: boolean;
};

export type Product = {
    id: number;
    category_id: number;
    name_en: string;
    name_bn: string;
    slug: string;
    description: string | null;
    price: number;
    sale_price: number | null;
    stock: number;
    image: string | null;
    badges: string[] | null;
    is_featured: boolean;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    formatted_price: string;
    formatted_sale_price: string | null;
};
