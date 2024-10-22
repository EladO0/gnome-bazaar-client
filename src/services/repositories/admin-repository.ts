import apiService from "../../config/api/api-config";
import { DiagramData } from "../../config/types/graphTypes";
import { UserInfo } from "../../config/types/userTypes";

const adminRoute = 'admin/'

export const getAllUsers = async (): Promise<Array<UserInfo>> => {
  return await apiService.get(`${adminRoute}users`);
};

export const getAdminSalesInfp = async (): Promise<Array<DiagramData>> => {
  return await apiService.get(`${adminRoute}admin-sales-info`);
};

export const updateUserRole = async (
  user: UserInfo
): Promise<Array<DiagramData>> => {
  return await apiService.post(`${adminRoute}update-user-role`, user);
};

export const sendCreditsToUser = async (
  user: UserInfo
): Promise<Array<DiagramData>> => {
  return await apiService.post(`${adminRoute}send-user-credits`, user);
};
