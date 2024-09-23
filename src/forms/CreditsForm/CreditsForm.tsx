import { useState } from "react";
import { UserInfo } from "../../config/types/userTypes";
import { TaskAlt } from "@mui/icons-material";
import { useAppDispatch } from "../../store/hooks";
import { closePopup } from "../../store/slices/popupSlice";
import "./CreditsForm.scss";

interface CreditsProps {
  user: UserInfo;
  callback: (user: UserInfo, amount: number) => void;
}
const CreditsPopup: React.FC<CreditsProps> = ({ user, callback }) => {
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState(10);

  const update = () => {
    callback(user, amount);
    dispatch(closePopup());
  };

  const onAmountChange = (e) => {
    const newVal = parseInt(e.target.value);
    setAmount(newVal);
  };
  return (
    <div className="credits-form">
      <header>אנא הזן סכום להוספה:</header>

      <input type="number" value={amount} onChange={onAmountChange} />
      <div className="warning">
        בלחיצה על כפתור האישור, תוסיף {amount} קרדיטים למשתמש {user.userName} (
        {user.fullName})
      </div>
      <button onClick={update}>
        <TaskAlt />
        הוספת קרדיטים
      </button>
    </div>
  );
};
export default CreditsPopup;
