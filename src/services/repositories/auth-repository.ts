import apiService from "../../config/api/api-config";
import { JWT } from "../../config/types/userTypes";

export const getAuthToken = async (): Promise<JWT> => {
  console.log(`[${new Date().toLocaleString()}] Requesting Token...`);
  const res: JWT = await apiService.get("token");
  console.log(res);
  return res;
};
