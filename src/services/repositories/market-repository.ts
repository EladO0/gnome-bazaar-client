import { FiltersType } from "../../config/types/commonTypes";
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
  "gnome7.webp",
  "gnome8.webp",
  "gnome9.webp",
  "gnome10.webp",
];

export const getProducts = async (
  filters: FiltersType,
  n: number = 30,
  entriesToSkip: number = 0
): Promise<Product[]> => {
  console.log(filters, entriesToSkip);

  const products: Array<Product> = [];
  for (let i = 0; i < n; i++) {
    const product: Product = {
      id: i.toString(),
      description: randomString(40),
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
