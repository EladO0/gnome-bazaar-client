import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import {
  BarChart,
  ContactSupport,
  History,
  Logout,
  Person,
  ShoppingCart,
  Storefront,
} from "@mui/icons-material";
import {
  navigationRoute,
  navigationRoutes,
} from "../../config/types/commonTypes";
import { resetToken } from "../../store/slices/authenticationSlice";
import "./Navigation.scss";

const routes: navigationRoutes = [
  {
    url: "/Profile",
    title: "פרופיל",
    Icon: <Person />,
  },
  {
    url: "/Market",
    title: "מוצרים",
    Icon: <Storefront />,
  },
  {
    url: "/Analysis",
    title: "סקירה ונתונים",
    Icon: <BarChart />,
  },
  {
    url: "/history",
    title: "היסטוריית רכישות",
    Icon: <History />,
  },
  {
    url: "/About-us",
    title: "צרו קשר",
    Icon: <ContactSupport />,
  },
];

const Navigation = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (route: navigationRoute) => {
    return location.pathname.includes(route.url) ? "selected" : undefined;
  };

  const goHome = () => {
    navigate("/home");
  };

  const logOut = () => {
    dispatch(resetToken());
    navigate("/home");
  };

  return (
    <div className="navigation">
      <div className="logo" onClick={goHome}>
        LOGO
      </div>

      <Link to={"/shopping-cart"}>
        <button className="cart">
          עגלת הקניות
          <ShoppingCart />
        </button>
      </Link>
      <div className="routes">
        {routes.map((route, id) => (
          <Link to={route.url} key={id}>
            <div className={`route ${isActive(route)}`}>
              {route.Icon}
              {route.title}
            </div>
          </Link>
        ))}
      </div>
      <div className="log-out" onClick={logOut}>
        התנתקות
        <Logout />
      </div>
    </div>
  );
};

export default Navigation;
