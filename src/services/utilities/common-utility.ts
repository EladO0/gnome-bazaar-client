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

export const delay = async <T>(data: T): Promise<T> => {
  emitLoading();
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
      emitFinishLoading();
    }, 500);
  });
};
