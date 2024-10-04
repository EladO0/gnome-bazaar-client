import apiService from "../../config/api/api-config";
import { DataPreviewType } from "../../config/types/commonTypes";
import { CartProduct, Purchase } from "../../config/types/marketTypes";
import { UserInfo } from "../../config/types/userTypes";

export const getUserProfile = async (): Promise<UserInfo> => {
  return await apiService.get(`user/user-profile`);
};

export const getUserExpenses = async (): Promise<DataPreviewType> => {
  return await apiService.get(`user/user-expenses`);
};

export const getUserCategories = async (): Promise<DataPreviewType> => {
  return await apiService.get(`user/user-categories`);
};

export const getCartProducts = async (): Promise<Array<CartProduct>> => {
  return await apiService.get("user/cart-products");
};

export const getUserPurchases = async (): Promise<Array<Purchase>> => {
  return await apiService.get("user/user-purchases");
};

export const userRegistration = async (user: UserInfo): Promise<void> => {
  return await apiService.post("user/register", user);
};

export const updateUserProfile = async (user: UserInfo): Promise<void> => {
  return await apiService.post(`user/update-user-profile`, user);
};
