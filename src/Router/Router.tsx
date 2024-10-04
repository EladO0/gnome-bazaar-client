import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { promptMessage } from "../store/slices/promptSlice";
import { BASENAME, eventTypes } from "../config/constants";
import { eventEmitter } from "../services/utilities/events-utility";
import Root from "../Root/Root";
import Loader from "../components/Loader/Loader";
import NotFound from "../pages/NotFound/NotFound";
import Unauthorized from "../pages/Unauthorized/Unauthorized";
import Profile from "../pages/Profile/Profile";
import Market from "../pages/Market/Market";
import Analysis from "../pages/Analysis/Analysis";
import AdminPanel from "../pages/AdminPanel/AdminPanel";
import UserPurchases from "../pages/UserPurchases/UserPurchases";
import AboutUs from "../pages/AboutUs/AboutUs";
import UserCart from "../pages/UserCart/UserCart";
import Prompt from "../components/Prompt/Prompt";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import SupplierPanel from "../pages/SupplierPanel/SupplierPanel";
import "./Router.scss";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/Analysis",
          element: <Analysis />,
        },
        {
          path: "/Market",
          element: <Market />,
        },
        {
          path: "/Profile",
          element: <Profile />,
        },
        {
          path: "/user-purchases",
          element: <UserPurchases />,
        },
        {
          path: "/shopping-cart",
          element: <UserCart />,
        },
        {
          path: "/about-us",
          element: <AboutUs />,
        },
        {
          path: "/admin-panel",
          element: <AdminPanel />,
        },
        {
          path: "/supplier-panel",
          element: <SupplierPanel />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
      index: true,
    },
    {
      path: "/registration",
      element: <Registration />,
      index: true,
    },
    {
      path: "/401",
      element: <Unauthorized />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
  {
    basename: BASENAME,
  }
);

const Router = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const startSpinner = () => {
    setIsLoading(true);
  };
  const stopSpinner = () => {
    setIsLoading(false);
  };
  const promptNetworkError = useCallback(() => {
    dispatch(promptMessage({ message: "השרת אינו זמין", type: "error" }));
  }, [dispatch]);

  useEffect(() => {
    eventEmitter.on(eventTypes.StartLoading, startSpinner);
    eventEmitter.on(eventTypes.FinishLoading, stopSpinner);
    eventEmitter.on(eventTypes.NetWorkError, promptNetworkError);
    return () => {
      eventEmitter.removeListener(eventTypes.StartLoading, startSpinner);
      eventEmitter.removeListener(eventTypes.FinishLoading, stopSpinner);
      eventEmitter.removeListener(eventTypes.NetWorkError, promptNetworkError);
    };
  }, [promptNetworkError]);

  return (
    <>
      <RouterProvider router={router} />
      <Loader isLoading={isLoading} />
      <Prompt />
    </>
  );
};
export default Router;
