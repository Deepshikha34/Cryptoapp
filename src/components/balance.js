import React from "react";
import Plot from "react-plotly.js";
import Chart from "react-apexcharts";
const options = {
  chart: {
    id: "basic-bar",
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994],
  },
  stroke: {
    curve: "straight",
  },
};
const series = [
  {
    name: "series-1",
    data: [30, 40, 45, 50],
  },
];
const Balance = ({}) => {
  return (
    <div>
      <div
        className="coin-container"
        style={{ backgroundColor: "#2C2C32", textAlign: "center" }}
      >
        <div>
          <span className="coin-title">Balance</span>
        </div>
        <div>
          <span style={{ color: "white", fontSize: 20 }}>200000</span>
        </div>
      </div>
      <div className="coin-container" style={{ backgroundColor: "#2C2C32" }}>
        <Chart options={options} series={series} type="bar" />
      </div>
    </div>
  );
};

export { Balance };
