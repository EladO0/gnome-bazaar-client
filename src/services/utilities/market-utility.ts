import { Category } from "../../config/types/marketTypes";

export const translateCategory = (category: Category | string): string => {
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
