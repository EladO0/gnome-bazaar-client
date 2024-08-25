export const eventTypes = {
  UnAuthorized: "UnAuthorized",
  StartLoading: "StartLoading",
  FinishLoading: "FinishLoading",
  TokenExpired: "TokenExpired",
  NetWorkError: "NetWorkError",
};

export const statusCodes = {
  expiredToken: 403,
  UnAuthorized: 401,
  NetWorkError: "ERR_NETWORK",
};

export const BASENAME = "/Gnome-Bazaar";

export const MAX_PROMPT_TIMER = 5; //seconds
