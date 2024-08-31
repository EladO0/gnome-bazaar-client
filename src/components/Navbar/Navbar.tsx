import { Search, Settings } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <section className="navbar">
      <div className="icons-container">
        <Link to={"/admin-panel"}>
          <Settings />
        </Link>
      </div>
      <div className="search-container">
        <input type="text" className="search" placeholder="חיפוש..." />
        <Search className="magnifying-glass" />
      </div>
    </section>
  );
};
export default Navbar;
