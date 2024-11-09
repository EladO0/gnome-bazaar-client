import apiService from "../../config/api/api-config";
import {Category, MarketFiltersType, Product} from "../../config/types/marketTypes";

export const getProducts = async (
  filters: MarketFiltersType,
  take: number,
  entriesToSkip: number = 0
): Promise<Product[]> => {
  return await apiService.get("products", {
    params: {
      productName: filters.productName,
      category: filters.category,
      skip: entriesToSkip,
      take: take,
      minPrice: filters.min,
      maxPrice: filters.max,
    },
  });
};

export const getCategories = async (): Promise<Category[]> => {
  return await apiService.get("categories");
}