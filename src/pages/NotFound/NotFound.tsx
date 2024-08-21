import { useNavigate } from "react-router-dom";
import { SearchOff } from "@mui/icons-material";
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
          <SearchOff />
          <div className="warning">לא נמצא</div>
          הדף שחיפשת
        </div>
        <div className="lost-visitor" onClick={goHome}>
          חזרה למקום מבטחים
        </div>
      </div>
      <Footer/>
    </div>
  );
};
export default NotFound;
