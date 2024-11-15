import { apiServiceSilent } from "../../config/api/api-config";

const commonRoute = "external-services/";

export const getWeather = async (): Promise<string> => {
  const response = await apiServiceSilent.get(`${commonRoute}get-weather`);
  return await response.data;
};
