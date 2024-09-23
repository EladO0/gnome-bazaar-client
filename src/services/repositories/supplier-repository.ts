import apiService from "../../config/api/api-config";
import { DiagramData, PieChartData } from "../../config/types/graphTypes";
import { Product } from "../../config/types/marketTypes";

export const getSupplierProducts = async (): Promise<Product[]> => {
  return await apiService.get("supplier-products");
};

export const getCategorySalesInfo = async (): Promise<PieChartData[]> => {
  return await apiService.get("supplier-category-sales-info");
};

export const getSupplierSalesInfo = async (): Promise<DiagramData[]> => {
return await apiService.get("supplier-sales-info");
};
