import { Warning } from "@mui/icons-material";
import { useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import "./Unauthorized.scss";

const Unauthorized = () => {
  useEffect(() => {
    console.log("unauthorized page");
  }, []);
  return (
    <div className="unauthorized">
      <div className="prompt-container">
        <div className="prompt">
          <Warning />
          <div className="title">אין ברשותך הרשאה לגשת לדף זה</div>
        </div>
        <div className="sub-title">במקרה של טעות אנה צרו קשר</div>
      </div>
      <Footer />
    </div>
  );
};
export default Unauthorized;
