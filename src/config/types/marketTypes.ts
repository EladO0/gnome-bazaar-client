export type Category =
  | "Gnome"
  | "Hat"
  | "Shirt"
  | "Pants"
  | "Shoes"
  | "Accessories";

export type Product = {
  _id: string;
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
};

export type Purchase = {
  uuid: string;
  date: Date;
  products: Array<CartProduct>;
  signature: string;
};

export type MarketFiltersType = {
  productName: string;
  category: Category | undefined;
  min: number | undefined;
  max: number | undefined;
};
