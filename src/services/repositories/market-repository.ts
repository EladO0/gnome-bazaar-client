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
  "Beard1.webp",
  "Beard2.webp",
  "Beard3.webp",
  "Beard4.webp",
  "Beard5.webp",
  "Hat1.webp",
  "Hat2.webp",
  "Hat3.webp",
  "Hat4.webp",
  "Hat5.webp",
  "magicWand1.webp",
  "magicWand2.webp",
  "magicWand3.webp",
  "magicWand4.webp",
  "magicWand5.webp",
  "Pants1.webp",
  "Pants2.webp",
  "Pants3.webp",
  "Pants4.webp",
  "Pants5.webp",
  "Scarf1.webp",
  "Scarf2.webp",
  "Scarf3.webp",
  "Scarf4.webp",
  "Scarf5.webp",
  "Shirt1.webp",
  "Shirt2.webp",
  "Shirt3.webp",
  "Shirt4.webp",
  "Shirt5.webp",
  "Shoes1.webp",
  "Shoes2.webp",
  "Shoes3.webp",
  "Shoes4.webp",
  "Shoes5.webp"
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
