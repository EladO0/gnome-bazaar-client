import { gnomes } from "../../config/constants";
import { DataPreviewType } from "../../config/types/commonTypes";
import { CartProduct, Product, Purchase } from "../../config/types/marketTypes";
import { UserInfo } from "../../config/types/userTypes";
import {
  delay,
  randomBetween,
  randomDate,
  randomString,
} from "../utilities/common-utility";

export const getUserProfile = (uuid: string): Promise<UserInfo> => {
  const user = {
    id: uuid,
    userName: "admin",
    pwd: "",
    fullName: "shir hirsh",
    mail: "shirhirsh510@gmail.com",
    phone: "0503403413",
    credits: 830,
    role: undefined,
  };
  return delay(user);
};

export const getUserExpenses = (uuid: string): Promise<DataPreviewType> => {
  console.log(uuid);

  const data = [
    {
      title: "שיר 1",
      total: 100,
      value: 23,
    },
    {
      title: "שיר 2",
      total: 100,
      value: 78,
    },
    {
      title: "שיר 3",
      total: 100,
      value: 92,
    },
  ];
  return delay(data);
};

export const getUserCategories = (uuid: string): Promise<DataPreviewType> => {
  console.log(uuid);

  const data = [
    {
      title: "אלעד",
      total: 100,
      value: 54,
    },
    {
      title: "תמיד",
      total: 100,
      value: 54,
    },
    {
      title: "מאחר",
      total: 100,
      value: 54,
    },
    {
      title: "ואוהב",
      total: 100,
      value: 54,
    },
    {
      title: "לשקר",
      total: 100,
      value: 30,
    },
    {
      title: "שלא",
      total: 100,
      value: 70,
    },
  ];

  return delay(data);
};

export const getCartProducts = (
  uuid: string,
  n: number = 15,
  hasDelay: boolean = true
): Promise<Array<CartProduct>> => {
  const products: Array<CartProduct> = [];
  for (let i = 0; i < n; i++) {
    const product: Product = {
      id: uuid + i.toString(),
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
    const cartProduct: CartProduct = {
      product: product,
      quantity: 1,
    };
    products.push(cartProduct);
  }

  return delay(products, hasDelay);
};

export const getUserPurchases = async (
  uuid: string,
  n: number = 7
): Promise<Array<Purchase>> => {
  const purchases: Array<Purchase> = [];
  for (let i = 0; i < n; i++) {
    const products = await getCartProducts(uuid, 6, false);
    const purchase: Purchase = {
      products: products,
      uuid: uuid + randomString(40),
      date: randomDate(),
    };
    purchases.push(purchase);
  }

  return delay(purchases);
};
