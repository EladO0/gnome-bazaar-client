import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAuthToken } from "../../services/repositories/auth-repository";
import { useAppDispatch } from "../../store/hooks";
import { loadToken, resetToken } from "../../store/slices/authenticationSlice";
import "./Home.scss";

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetToken());
  }, [dispatch]);

  const login = async () => {
    const tokenResult = await getAuthToken();
    if (tokenResult) {
      dispatch(loadToken(tokenResult));
      navigate(`/`);
    }
  };
  return (
    <div className="home">
      <button onClick={login}>login</button>
    </div>
  );
};
export default Home;
