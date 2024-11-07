import { environment } from "../../config/api/api-config";

const commonRoute = "/";

const server = environment + "/Gnome-Bazaar/api";
export const getWeather = async (): Promise<string> => {
  const response = await fetch(`${server}${commonRoute}weather`);
  return await response.json();
};
