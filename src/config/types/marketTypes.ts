export type Category = "Gnome" | "Hat" | "Shirt" | "Shoes" | "Accessories";

export type Product = {
  id: string;
  name: string;
  description: string;
  img: string;
  extraImages: string[];
  storeAddress: string;
  price: number;
  category: Category;
  quantity: number;
};
