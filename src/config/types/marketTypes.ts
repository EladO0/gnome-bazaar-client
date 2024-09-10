export type Category = "Gnome" | "Hat" | "Shirt" | "Pants" | "Shoes" | "Accessories";

export type Product = {
  id: string;
  name: string;
  description: string;
  img: string;
  storeAddress: string;
  price: number;
  category: Category;
  quantity: number;
};


export type CartProduct = {
  product: Product,
  quantity: number
};