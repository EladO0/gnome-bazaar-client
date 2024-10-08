export type Category =
  | "Gnome"
  | "Hat"
  | "Shirt"
  | "Pants"
  | "Shoes"
  | "Accessories";

export type Product = {
  id: string;
  name: string;
  description: string;
  img: string;
  price: number;
  category: Category;
  quantity: number;
};

export type CartProduct = {
  product: Product;
  quantity: number;
  price: number;
};

export type Purchase = {
  uuid: string;
  date: Date;
  products: Array<CartProduct>;
};

export type MarketFiltersType = {
  productName: string;
  category: Category | undefined;
};