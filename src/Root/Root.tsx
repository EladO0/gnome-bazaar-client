import { useCallback, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { eventTypes } from "../config/constants";
import { eventEmitter } from "../config/api/api-config";
import { useAppSelector } from "../store/hooks";
import Navigation from "../components/Navigation/Navigation";
import Navbar from "../components/Navbar/Navbar";
import "./Root.scss";

const Root = () => {
  const navigate = useNavigate();
  const auth = useAppSelector((x) => x.auth);

  const unAuthorize = useCallback(() => {
    navigate("/401");
  }, [navigate]);

  useEffect(() => {
    eventEmitter.on(eventTypes.UnAuthorized, unAuthorize);
    return () => {
      eventEmitter.removeListener(eventTypes.UnAuthorized, unAuthorize);
    };
  }, [unAuthorize]);

  useEffect(() => {
    if (!auth.token) {
      unAuthorize();
    }
  }, [unAuthorize, auth]);
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
    </div>
  );
};
export default Root;
