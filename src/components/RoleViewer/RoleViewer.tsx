import { UserInfo } from "../../config/types/userTypes";
import "./RoleViewer.scss";

interface RoleViewerProps {
  updateRole: (e, user: UserInfo) => void;
  user: UserInfo;
}
const RoleViewer: React.FC<RoleViewerProps> = ({ user, updateRole }) => {
  return (
    <div className="role-viewer">
      <select value={user.role} onChange={(e) => updateRole(e, user)}>
        <option value={"Admin"}>מנהל</option>
        <option value={"Supplier"}>ספק</option>
        <option value={"User"}>משתמש</option>
      </select>
    </div>
  );
};

export default RoleViewer;
