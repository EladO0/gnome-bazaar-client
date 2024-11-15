import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  ContactSupport,
  History,
  Logout,
  Person,
  ShoppingCart,
  Storefront,
  Factory,
} from "@mui/icons-material";
import {
  NavigationRoute,
  NavigationRoutes,
} from "../../config/types/commonTypes";
import { resetToken } from "../../store/slices/authenticationSlice";
import { promptMessage } from "../../store/slices/promptSlice";
import "./Navigation.scss";
import { JWT } from "../../config/types/userTypes";

const routes: NavigationRoutes = [
  {
    url: "/Profile",
    title: "אזור אישי",
    hasAccess: () => true,
    Icon: <Person />,
  },
  {
    url: "/supplier-panel",
    title: "פאנל ספקים",
    Icon: <Factory />,
    hasAccess: (auth: JWT) => auth.isSupplier !== false,
  },
  {
    url: "/Market",
    title: "מוצרים",
    hasAccess: () => true,
    Icon: <Storefront />,
  },
  {
    url: "/user-purchases",
    title: "היסטוריית רכישות",
    hasAccess: () => true,
    Icon: <History />,
  },
  {
    url: "/About-us",
    title: "צרו קשר",
    hasAccess: () => true,
    Icon: <ContactSupport />,
  },
];

const Navigation = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((x) => x.auth);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (route: NavigationRoute) => {
    return location.pathname.toLowerCase().includes(route.url.toLowerCase())
      ? "selected"
      : undefined;
  };

  const logOut = () => {
    const msg = `${auth.name} להתראות`;
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
        {routes.map(
          (route, id) =>
            route.hasAccess(auth) && (
              <Link to={route.url} key={id}>
                <div className={`route ${isActive(route)}`}>
                  {route.Icon}
                  {route.title}
                </div>
              </Link>
            )
        )}
      </nav>
      <div className="logged-user">{auth.name}</div>
      <div className="log-out" onClick={logOut}>
        התנתקות
        <Logout />
      </div>
    </aside>
  );
};

export default Navigation;
