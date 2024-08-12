export interface MarketProps {
    navigation: any;
}

export interface Category {
    id: number;
    category_name: string;
    image_url: string;
}

export interface Size {
    size_id: number;
    size_name: string;
}

export interface Variant {
    variant_id: number;
    color_id: number;
    color_name: string;
    quantity: number;
    images: string[];
    discount: string;
    price: number;
    upc: string;
    sku: string;
    sizes: Size[];
    cart_quantity: number;
    is_fav: boolean;
    reviews: Review[];
}

export interface Review {
    review_id: number;
    rating: number;
    review_text: string;
}

export interface Product {
    product_id: number;
    vendors_id: number;
    name: string;
    description: string;
    category_id: number;
    variants: Variant[];
}