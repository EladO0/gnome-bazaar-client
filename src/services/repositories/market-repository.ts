import { Product } from "../../config/types/marketTypes";
import {
  delay,
  randomBetween,
  randomString,
} from "../utilities/common-utility";

const gnomes = [
  "gnome1.webp",
  "gnome2.webp",
  "gnome3.webp",
  "gnome4.webp",
  "gnome5.webp",
  "gnome6.webp",
];

export const getProducts = async (n: number = 30): Promise<Product[]> => {
  const products: Array<Product> = [];
  for (let i = 0; i < n; i++) {
    const product: Product = {
      id: i.toString(),
      description: randomString(40),
      extraImages: gnomes,
      img:
        "http://localhost:5000/assets/" +
        gnomes[randomBetween(0, gnomes.length - 1)],
      name: "מוצר" + " " + i,
      price: randomBetween(250, 600),
      storeAddress: randomString(14),
      category: "Gnome",
      quantity: randomBetween(0, 10),
    };
    products.push(product);
  }

  return delay(products);
};
