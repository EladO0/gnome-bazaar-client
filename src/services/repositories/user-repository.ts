import apiService from "../../config/api/api-config";
import { DataPreviewType } from "../../config/types/commonTypes";
import { CartProduct, Purchase, Product } from "../../config/types/marketTypes";
import { UserInfo } from "../../config/types/userTypes";

const userRoute = 'user/';

export const getAllUsers = async (): Promise<Array<UserInfo>> => {
  return await apiService.get(`${userRoute}users`);
};

export const getUserProfile = async (): Promise<UserInfo> => {
  return await apiService.get(`${userRoute}user-profile`);
};

export const getUserExpenses = async (): Promise<DataPreviewType> => {
  return await apiService.get(`${userRoute}user-expenses`);
};

export const getUserCategories = async (): Promise<DataPreviewType> => {
  return await apiService.get(`${userRoute}user-categories`);
};

export const getCartProducts = async (): Promise<Array<CartProduct>> => {
  return await apiService.get(`${userRoute}cart-products`);
};

export const getUserPurchases = async (): Promise<Array<Purchase>> => {
  return await apiService.get(`${userRoute}user-purchases`);
};

export const userSubmitPurchase = async (): Promise<Array<void>> => {
  return await apiService.post(`${userRoute}submit-purchase`);
};

export const userRegistration = async (user: UserInfo): Promise<void> => {
  return await apiService.post(`${userRoute}register`, user);
};

export const updateUserProfile = async (user: UserInfo): Promise<void> => {
  return await apiService.post(`${userRoute}update-user-profile`, user);
};

export const addToUserCart = async (product: Product): Promise<void> => {
  return await apiService.post(`${userRoute}add-to-cart`, product);
};

export const removeFromCart = async (product: Product): Promise<void> => {
  return await apiService.post(`${userRoute}remove-from-cart`, product);
};