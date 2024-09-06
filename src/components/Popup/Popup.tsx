import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { closePopup } from "../../store/slices/popupSlice";
import "./Popup.scss";

const Popup = () => {
  const dispatch = useAppDispatch();
  const popup = useAppSelector((x) => x.popup);

  const closeSelf = () => {
    dispatch(closePopup());
  };

  const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    popup.component && (
      <div className="popup-container" onClick={closeSelf}>
        <div className="popup" onClick={stopPropagation}>
          {popup.component}
        </div>
      </div>
    )
  );
};

export default Popup;
