import { useState } from "react";
import "./SupplierPanel.scss";

const SupplierPanel = () => {
  const [data, setDAta] = useState<any>();
  console.log(data);

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReadr = new FileReader();
    fileReadr.onload = function (e) {
      const fileContent = e?.target?.result;
      setDAta(fileContent);
    };
    if (!e.target.files) return;
    fileReadr.readAsText(e.target.files[0]);
  };
  return (
    <div className="supplier-panel">
      <input type="file" onChange={upload} />
    </div>
  );
};
export default SupplierPanel;
