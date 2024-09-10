import { Category } from "../../config/types/marketTypes";

export const translateCategory = (category: Category): string => {
  switch (category) {
    case "Gnome":
      return "גמדים";
    case "Hat":
      return "כובעים";
    case "Shirt":
      return "חולצות";
    case "Shoes":
      return "נעליים";
    case "Pants":
      return "מכנסיים";
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
