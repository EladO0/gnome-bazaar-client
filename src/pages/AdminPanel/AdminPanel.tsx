import { useState, useEffect, useRef } from 'react'
import * as d3 from "d3";
import { AddCircle, AutoGraph, LockPerson } from '@mui/icons-material'
import { UserInfo } from '../../config/types/userTypes'
import { useAppDispatch } from '../../store/hooks'
import { openPopup } from '../../store/slices/popupSlice'
import { promptMessage } from '../../store/slices/promptSlice'
import CreditsPopup from '../../components/Popup/CreditsPopup/CreditsPopup'
import './AdminPanel.scss'
const data = [
    { date: new Date(2024, 3, 1), close: 1000 },
    { date: new Date(2024, 4, 1), close: 500 },
    { date: new Date(2024, 5, 1), close: 170 },
    { date: new Date(2024, 6, 1), close: 170 },
    { date: new Date(2024, 7, 1), close: 170 }
];
const defaultUsers: Array<UserInfo> = [
    {
        id: "1",
        credits: 200,
        fullName: "shiri",
        mail: "credits",
        phone: "3243243",
        user: "4353",
        pwd: "",
        role: "User",
    },
    {
        id: "2",
        credits: 200,
        fullName: "shiri",
        mail: "credits",
        phone: "3243243",
        user: "4353",
        pwd: "",
        role: "User"
    },
    {
        id: "3",
        credits: 200,
        fullName: "shiri",
        mail: "credits",
        phone: "3243243",
        user: "4353",
        pwd: "",
        role: "User"
    }
]

const AdminPanel = () => {
    const dispatch = useAppDispatch();
    const [users, setUsers] = useState(defaultUsers);
    const updateRole = (e, user: UserInfo) => {

        //////////// implement server update ////////////

        setUsers(x => {
            const newUsersState = [...x];
            const userIdx = newUsersState.findIndex(x => x.id === user.id);
            newUsersState[userIdx].role = e.target.value;
            return newUsersState;
        })
        dispatch(promptMessage({ message: "!הרשאה עודכנה בהצלחה", type: "success" }))
    }

    const openCreditsPopup = (user: UserInfo) => {
        const addCredits = (user: UserInfo, amount: number) => {

            //////////// implement server update ////////////

            setUsers(x => {
                const newUsersState = [...x];
                const userIdx = newUsersState.findIndex(x => x.id === user.id);
                newUsersState[userIdx].credits += amount;
                return newUsersState;
            })
            dispatch(promptMessage({ message: "!קרדיטים נוספו בהצלחה", type: "success" }))
        }
        const popup = {
            component: <CreditsPopup user={user} callback={addCredits} />
        }
        dispatch(openPopup(popup));
    }
    const svgRef = useRef();
    useEffect(() => {
        // Declare the chart dimensions and margins (increase the left margin)
        const width = 700;
        const height = 550;
        const marginTop = 20;
        const marginRight = 30;
        const marginBottom = 30;
        const marginLeft = 60; // Increased from 40 to 60 for more room for y-axis labels

        // Clear the svg contents before re-rendering the chart
        d3.select(svgRef.current).selectAll("*").remove();

        // Create the SVG container and apply the dimensions
        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

        // Declare the x (horizontal position) scale
        const x = d3.scaleUtc()
            .domain(d3.extent(data, d => d.date))
            .range([marginLeft, width - marginRight]);

        // Declare the y (vertical position) scale
        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.close)])
            .nice() // Use 'nice' to make axis end on round numbers
            .range([height - marginBottom, marginTop]);

        // Declare the line generator
        const line = d3.line()
            .x(d => x(d.date))
            .y(d => y(d.close));

        // Add the x-axis indexed by months
        svg.append("g")
            .attr("transform", `translate(0,${height - marginBottom})`)
            .call(
                d3.axisBottom(x)
                    .ticks(d3.timeMonth) // Set ticks to months
                    .tickFormat(d3.timeFormat("%B")) // Format as full month name
                    .tickSizeOuter(0)
            );

        // Add the y-axis, remove the domain line, add grid lines, and a label
        svg.append("g")
            .attr("transform", `translate(${marginLeft},0)`)
            .call(d3.axisLeft(y).ticks(height / 40))
            .call(g => g.select(".domain").remove())
            .call(g => g.selectAll(".tick line").clone()
                .attr("x2", width - marginLeft - marginRight)
                .attr("stroke-opacity", 0.1))
            .call(g => g.append("text")
                .attr("x", -marginLeft + 10) // Adjust label position
                .attr("y", 10)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("(₪) רווח"));

        // Append the line path
        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", line);
    }, [data]); // Rerun the effect when data changes
    return (
        <div className="admin-panel">
            <div className='manage-container'>
                <header>
                    <LockPerson />
                    ניהול הרשאות
                </header>
                <div className="row headers">
                    <div>שם משתמש</div>
                    <div>שם מלא</div>
                    <div>טלפון</div>
                    <div>מייל</div>
                    <div>הרשאות</div>
                    <div>קרדיטים</div>
                </div>
                <div className="users">
                    {
                        users.map((u, i) => (
                            <div key={i} className="row">
                                <div>{u.user}</div>
                                <div>{u.fullName}</div>
                                <div>{u.phone}</div>
                                <div>{u.mail}</div>
                                <select
                                    value={u.role}
                                    onChange={(e) => updateRole(e, u)}>
                                    <option value={"Admin"}>מנהל</option>
                                    <option value={"Supplier"}>ספק</option>
                                    <option value={"User"}>משתמש</option>
                                </select>
                                <div className='add-credits'>
                                    {u.credits}
                                    <AddCircle onClick={() => openCreditsPopup(u)} />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="manage-container">
                <header>
                    <AutoGraph />
                    מדד מכירות
                </header>
                <div className="income">
                    <svg ref={svgRef}></svg>
                </div>
            </div>
        </div>
    )
}
export default AdminPanel