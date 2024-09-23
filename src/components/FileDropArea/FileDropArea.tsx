import React, { useMemo, useState } from "react";
import "./FileDropArea.scss";

interface FileDropAreaProps {
  id: string;
  uploadCallback: (file: File) => void;
}

const FileDropArea: React.FC<FileDropAreaProps> = ({ id, uploadCallback }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const text = useMemo(() => {
    if (isDragging) {
      return "Release to drop the image";
    }
    return "Drag and drop a single image here";
  }, [isDragging]);
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find((file) => file.type.startsWith("image/"));

    if (imageFile) {
      uploadCallback(imageFile);
    }
  };

  return (
    <div
      id={id}
      onDragOver={handleDragOver}
      onDragEnter={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      role="button"
      className={`file-drop-area ${isDragging ? "dragging" : ""}`}
    >
      {text}
    </div>
  );
};

export default FileDropArea;
