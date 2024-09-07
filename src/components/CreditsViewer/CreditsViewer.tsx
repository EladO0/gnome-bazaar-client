import { AddCircle } from "@mui/icons-material";
import "./CreditsViewer.scss";

interface Credits {
  amount: number;
  popupCallback: () => void;
}
const CreditsViewer: React.FC<Credits> = ({ amount, popupCallback }) => {
  return (
    <div className="credits-viewer">
      {amount}
      <AddCircle onClick={popupCallback} />
    </div>
  );
};
export default CreditsViewer;
