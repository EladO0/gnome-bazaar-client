import { useEffect, useState } from "react";
import { LockOutlined, PersonOutline } from "@mui/icons-material";
import { getAuthToken } from "../../services/repositories/auth-repository";
import { loadToken, resetToken } from "../../store/slices/authenticationSlice";
import { useAppDispatch } from "../../store/hooks";
import { Link, useNavigate } from "react-router-dom";
import { Credentials } from "../../config/types/userTypes";
import { promptMessage } from "../../store/slices/promptSlice";
import "./Login.scss";
import {
  validateLoginForm,
  validateUser,
  validatePWD,
} from "../../services/utilities/form-utility";
import { closePopup } from "../../store/slices/popupSlice";

const initialCredentials: Credentials = {
  user: "lina",
  pwd: "123",
};

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState(initialCredentials);

  useEffect(() => {
    dispatch(resetToken());
    dispatch(closePopup());
  }, [dispatch]);

  const login = async (e) => {
    e.preventDefault();
    if (!validateLoginForm(credentials)) return;

    const tokenResult = await getAuthToken(credentials);

    if (tokenResult) {
      dispatch(loadToken(tokenResult));
      localStorage.setItem('token', tokenResult.token);
      const msg = `${tokenResult.name} ,שלום`;
      dispatch(promptMessage({ message: msg, type: "success" }));
      navigate(`/market`);
    } else {
      setCredentials(initialCredentials);
      const msg = "שם משתמש או סיסמא אינם נכונים";
      dispatch(promptMessage({ message: msg, type: "error" }));
    }
  };

  const onPasswordChange = (e) => {
    const newVal = e.target.value;
    if (!validatePWD(newVal)) return;
    setCredentials((x) => {
      const newCredentialsState = { ...x };
      newCredentialsState.pwd = newVal;
      return newCredentialsState;
    });
  };
  const onUserChange = (e) => {
    const newVal = e.target.value;
    if (!validateUser(newVal)) return;
    setCredentials((x) => {
      const newCredentialsState = { ...x };
      newCredentialsState.user = newVal;
      return newCredentialsState;
    });
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={login}>
        <header className="title">התחברות</header>

        <div className="input-container">
          <label htmlFor="username">שם משתמש:</label>
          <div className="field-container" id="user">
            <PersonOutline />
            <input
              autoFocus
              value={credentials.user}
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
              value={credentials.pwd}
              onChange={onPasswordChange}
              name="password"
              type="password"
              placeholder="הזן סיסמא"
            />
          </div>
        </div>

        <button className="submit" type="submit">
          כניסה
        </button>

        <Link to={"/registration"}>
          <div className="signup">הרשמה</div>
        </Link>
      </form>
    </div>
  );
};
export default Login;
