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

export const createSupplierProduct = async (
  product: Product
): Promise<DiagramData[]> => {
  return await apiService.post(`products`, product);
};

export const publishSupplierProduct = async (
  product: Product
): Promise<DiagramData[]> => {
  return await apiService.post(`publish-product`, product);
};

export const updateSupplierProduct = async (
  product: Product
): Promise<DiagramData[]> => {
  return await apiService.put(`products`, product);
};

export const deleteSupplierProduct = async (
  id: string
): Promise<DiagramData[]> => {
  return await apiService.delete(`products?id=${id}`);
};
