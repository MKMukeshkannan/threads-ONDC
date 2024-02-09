export interface TProduct {
  name: string;
  brand: string;
  retailer_name: string;
  img_url: string;
  price: number;
  rating: 1 | 2 | 3 | 4 | 5;
  texture: string;
  category: "top" | "bottom" | "foot";
}

export interface AIresType {
  id: string;
  value: Array<number>;
  metadata: TProduct;
}
