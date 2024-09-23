import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import {
  GraphDimensions,
  PieChartData,
} from "../../../config/types/graphTypes";
import Tag from "../../Tag/Tag";
import pieStyles from "./PieChart.module.scss";

interface PieChartProps {
  data: PieChartData[];
  title: string;
  Icon?: any;
}

const PieChart: React.FC<PieChartProps> = ({ data = [], title, Icon }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState<GraphDimensions>({
    height: 100,
    width: 100,
  });

  useEffect(() => {
    const handleResize = () => {
      const incomeElement = document.getElementById("pie-chart");
      const width = Math.round(incomeElement?.clientWidth || 100);
      const height = Math.round(incomeElement?.clientHeight || 100);
      setDimensions({ height, width });
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const margin = 40;
    const radius = Math.min(dimensions.width, dimensions.height) / 2 - margin;
    const color = d3
      .scaleOrdinal<string>()
      .domain(data.map((d) => d.label))
      .range(d3.schemeSet3);

    const pie = d3
      .pie<PieChartData>()
      .sort(null)
      .value((d) => d.value);

    const arc = d3
      .arc<d3.PieArcDatum<PieChartData>>()
      .innerRadius(0)
      .outerRadius(radius);

    const labelArc = d3
      .arc<d3.PieArcDatum<PieChartData>>()
      .innerRadius(radius + 20)
      .outerRadius(radius + 20);

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", pieStyles.tooltip);

    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      const g = svg
        .attr("width", dimensions.width)
        .attr("height", dimensions.height)
        .append("g")
        .attr(
          "transform",
          `translate(${dimensions.width / 2}, ${dimensions.height / 2})`
        );

      const totalValue = d3.sum(data, (d) => d.value);

      const arcs = g
        .selectAll("arc")
        .data(pie(data))
        .join("g")
        .attr("class", "arc");

      arcs
        .append("path")
        .attr("d", arc as any)
        .attr("fill", (d) => color(d.data.label))
        .on("mouseover", (_, d) => {
          tooltip
            .style("display", "block")
            .html(
              `<strong>${d.data.label}</strong>: ${d.data.value} (${(
                (d.data.value / totalValue) *
                100
              ).toFixed(1)}%)`
            );
        })
        .on("mousemove", (event) => {
          tooltip
            .style("display", "block")
            .style("top", event.pageY - 10 + "px")
            .style("left", event.pageX + 10 + "px");
        })
        .on("mouseout", () => {
          tooltip.style("display", "none");
        });

      arcs
        .append("text")
        .attr("class", pieStyles.label)
        .attr("transform", (d) => `translate(${labelArc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .text((d) => d.data.label)
        .raise();
    }

    return () => {
      tooltip.remove();
    };
  }, [dimensions, data]);

  return (
    <div className={pieStyles.pieChartContainer}>
      <Tag title={title} Icon={Icon} />

      <div id="pie-chart" className={pieStyles.pieChart}>
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
};

export default PieChart;
