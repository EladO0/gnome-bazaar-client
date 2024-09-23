import { Category } from "../../config/types/marketTypes";
import { Role } from "../../config/types/userTypes";
import { emitFinishLoading, emitLoading } from "./events-utility";

export const randomBetween = (a: number, b: number): number => {
  return Math.floor(Math.random() * (b - a + 1)) + a;
};

export const randomString = (n: number): string => {
  const characters =
    " ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < n; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};

export const randomRole = (): Role => {
  const options: Role[] = ["Admin", "Supplier", "User"];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
};

export const randomCategory = (): Category => {
  const options: Category[] = [
    "Accessories",
    "Gnome",
    "Hat",
    "Pants",
    "Shirt",
    "Shoes",
  ];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
};

export const randomDate = (): Date => {
  const date = randomBetween(1, 28);
  const month = randomBetween(0, 11);
  const year = randomBetween(2018, 2024);
  return new Date(year, month, date);
};

export const delay = async <T>(
  data: T,
  hasDelay: boolean = true
): Promise<T> => {
  emitLoading();
  const timer = hasDelay ? 500 : 0;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
      emitFinishLoading();
    }, timer);
  });
};

export const shorten = (text: string, max: number = 40): string => {
  if (text.length <= max) return text;
  return text.slice(0, max) + "...";
};
