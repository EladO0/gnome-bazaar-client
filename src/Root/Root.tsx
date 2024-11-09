import { useCallback, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { eventTypes } from "../config/constants";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { eventEmitter } from "../services/utilities/events-utility";
import { calcTimeToLive } from "../services/utilities/date-utility";
import { resetToken } from "../store/slices/authenticationSlice";
import { promptMessage } from "../store/slices/promptSlice";
import Navigation from "../components/Navigation/Navigation";
import Navbar from "../components/Navbar/Navbar";
import Popup from "../components/Popup/Popup";
import "./Root.scss";

const Root = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((x) => x.auth);

  const requireLogin = useCallback(() => {
    dispatch(resetToken());
    navigate("/login");
  }, [navigate, dispatch]);

  useEffect(() => {
    const ttl = calcTimeToLive(auth.expiry);
    if (ttl > 0)
      setTimeout(() => {
        requireLogin();
        const msg = "משתמש זה מחובר זמן רב, אנא התחברו מחדש";
        dispatch(promptMessage({ message: msg, type: "error" }));
      }, ttl);
  }, [dispatch, requireLogin, auth]);

  const unAuthorize = useCallback(() => {
    navigate("/401");
  }, [navigate]);

  useEffect(() => {
    eventEmitter.on(eventTypes.UnAuthorized, unAuthorize);
    eventEmitter.on(eventTypes.TokenExpired, requireLogin);
    eventEmitter.on(eventTypes.NetWorkError, requireLogin);
    return () => {
      eventEmitter.removeListener(eventTypes.UnAuthorized, unAuthorize);
      eventEmitter.removeListener(eventTypes.TokenExpired, requireLogin);
    };
  }, [unAuthorize, requireLogin]);

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/login");
    }
  }, [location, navigate, auth]);

  return (
    <div className="root">
      <div className="navigation-container">
        <div className="navigation-frame">
          <Navigation />
        </div>
      </div>
      <div className="left-side">
        <div className="top-container">
          <Navbar />
        </div>
        <div className="outlet-container">
          <Outlet />
        </div>
      </div>
      <Popup />
    </div>
  );
};
export default Root;
