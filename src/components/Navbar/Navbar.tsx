import { ManageAccounts, Search } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import "./Navbar.scss";

const Navbar = () => {
  const auth = useAppSelector(x => x.auth);
  return (
    <section className="navbar">
      <div className="icons-container">
        {
          auth.isAdmin &&
          <Link to={"/admin-panel"}>
            <div className="admin-panel">
              <ManageAccounts />
              פאנל מנהלים
            </div>
          </Link>
        }
      </div>
      <div className="search-container">
        <input type="text" className="search" placeholder="חיפוש..." />
        <Search className="magnifying-glass" />
      </div>
    </section>
  );
};
export default Navbar;
