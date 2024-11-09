import { useState, useEffect, useMemo, useCallback } from "react";
import { AutoGraph, LockPerson, Twitter } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { createUserTableConfig } from "../../config/table-configurations/user-table";
import { UserInfo } from "../../config/types/userTypes";
import { emitUnAuthorized } from "../../services/utilities/events-utility";
import { openPopup } from "../../store/slices/popupSlice";
import { promptMessage } from "../../store/slices/promptSlice";
import { DiagramData } from "../../config/types/graphTypes";
import {
  getAdminSalesInfp as getAdminSalesInfo,
  updateUserRole,
  sendCreditsToUser,
  getAllUsers,
  getMediaFollowers,
} from "../../services/repositories/admin-repository";
import CreditsPopup from "../../forms/CreditsForm/CreditsForm";
import TablePreview from "../../components/TablePreview/TablePreview";
import Diagram from "../../components/Graphs/Diagram/Diagram";
import Tag from "../../components/Tag/Tag";
import "./AdminPanel.scss";

const AdminPanel = () => {
  const dispatch = useAppDispatch();
  const [salesData, setSalesData] = useState<DiagramData[]>([]);
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [mediaFollowers, setMediaFollowers] = useState<number>(0);
  const auth = useAppSelector((x) => x.auth);

  useEffect(() => {
    const fetchMediaData = async () => {
      try {
        const mediaResult = await getMediaFollowers();
        setMediaFollowers(mediaResult);
      } catch {
        dispatch(
          promptMessage({
            message: "Twitter api יותר מדי בקשות ל",
            type: "error",
          })
        );
      }
    };
    fetchMediaData();
  }, [dispatch]);

  useEffect(() => {
    if (!auth.isAdmin) {
      emitUnAuthorized();
    }
  }, [auth.isAdmin]);

  useEffect(() => {
    const fetchAdminData = async () => {
      const usersResult = await getAllUsers();
      setUsers(Array.isArray(usersResult) ? usersResult : []);

      const salesDataResult = await getAdminSalesInfo();
      setSalesData(salesDataResult);
    };
    fetchAdminData();
  }, []);

  const updateRole = useCallback(
    async (e, user: UserInfo) => {
      try {
        const newRole: string = e.target.value.toString();
        await updateUserRole(user, newRole);
        setUsers(await getAllUsers());
        dispatch(
          promptMessage({ message: "הרשאה עודכנה בהצלחה", type: "success" })
        );
      } catch {
        dispatch(
          promptMessage({ message: "הייתה בעיה בעדכון ההרשאות", type: "error" })
        );
      }
    },
    [dispatch]
  );

  const openCreditsPopup = useCallback(
    (user: UserInfo) => {
      const addCredits = async (user: UserInfo, amount: number) => {
        try {
          await sendCreditsToUser({
            creditsToAdd: amount,
            userId: user.id,
          });
          setUsers((x) => {
            const newUsersState = [...x];
            const userIdx = newUsersState.findIndex((x) => x.id === user.id);
            newUsersState[userIdx].credits += amount;
            return newUsersState;
          });
          dispatch(
            promptMessage({ message: "קרדיטים נוספו בהצלחה", type: "success" })
          );
        } catch {
          dispatch(
            promptMessage({
              message: "הייתה בעיה בהוספת הקרדיטים",
              type: "error",
            })
          );
        }
      };
      dispatch(
        openPopup({
          component: <CreditsPopup user={user} callback={addCredits} />,
          theme: "dark",
        })
      );
    },
    [dispatch]
  );

  const userTableConfig = useMemo(() => {
    return createUserTableConfig(updateRole, openCreditsPopup);
  }, [updateRole, openCreditsPopup]);

  return (
    <div className="admin-panel">
      <div className="manage-container">
        <Tag title="ניהול הרשאות" Icon={LockPerson} />
        <TablePreview
          data={users}
          configuration={userTableConfig}
          rowClass="user-entry"
        />
      </div>
      <div className="media-followers">
        <Tag title="פרסום" Icon={Twitter} />
        <header>:נתוני החנות במדיה</header>
        <div className="info">
          <span className="follower-count">{mediaFollowers}</span>
          מספר עוקבים בטוויטר
        </div>
      </div>
      <Diagram data={salesData} title="מדד מכירות" Icon={AutoGraph} />
    </div>
  );
};
export default AdminPanel;
