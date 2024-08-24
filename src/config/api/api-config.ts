import axios from "axios";
import { EventEmitter } from "events";
import { eventTypes, statusCodes } from "../constants";

const server = "http://localhost:5000/Gnome-Bazaar/api";

const apiService = axios.create({
  baseURL: server,
});

export const eventEmitter = new EventEmitter();
const emitUnAuthorized = () => {
  eventEmitter.emit(eventTypes.UnAuthorized);
};

const emitLoading = () => {
  eventEmitter.emit(eventTypes.StartLoading);
};

const emitFinishLoading = () => {
  eventEmitter.emit(eventTypes.FinishLoading);
};

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
    if (error.response && error.response.status === statusCodes.UnAuthorized) {
      emitUnAuthorized();
      return;
    }
    return Promise.reject(error);
  }
);

export default apiService;
