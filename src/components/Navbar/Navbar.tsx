import { Search, Settings } from "@mui/icons-material";
import "./Navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="icons-container">
        <Link to={"/admin-panel"}>
          <Settings />
        </Link>
      </div>
      <div className="search-container">
        <input type="text" className="search" placeholder="חיפוש..." />
        <Search className="magnifying-glass" />
      </div>
    </div>
  );
};
export default Navbar;
