import apiService from "../../config/api/api-config";
import { DiagramData } from "../../config/types/graphTypes";
import { UserInfo } from "../../config/types/userTypes";

export const getAdminSalesInfp = async (): Promise<Array<DiagramData>> => {
  return await apiService.get("admin-sales-info");
};

export const updateUserRole = async (
  user: UserInfo
): Promise<Array<DiagramData>> => {
  return await apiService.post("update-user-role", user);
};

export const sendCreditsToUser = async (
  user: UserInfo
): Promise<Array<DiagramData>> => {
  return await apiService.post("send-user-credits", user);
};
