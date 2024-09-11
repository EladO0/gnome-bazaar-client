import * as d3 from "d3";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { AutoGraph, LockPerson } from "@mui/icons-material";
import { UserInfo } from "../../config/types/userTypes";
import { useAppDispatch } from "../../store/hooks";
import { openPopup } from "../../store/slices/popupSlice";
import { promptMessage } from "../../store/slices/promptSlice";
import { createUserTableConfig } from "../../services/utilities/table-utility";
import { SalesData } from "../../config/types/commonTypes";
import {
  getAllUsers,
  getIncomeData,
} from "../../services/repositories/admin-repository";
import CreditsPopup from "../../components/Popup/CreditsPopup/CreditsPopup";
import TablePreview from "../../components/TablePreview/TablePreview";
import "./AdminPanel.scss";

const data: Array<SalesData> = [];

const defaultUsers: Array<UserInfo> = [];

const AdminPanel = () => {
  const dispatch = useAppDispatch();
  const svgRef: React.RefObject<SVGSVGElement> = useRef(null);
  const [salesData, setSalesData] = useState(data);
  const [users, setUsers] = useState(defaultUsers);

  useEffect(() => {
    const fetchAdminData = async () => {
      const usersResult = await getAllUsers(30);
      setUsers(usersResult);

      const salesDataResult = await getIncomeData();
      setSalesData(salesDataResult);
    };
    fetchAdminData();
  }, []);

  const updateRole = useCallback(
    (e, user: UserInfo) => {
      //////////// implement server update ////////////

      setUsers((x) => {
        const newUsersState = [...x];
        const userIdx = newUsersState.findIndex((x) => x.id === user.id);
        newUsersState[userIdx].role = e.target.value;
        return newUsersState;
      });
      dispatch(
        promptMessage({ message: "!הרשאה עודכנה בהצלחה", type: "success" })
      );
    },
    [dispatch]
  );

  const openCreditsPopup = useCallback(
    (user: UserInfo) => {
      const addCredits = (user: UserInfo, amount: number) => {
        //////////// implement server update ////////////

        setUsers((x) => {
          const newUsersState = [...x];
          const userIdx = newUsersState.findIndex((x) => x.id === user.id);
          newUsersState[userIdx].credits += amount;
          return newUsersState;
        });
        dispatch(
          promptMessage({ message: "!קרדיטים נוספו בהצלחה", type: "success" })
        );
      };
      const popup = {
        component: <CreditsPopup user={user} callback={addCredits} />,
      };
      dispatch(openPopup(popup));
    },
    [dispatch]
  );

  const userTableConfig = useMemo(() => {
    return createUserTableConfig(updateRole, openCreditsPopup);
  }, [updateRole, openCreditsPopup]);

  useEffect(() => {
    const incomeElement = document.getElementById("sales");

    const width = Math.round((incomeElement?.clientWidth || 100) * 0.95);
    const height = Math.round((incomeElement?.clientHeight || 100) * 0.95);
    const marginTop = 80;
    const marginRight = 30;
    const marginBottom = 30;
    const marginLeft = 60; 

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    const x = d3
      .scaleUtc()
      .domain(d3.extent(salesData, (d) => d.date))
      .range([marginLeft, width - marginRight]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(salesData, (d) => d.close)])
      .nice() 
      .range([height - marginBottom, marginTop]);

    const line = d3
      .line()
      .x((d) => x(d.date))
      .y((d) => y(d.close));

    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(d3.timeMonth) 
          .tickFormat(d3.timeFormat("%B"))
          .tickSizeOuter(0)
      );

    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(height / 40))
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("x2", width - marginLeft - marginRight)
          .attr("stroke-opacity", 0.1)
      )
      .call((g) =>
        g
          .append("text")
          .attr("x", -marginLeft) 
          .attr("y", 30)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("(₪) רווח")
      );

    svg
      .append("path")
      .datum(salesData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);
  }, [salesData]); 
  return (
    <div className="admin-panel">
      <div className="manage-container">
        <header>
          <LockPerson />
          ניהול הרשאות
        </header>
        <TablePreview data={users} configuration={userTableConfig} />
      </div>
      <div className="manage-container">
        <header>
          <AutoGraph />
          מדד מכירות
        </header>
        <div id="sales">
          <svg ref={svgRef}></svg>
        </div>
      </div>
    </div>
  );
};
export default AdminPanel;
