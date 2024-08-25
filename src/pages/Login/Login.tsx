import { useState } from "react";
import { getAuthToken } from "../../services/repositories/auth-repository";
import { loadToken } from "../../store/slices/authenticationSlice";
import { useAppDispatch } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import { Credentials } from "../../config/types/userTypes";
import "./Login.scss";

const initialCredentials: Credentials = {
  user: "admin",
  pwd: "1234",
};

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [credentials] = useState(initialCredentials);

  const login = async () => {
    const tokenResult = await getAuthToken(credentials);
    if (tokenResult) {
      dispatch(loadToken(tokenResult));
      navigate(`/`);
    }
  };
  return (
    <div className="login">
      <button onClick={login}>login</button>
    </div>
  );
};
export default Login;
