import apiService from "../../config/api/api-config";

const utilitiesRoute = 'utilities/';

export const getAddress = async (address: string): Promise<any> => {
  return await apiService.get(`${utilitiesRoute}get-address`, {params: {address}});
};