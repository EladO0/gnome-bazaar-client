import { Category } from "./types/marketTypes";

export const eventTypes = {
  UnAuthorized: "UnAuthorized",
  StartLoading: "StartLoading",
  FinishLoading: "FinishLoading",
  TokenExpired: "TokenExpired",
  NetWorkError: "NetWorkError",
};

export const statusCodes = {
  expiredToken: 403,
  UnAuthorized: 401,
  NetWorkError: "ERR_NETWORK",
};

export const BASENAME = "/Gnome-Bazaar";

export const MAX_PROMPT_TIMER = 5; //seconds
export const ENTRIES_PER_PAGE = 4 * 3;
export const WEATHER_POOLING = 10 * 1000;
export const categories: Array<Category> = [
  "Accessories",
  "Gnome",
  "Hat",
  "Pants",
  "Shirt",
  "Shoes",
];

export const gnomes = [
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
  "Shoes5.webp",
  "acc1.jpeg",
  "acc2.jpeg",
  "acc3.jpeg",
  "acc4.jpeg",
  "acc5.jpeg",
  "acc6.jpeg",
  "acc7.jpeg",
  "acc8.jpeg",
];
