import React, { useRef, useState, useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { closePopup } from "../../store/slices/popupSlice";
import "./Signature.scss";

interface SignatureProps {
  callback: (signature: string) => void;
  data?: string;
}

const Signature: React.FC<SignatureProps> = ({ data, callback }) => {
  const dispatch = useAppDispatch();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const displayImageOnCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas || !data) return;

      const context = canvas.getContext("2d");
      if (!context) return;

      const image = new Image();
      image.src = data;

      image.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
      };
    };
    if (data) {
      displayImageOnCanvas();
    }
  }, [data]);

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (data) return; // Prevent drawing if data is available

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
    console.log(dataUrl);

    dispatch(closePopup());
  };

  const closeForm = () => {
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
      {!data ? (
        <button className="save-changes" onClick={saveChanges}>
          אישור עסקה
        </button>
      ) : (
        <button className="save-changes" onClick={closeForm}>
          סגירה
        </button>
      )}
    </div>
  );
};

export default Signature;
