import apiService from "../../config/api/api-config";
import { Credentials, JWT } from "../../config/types/userTypes";

export const getAuthToken = async (credentials: Credentials): Promise<JWT> => {
  console.log(`[${new Date().toLocaleString()}] Requesting Token...`);

  const res: JWT = await apiService.post("token", credentials);

  console.log(res);
  return res;
};
