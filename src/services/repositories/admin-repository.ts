import apiService from "../../config/api/api-config";
import { DiagramData } from "../../config/types/graphTypes";
import { UserCreditForm, UserInfo } from "../../config/types/userTypes";

const adminRoute = "admin/";

export const getAllUsers = async (): Promise<Array<UserInfo>> => {
  return await apiService.get(`${adminRoute}users`);
};

export const getAdminSalesInfp = async (): Promise<Array<DiagramData>> => {
  return await apiService.get(`${adminRoute}admin-sales-info`);
};

export const updateUserRole = async (
  user: UserInfo, newRole: string
): Promise<Array<DiagramData>> => {
  return await apiService.post(`${adminRoute}update-user-role`, {user, newRole});
};

export const sendCreditsToUser = async (
  user: UserCreditForm
): Promise<Array<DiagramData>> => {
  return await apiService.post(`${adminRoute}send-user-credits`, user);
};
