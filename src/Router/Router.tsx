import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { promptMessage } from "../store/slices/promptSlice";
import { eventEmitter } from "../config/api/api-config";
import { BASENAME, eventTypes } from "../config/constants";
import Root from "../Root/Root";
import Loader from "../components/Loader/Loader";
import NotFound from "../pages/NotFound/NotFound";
import Unauthorized from "../pages/Unauthorized/Unauthorized";
import Popup from "../components/Popup/Popup";
import Profile from "../pages/Profile/Profile";
import Market from "../pages/Market/Market";
import Analysis from "../pages/Analysis/Analysis";
import AdminPanel from "../pages/AdminPanel/AdminPanel";
import Home from "../pages/Home/Home";
import UserHistory from "../pages/UserHistory/UserHistory";
import AboutUs from "../pages/AboutUs/AboutUs";
import Cart from "../pages/Cart/Cart";
import Prompt from "../components/Prompt/Prompt";
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
          path: "/history",
          element: <UserHistory />,
        },
        {
          path: "/shopping-cart",
          element: <Cart />,
        },
        {
          path: "/about-us",
          element: <AboutUs />,
        },
        {
          path: "/admin-panel",
          element: <AdminPanel />,
        },
      ],
    },
    {
      path: "/home",
      element: <Home />,
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
    dispatch(promptMessage({ message: "...השרת אינו זמין", type: "error" }));
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
      <Popup />
      <Prompt />
    </>
  );
};
export default Router;
