import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
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
import { promptMessage } from "../../store/slices/promptSlice";
import "./Navigation.scss";

const routes: navigationRoutes = [
  {
    url: "/Profile",
    title: "אזור אישי",
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
  const loggedUser = useAppSelector((x) => x.auth.name);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (route: navigationRoute) => {
    return location.pathname.includes(route.url) ? "selected" : undefined;
  };

  const logOut = () => {
    const msg = `${loggedUser} להתראות`;
    dispatch(promptMessage({ message: msg, type: "success" }));
    dispatch(resetToken());
    navigate("/login");
  };

  return (
    <aside className="navigation">
      <header className="logo">{/* LOGO */}</header>

      <Link to={"/shopping-cart"}>
        <button className="cart">
          עגלת הקניות
          <ShoppingCart />
        </button>
      </Link>
      <nav className="routes">
        {routes.map((route, id) => (
          <Link to={route.url} key={id}>
            <div className={`route ${isActive(route)}`}>
              {route.Icon}
              {route.title}
            </div>
          </Link>
        ))}
      </nav>
      <div className="log-out" onClick={logOut}>
        התנתקות
        <Logout />
      </div>
    </aside>
  );
};

export default Navigation;
