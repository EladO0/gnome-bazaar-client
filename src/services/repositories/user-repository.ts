import apiService from "../../config/api/api-config";
import { DataPreviewType } from "../../config/types/commonTypes";
import { CartProduct, Purchase } from "../../config/types/marketTypes";
import { UserInfo } from "../../config/types/userTypes";

export const getUserProfile = async (userId): Promise<UserInfo> => {
  return await apiService.get(`user/user-profile/${userId}`);
};

export const getUserExpenses = async (userId): Promise<DataPreviewType> => {
  return await apiService.get(`user/user-expenses/${userId}`);
};

export const getUserCategories = async (userId): Promise<DataPreviewType> => {
  return await apiService.get(`user/user-categories/${userId}`);
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
  return await apiService.post(`user/update-user-profile/${user.id}`, user);
};
