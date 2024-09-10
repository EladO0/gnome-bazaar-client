import { Category } from "../../config/types/marketTypes";

export const translateCategory = (category: Category): string => {
  switch (category) {
    case "Gnome":
      return "גמד";
    case "Hat":
      return "כובע";
    case "Shirt":
      return "חולצה";
    case "Shoes":
      return "נעליים";
    case "Accessories":
      return "אביזרים";
    default:
      return "";
  }
};

export const shorten = (text: string, max: number = 40): string => {
  if (text.length <= max) return text;
  return text.slice(0, max) + "...";
};
