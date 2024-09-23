import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { DiagramData, GraphDimensions } from "../../../config/types/graphTypes";
import diagramStyles from "./Diagram.module.scss";
import Tag from "../../Tag/Tag";

interface DiagramProps {
  data: DiagramData[];
  title: string;
  Icon?: any;
}

const Diagram: React.FC<DiagramProps> = ({ data, title, Icon }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState<GraphDimensions>({
    height: 100,
    width: 100,
  });

  useEffect(() => {
    const handleResize = () => {
      const incomeElement = document.getElementById("diagram");
      const width = Math.round((incomeElement?.clientWidth || 100) * 0.95);
      const height = Math.round((incomeElement?.clientHeight || 100) * 0.95);
      setDimensions({ height: height, width: width });
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const marginTop = 80;
    const marginRight = 30;
    const marginBottom = 30;
    const marginLeft = 60;

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
      .attr("viewBox", `0 0 ${dimensions.width} ${dimensions.height}`)
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    const x = d3
      .scaleUtc()
      .domain(d3.extent(data, (d) => new Date(d.date)) as [Date, Date])
      .range([marginLeft, dimensions.width - marginRight]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.close) as number])
      .nice()
      .range([dimensions.height - marginBottom, marginTop]);

    const line = d3
      .line<DiagramData>()
      .x((d) => x(new Date(d.date)))
      .y((d) => y(d.close));

    svg
      .append("g")
      .attr("transform", `translate(0,${dimensions.height - marginBottom})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(d3.timeMonth)
          .tickFormat((domainValue: Date | d3.NumberValue) => {
            if (domainValue instanceof Date) {
              return d3.timeFormat("%B")(domainValue);
            } else {
              return "";
            }
          })
          .tickSizeOuter(0)
      );

    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(dimensions.height / 40))
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("x2", dimensions.width - marginLeft - marginRight)
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
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);
  }, [dimensions, data]);

  return (
    <div className={diagramStyles.DiagramContainer}>
      <Tag title={title} Icon={Icon} />
      <div id="diagram" className={diagramStyles.diagram}>
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
};

export default Diagram;
