import { AccountCircle, Receipt, TaskAlt } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  validateFullName,
  validateMail,
  validatePhone,
  validateRegistrationForm,
  validateUser,
} from "../../services/utilities/form-utility";
import DataPreview from "../../components/DataPreview/DataPreview";
import { DataPreviewType } from "../../config/types/commonTypes";
import {
  getUserCategories,
  getUserExpenses,
  getUserProfile,
  updateUserProfile,
} from "../../services/repositories/user-repository";
import { UserInfo } from "../../config/types/userTypes";
import { promptMessage } from "../../store/slices/promptSlice";
import PriceTag from "../../components/PriceTag/PriceTag";
import "./Profile.scss";

const Profile = () => {
  const dispatch = useAppDispatch();
  const uuid = useAppSelector((x) => x.auth.uuid);
  const [profileInfo, setProfileInfo] = useState<UserInfo>({
    id: "",
    userName: "",
    pwd: "",
    fullName: "",
    mail: "",
    phone: "",
    credits: 0,
    role: undefined,
  });

  const [categoriesData, setCategoriesData] = useState<DataPreviewType>([]);
  const [expensesData, setExpensesData] = useState<DataPreviewType>([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      const userResult = await getUserProfile();
      setProfileInfo(userResult);

      const expensesResult = await getUserExpenses();
      setExpensesData(Array.isArray(expensesResult) ? expensesResult : []);

      const categoriesResult = await getUserCategories();
      setCategoriesData(Array.isArray(categoriesResult) ? categoriesResult : []);
    };
    fetchProfileData();
  }, []);

  const onUserChange = (e) => {
    const newVal = e.target.value;
    if (!validateUser(newVal)) return;

    setProfileInfo((x) => {
      const newCredentialsState = { ...x };
      newCredentialsState.userName = newVal;
      return newCredentialsState;
    });
  };

  const onFullNameChange = (e) => {
    const newVal = e.target.value;
    if (!validateFullName(newVal)) return;

    setProfileInfo((x) => {
      const newCredentialsState = { ...x };
      newCredentialsState.fullName = newVal;
      return newCredentialsState;
    });
  };

  const onMailChange = (e) => {
    const newVal = e.target.value;
    if (!validateMail(newVal)) return;

    setProfileInfo((x) => {
      const newCredentialsState = { ...x };
      newCredentialsState.mail = newVal;
      return newCredentialsState;
    });
  };

  const onPhoneChange = (e) => {
    const newVal = e.target.value;
    const isNumeric =
      newVal.length === 0 ||
      ("0" <= newVal.slice(-1) && newVal.slice(-1) <= "9");
    if (!validatePhone(newVal) || !isNumeric) return;

    setProfileInfo((x) => {
      const newCredentialsState = { ...x };
      newCredentialsState.phone = newVal;
      return newCredentialsState;
    });
  };

  const saveChanges = async () => {
    const data = {
      uuid: uuid,
      ...profileInfo,
    };
    
    if (!validateRegistrationForm(data, true)) {
      dispatch(promptMessage({ message: "!הקלט לא עובר ולידציה", type: "error" }));
      return;
    }

    try {
      await updateUserProfile(data);
      dispatch(
        promptMessage({ message: "פרטים עודכנו בהצלחה", type: "success" })
      );
    } catch {
      dispatch(
        promptMessage({ message: "הייתה בעיה בעדכון הפרטים", type: "error" })
      );
    }

    return data;
  };
  return (
    <div className="profile">
      <div className="user-section">
        <div className="user">
          <AccountCircle className="profile-icon" />
          <div className="title">{profileInfo.userName}</div>
        </div>
        <PriceTag
          credits={profileInfo.credits}
          title="💰 הקרדיטים שלי"
          description=" ניתן לממש את הקרדיטים בעת רכישת גמדים/מוצרי גמדים"
        />
      </div>
      <div className="information">
        <div className="entry" id="fullName">
          <input
            type="text"
            autoFocus
            value={profileInfo.userName}
            onChange={onUserChange}
          />
          <header>שם משתמש</header>
        </div>
        <div className="entry" id="fullName">
          <input
            type="text"
            value={profileInfo.fullName}
            onChange={onFullNameChange}
          />
          <header>שם מלא</header>
        </div>
        <div className="entry" id="fullName">
          <input type="text" value={profileInfo.mail} onChange={onMailChange} />
          <header>כתובת מייל</header>
        </div>
        <div className="entry" id="fullName">
          <input
            type="text"
            value={profileInfo.phone}
            onChange={onPhoneChange}
          />
          <header>מספר טלפון</header>
        </div>
        <button className="edit-btn" onClick={saveChanges}>
          <TaskAlt />
          שמירה
        </button>
      </div>
      <DataPreview title="הוצאות" data={expensesData} Icon={Receipt} />
      <DataPreview title="הקטגוריות המועדפות" data={categoriesData} />
    </div>
  );
};
export default Profile;
