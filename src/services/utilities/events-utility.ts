import { EventEmitter } from "events";
import { eventTypes } from "../../config/constants";

export const eventEmitter = new EventEmitter();

export const emitUnAuthorized = () => {
  console.log("unauthorized user");
  eventEmitter.emit(eventTypes.UnAuthorized);
};

export const emitExpired = () => {
  console.log("token has Expired");
  eventEmitter.emit(eventTypes.TokenExpired);
};

export const emitNetWorkError = () => {
  console.log("Network Error");
  eventEmitter.emit(eventTypes.NetWorkError);
};

export const emitLoading = () => {
  eventEmitter.emit(eventTypes.StartLoading);
};

export const emitFinishLoading = () => {
  eventEmitter.emit(eventTypes.FinishLoading);
};
