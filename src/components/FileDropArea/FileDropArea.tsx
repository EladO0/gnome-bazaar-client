import React, { ChangeEvent, useMemo, useState } from "react";
import "./FileDropArea.scss";

interface FileDropAreaProps {
  id: string;
  uploadCallback: (file: File) => void;
}

const FileDropArea: React.FC<FileDropAreaProps> = ({ id, uploadCallback }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const text = useMemo(() => {
    if (isDragging) {
      return "זרקו את התמונה פה";
    }
    return "להעלאת תמונה, יש לגרור או ללחוץ כאן";
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
    upload(files);
  };

  const upload = (files: File[]): void => {
    const imageFile = files.find((file) => file.type.startsWith("image/"));

    if (imageFile) {
      uploadCallback(imageFile);
    }
  };

  const handleFileSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    upload(files);
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
      <label htmlFor="files">{text}</label>
      <input
        id="files"
        accept="image/*"
        type="file"
        onChange={handleFileSelection}
      ></input>
    </div>
  );
};

export default FileDropArea;
