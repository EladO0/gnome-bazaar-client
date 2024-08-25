import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { MAX_PROMPT_TIMER } from "../../config/constants";
import { closePrompt } from "../../store/slices/promptSlice";
import "./Prompt.scss";

const Prompt = () => {
  const dispatch = useAppDispatch();
  const [timer, setTimer] = useState(0);
  const prompt = useAppSelector((x) => x.prompt);

  useEffect(() => {
    let interval = 0;
    if (timer > 0) {
      interval = setTimeout(() => {
        setTimer((x) => x - 1);
      }, 1000);
    } else {
      dispatch(closePrompt());
    }
    return () => clearInterval(interval);
  }, [dispatch, timer]);

  useEffect(() => {
    if (prompt.message) {
      setTimer(MAX_PROMPT_TIMER);
    }
  }, [prompt]);

  return (
    prompt.message && (
      <div className={`prompt ${prompt.type}`}>
        <div className="message">{prompt.message}</div>
        <div className={`timer  ${prompt.type}`}>{timer}</div>
      </div>
    )
  );
};
export default Prompt;
