import React, { useRef, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { closePopup } from "../../store/slices/popupSlice";
import "./Signature.scss";

interface SignatureProps {
  callback: (signature: string) => void;
}
const Signature: React.FC<SignatureProps> = ({ callback }) => {
  const dispatch = useAppDispatch();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const { offsetX, offsetY } = event.nativeEvent;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const { offsetX, offsetY } = event.nativeEvent;
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.closePath();
    setIsDrawing(false);
  };

  const saveChanges = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    callback(dataUrl);
    dispatch(closePopup());
  };
  return (
    <div className="signature">
      <header className="title">חתימה לאישור עסקה</header>
      <canvas
        className="canvas"
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
      <button className="save-changes" onClick={saveChanges}>
        אישור עסקה
      </button>
    </div>
  );
};

export default Signature;
