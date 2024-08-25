import { useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { resetToken } from "../../store/slices/authenticationSlice";
import Login from "../Login/Login";
import "./Home.scss";

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetToken());
  }, [dispatch]);

  return (
    <div className="home">
      <Login />
    </div>
  );
};
export default Home;
