import apiService from "../../config/api/api-config";
import { DiagramData, PieChartData } from "../../config/types/graphTypes";
import { Product } from "../../config/types/marketTypes";
import {Branch} from "../../config/types/locationTypes.ts";

const supplierRoute = 'supplier/';

export const getSupplierProducts = async (): Promise<Product[]> => {
  return await apiService.get(`${supplierRoute}supplier-products`);
};

export const getCategorySalesInfo = async (): Promise<PieChartData[]> => {
  return await apiService.get(`${supplierRoute}supplier-category-sales-info`);
};

export const getSupplierSalesInfo = async (): Promise<DiagramData[]> => {
  return await apiService.get(`${supplierRoute}supplier-sales-info`);
};

export const createSupplierProduct = async (
  product: Product
): Promise<DiagramData[]> => {
  return await apiService.post(`products`, product);
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

export const getSuppliersLocations = async (): Promise<Branch[]> => {
  return await apiService.get(`${supplierRoute}supplier-locations`);
}