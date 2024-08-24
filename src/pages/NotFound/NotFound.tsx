import { useNavigate } from "react-router-dom";
import { Home, SearchOff } from "@mui/icons-material";
import Footer from "../../components/Footer/Footer";
import "./NotFound.scss";

const NotFound = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };
  return (
    <div className="not-found">
      <div className="navigation">
        <div className="wrong-url">
          הדף שחיפשת
          <div className="warning">לא</div>
          נמצא
          <SearchOff />
        </div>
        <div className="lost-visitor" onClick={goHome}>
          חזרה לחוף מבטחים
          <Home />
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default NotFound;
