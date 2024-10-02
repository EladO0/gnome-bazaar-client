import { Link, useNavigate } from "react-router-dom";
import {
  AccountCircle,
  AlternateEmail,
  LockOutlined,
  PersonOutline,
  Phone,
} from "@mui/icons-material";
import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { UserInfo } from "../../config/types/userTypes";
import { promptMessage } from "../../store/slices/promptSlice";
import "./Registration.scss";
import {
  validateFullName,
  validateMail,
  validateUser,
  validatePhone,
  validatePWD,
  validateRegistrationForm,
} from "../../services/utilities/form-utility";
import { userRegistration } from "../../services/repositories/user-repository";

const initialUserInfo: UserInfo = {
  id: "",
  userName: "admin",
  pwd: "Aa123456!",
  fullName: "shir hirsh",
  mail: "shirhirsh510@gmail.com",
  phone: "0503403413",
  credits: 0,
  role: "Admin",
};

const Registration = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [registrationData, setUserInfo] = useState(initialUserInfo);

  const register = async (e) => {
    e.preventDefault();
    if (!validateRegistrationForm(registrationData)) return;

    try {
      await userRegistration(registrationData);

      const msg = "יצירת חשבון בוצעה בהצלחה";
      dispatch(promptMessage({ message: msg, type: "success" }));
      navigate(`/login`);
    } catch {
      const msg = "הייתה בעיה ביצירת החשבון";
      dispatch(promptMessage({ message: msg, type: "error" }));
      setUserInfo(initialUserInfo);
    }
  };

  const onPasswordChange = (e) => {
    const newVal = e.target.value;
    if (!validatePWD(newVal)) return;

    setUserInfo((x) => {
      const newCredentialsState = { ...x };
      newCredentialsState.pwd = newVal;
      return newCredentialsState;
    });
  };

  const onUserChange = (e) => {
    const newVal = e.target.value;
    if (!validateUser(newVal)) return;

    setUserInfo((x) => {
      const newCredentialsState = { ...x };
      newCredentialsState.userName = newVal;
      return newCredentialsState;
    });
  };

  const onFullNameChange = (e) => {
    const newVal = e.target.value;
    if (!validateFullName(newVal)) return;

    setUserInfo((x) => {
      const newCredentialsState = { ...x };
      newCredentialsState.fullName = newVal;
      return newCredentialsState;
    });
  };

  const onMailChange = (e) => {
    const newVal = e.target.value;
    if (!validateMail(newVal)) return;

    setUserInfo((x) => {
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

    setUserInfo((x) => {
      const newCredentialsState = { ...x };
      newCredentialsState.phone = newVal;
      return newCredentialsState;
    });
  };

  return (
    <div className="registration-page">
      <form className="registration-form" onSubmit={register}>
        <header className="title">הרשמה</header>

        <div className="input-container">
          <label htmlFor="fullName">שם מלא:</label>
          <div className="field-container" id="fullName">
            <AccountCircle />
            <input
              autoFocus
              value={registrationData.fullName}
              onChange={onFullNameChange}
              name="fullName"
              type="text"
              placeholder="הזן שם מלא"
            />
          </div>
        </div>
        <div className="input-container">
          <label htmlFor="username">שם משתמש:</label>
          <div className="field-container" id="user">
            <PersonOutline />
            <input
              value={registrationData.userName}
              onChange={onUserChange}
              name="username"
              type="text"
              placeholder="הזן שם משתמש"
            />
          </div>
        </div>

        <div className="input-container">
          <label htmlFor="password">סיסמא:</label>
          <div className="field-container" id="password">
            <LockOutlined />
            <input
              value={registrationData.pwd}
              onChange={onPasswordChange}
              name="password"
              type="password"
              placeholder="הזן סיסמא"
            />
          </div>
        </div>

        <div className="input-container">
          <label htmlFor="mail">מייל:</label>
          <div className="field-container" id="mail">
            <AlternateEmail />
            <input
              value={registrationData.mail}
              onChange={onMailChange}
              name="mail"
              type="text"
              placeholder="הזן מייל"
            />
          </div>
        </div>

        <div className="input-container">
          <label htmlFor="phone">טלפון נייד:</label>
          <div className="field-container" id="phone">
            <Phone />
            <input
              value={registrationData.phone}
              onChange={onPhoneChange}
              name="phone"
              type="tel"
              placeholder="הזן טלפון"
            />
          </div>
        </div>

        <button className="submit" type="submit">
          הרשמה
        </button>

        <Link to={"/login"}>
          <div className="login">כניסה</div>
        </Link>
      </form>
    </div>
  );
};
export default Registration;
