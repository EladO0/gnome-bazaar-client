import Popup from "../components/Popup/Popup";
import { useAppDispatch } from "../store/hooks";
import { openPopup } from "../store/slices/popupSlice";
import "./Root.scss";

const Root = () => {
  const dispatch = useAppDispatch();

  const openForm = () => {
    dispatch(
      openPopup({
        component: () => <div>hello world</div>,
        props: {},
      })
    );
  };
  return (
    <div className="root">
      <button onClick={openForm}>click me</button>
      <Popup />
    </div>
  );
};
export default Root;
