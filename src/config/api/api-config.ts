import axios from "axios";
import { statusCodes } from "../constants";
import {
  emitExpired,
  emitFinishLoading,
  emitLoading,
  emitNetWorkError,
  emitUnAuthorized,
} from "../../services/utilities/events-utility";

export const environment = import.meta.env.VITE_SERVER;
const server = environment + "/Gnome-Bazaar/api";

const apiService = axios.create({
  baseURL: server,
});

apiService.interceptors.request.use(async (config) => {
  //   const token = await localStorage.getItem(JWT)
  //   if(token){
  //     config.headers.Authorization = `Bearer ${token}`;
  //   }
  emitLoading();
  return config;
});

apiService.interceptors.response.use(
  async (response) => {
    emitFinishLoading();
    return response.data;
  },
  async (error) => {
    emitFinishLoading();
    if (error.code === statusCodes.NetWorkError) {
      emitNetWorkError();
    }
    if (error?.response?.status === statusCodes.expiredToken) {
      emitExpired();
      return;
    }
    if (error?.response?.status === statusCodes.UnAuthorized) {
      emitUnAuthorized();
      return;
    }
    return Promise.reject(error);
  }
);

export default apiService;
