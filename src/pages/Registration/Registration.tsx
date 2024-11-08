import { Link, useNavigate } from "react-router-dom";
import {
  AccountCircle,
  AlternateEmail,
  LockOutlined,
  PersonOutline,
  Phone,
  House,
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
import {getAddress} from "../../services/repositories/utilities-repository";
import {Address} from "../../config/types/addressType";

const initialUserInfo: UserInfo = {
  id: "",
  userName: "admin",
  pwd: "Aa123456!",
  fullName: "shir hirsh",
  mail: "shirhirsh510@gmail.com",
  phone: "0503403413",
  credits: 0,
  role: "User",
  address:
      {
        display_name: "הרצל 1 תל אביב",
        latitude: 0,
        longitude: 0
      }
};

const Registration = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [registrationData, setUserInfo] = useState(initialUserInfo);
  const [addressSuggestions, setAddressSuggestions] = useState<Address[]>([]);
  const [inputValue, setInputValue] = useState<string>(initialUserInfo.address.display_name);





  const onAddressChange = async (e) => {
    const newVal = e.target.value;
    setInputValue(newVal);

    if (newVal.length > 2) {
      try {
        const suggestions = await getAddress(newVal);
        setAddressSuggestions(Array.isArray(suggestions) ? suggestions : []);
      } catch (error) {
        console.error("Error fetching autocomplete suggestions:", error);
        setAddressSuggestions([]);
      }
    } else {
      setAddressSuggestions([]);
    }
  };

  const onSuggestionSelected = (selectedValue: string) => {
    const selectedAddress = addressSuggestions.find(suggestion => suggestion.display_name === selectedValue);
    if (selectedAddress) {
      setUserInfo((x) => {
        const newCredentialsState = { ...x };
        newCredentialsState.address = selectedAddress;
        return newCredentialsState;
      });
      setInputValue(selectedAddress.display_name);
    }
  };
  const onInput = (e) => {
    const selectedValue = e.target.value;
    onSuggestionSelected(selectedValue);
  };


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
            <AccountCircle/>
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
            <PersonOutline/>
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
            <LockOutlined/>
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
            <AlternateEmail/>
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
            <Phone/>
            <input
                value={registrationData.phone}
                onChange={onPhoneChange}
                name="phone"
                type="tel"
                placeholder="הזן טלפון"
            />
          </div>
        </div>
        <div className="input-container">
          <label htmlFor="address">כתובת:</label>
          <div className="field-container" id="address">
            <House/>
            <input
                value={inputValue}
                onChange={onAddressChange}
                onInput={onInput}
                name="address"
                type="text"
                placeholder="הזן כתובת"
                list="address-options"
            />
            <datalist id="address-options">
              {Array.isArray(addressSuggestions) &&
                  addressSuggestions.map((suggestion, index) => (
                      <option key={index} value={suggestion.display_name} >
                        {suggestion.display_name}
                      </option>
                  ))}
            </datalist>
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
