import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "../Root/Root";
import Loader from "../components/Loader/Loader";
import NotFound from "../pages/NotFound/NotFound";
import "./Router.scss";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      children: [],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
  {
    basename: "/Gnome-Bazaar",
  }
);

const Router = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Loader />
    </>
  );
};
export default Router;
