
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  longDescription: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount?: number;
  features?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}
