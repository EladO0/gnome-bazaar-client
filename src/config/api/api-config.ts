import axios from "axios";
import { statusCodes } from "../constants";
import {
  emitExpired,
  emitFinishLoading,
  emitLoading,
  emitNetWorkError,
  emitUnAuthorized,
} from "../../services/utilities/events-utility";
import { JWT } from "../types/userTypes";

export const environment = import.meta.env.VITE_SERVER;
export const server = environment + "/Gnome-Bazaar/api";

export const loadStorageToken = (): JWT | false => {
  const expiry = localStorage.getItem("expiry") as string;
  const isAdmin = localStorage.getItem("isAdmin") as string;
  const isSupplier = localStorage.getItem("isSupplier") as string;
  const name = localStorage.getItem("name") as string;
  const uuid = localStorage.getItem("uuid") as string;
  const token = localStorage.getItem("token") as string;
  if (expiry && isAdmin && isSupplier && name && uuid && token) {
    return {
      expiry: new Date(expiry),
      isAdmin: isAdmin == "true",
      isSupplier: isSupplier == "true",
      name: name,
      token: token,
      uuid: uuid,
    };
  }
  return false;
};

const apiService = axios.create({
  baseURL: server,
});

apiService.interceptors.request.use(async (config) => {
  const token = await localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
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

//region silent api service
export const apiServiceSilent = axios.create({
  baseURL: server,
});

apiServiceSilent.interceptors.request.use(async (config) => {
  const token = await localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
//#endregion
export default apiService;
