import CreditsViewer from "../../components/CreditsViewer/CreditsViewer";
import RoleViewer from "../../components/RoleViewer/RoleViewer";
import { TableConfiguration } from "../../config/types/commonTypes";
import { UserInfo } from "../../config/types/userTypes";

export const createUserTableConfig = (
  updateRole: (e, user: UserInfo) => void,
  updateCredits: (user: UserInfo) => void
): TableConfiguration => {
  return [
    {
      header: "משתמש",
      flex: 1.2,
      getter: (user: UserInfo) => user.userName,
    },
    {
      header: "שם מלא",
      flex: 1.2,
      getter: (user: UserInfo) => user.fullName,
    },
    {
      header: "טלפון",
      flex: 1,
      getter: (user: UserInfo) => user.phone,
    },
    {
      header: "מייל",
      flex: 1.5,
      getter: (user: UserInfo) => user.mail,
    },
    {
      header: "הרשאה",
      flex: 1,
      getter: (user: UserInfo) => (
        <RoleViewer user={user} updateRole={updateRole} />
      ),
    },
    {
      header: "קרדיטים",
      flex: 1.1,
      getter: (user: UserInfo) => (
        <CreditsViewer
          amount={user.credits}
          popupCallback={() => updateCredits(user)}
        />
      ),
    },
  ];
};
