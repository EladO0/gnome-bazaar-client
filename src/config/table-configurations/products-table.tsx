import Light from "../../components/Flicker/Flicker";
import ImagePreview from "../../components/ImagePreview/ImagePreview";
import PriceTag from "../../components/PriceTag/PriceTag";
import { shorten } from "../../services/utilities/common-utility";
import { translateCategory } from "../../services/utilities/market-utility";
import { TableConfiguration } from "../types/commonTypes";
import { Product } from "../types/marketTypes";

export const createProductTableConfig = (): TableConfiguration => {
  return [
    {
      header: "",
      flex: 0.25,
      getter: () => <Light />,
    },
    {
      header: "תצוגה",
      flex: 1.25,
      getter: (product: Product) => <ImagePreview src={product.img} />,
    },
    {
      header: "שם מוצר",
      flex: 1,
      getter: (product: Product) => product.name,
    },
    {
      header: "תיאור",
      flex: 2,
      getter: (product: Product) => shorten(product.description, 50),
    },
    {
      header: "סוג",
      flex: 0.6,
      getter: (product: Product) => translateCategory(product.category),
    },
    {
      header: "מלאי",
      flex: 0.6,
      getter: (product: Product) => `x${product.quantity}`,
    },
    {
      header: "קרדיטים💰",
      flex: 1.5,
      getter: (product: Product) => <PriceTag credits={product.price} small />,
    },
  ];
};
