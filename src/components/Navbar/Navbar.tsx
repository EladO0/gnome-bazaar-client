import { ManageAccounts, Search } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateSearchValue } from "../../store/slices/filtersSlice";
import "./Navbar.scss";
import Weather from "../Weather/Weather";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((x) => x.search.searchTerm);

  const auth = useAppSelector((x) => x.auth);

  const onSearchChange = (e): void => {
    const newVal = e.target.value;
    dispatch(updateSearchValue(newVal));
  };

  return (
    <section className="navbar">
      <div className="icons-container">
        {auth.isAdmin && (
          <Link to={"/admin-panel"}>
            <div className="admin-panel">
              <ManageAccounts />
              פאנל מנהלים
            </div>
          </Link>
        )}
      </div>
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={onSearchChange}
          className="search"
          placeholder="חיפוש..."
        />
        <Search className="magnifying-glass" />
        <Weather />
      </div>
    </section>
  );
};
export default Navbar;
