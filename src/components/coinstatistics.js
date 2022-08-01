import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { coinExchangeServices } from "../services";

const CoinStatistics = ({ selectedCoin }) => {
  const [fDate, setFDate] = useState(new Date());
  const [tDate, setTDate] = useState(new Date());
  const [dSeries, setDSeries] = useState(null);
  const [dOptions, setDOptions] = useState(null);

  const setFDateCallback = (date) => {
    const fDate = new Date(date);
    const tDate = new Date(date);
    fDate.setHours(0, 0, 0);
    tDate.setHours(23, 59, 0);
    setFDate(fDate);
    setTDate(tDate);
    getDate(fDate, tDate, "15MIN");
  };

  const setTDateCallback = (date) => {
    setTDate(new Date(date));
    var diffDays = parseInt((date - fDate) / (1000 * 60 * 60 * 24), 10);
    const firstDate = new Date(fDate);
    const tDate = new Date(date);
    firstDate.setHours(0, 0, 0);
    tDate.setHours(23, 59, 0);
    console.log(diffDays);
    if (diffDays <= 31) getDate(firstDate, tDate, "1DAY");
    if (diffDays > 31 && diffDays <= 364) getDate(firstDate, tDate, "3DAY");
    if (diffDays > 364 && diffDays <= 1094) getDate(firstDate, tDate, "5DAY");
    if (diffDays > 1094) getDate(firstDate, tDate, "10DAY");
  };

  useEffect(() => {
    const date = new Date();
    const fDate = new Date(date);
    const tDate = new Date(date);
    fDate.setHours(0, 0, 0);
    tDate.setHours(23, 59, 0);
    getDate(fDate, tDate, "15MIN");
    setFDate(fDate);
    setTDate(tDate);
  }, [selectedCoin]);

  const getDate = (dStart, dEnd, timeInterval) => {
    console.log(dStart.toISOString(), dEnd.toISOString());
    coinExchangeServices
      .getCoinTimeDate(
        selectedCoin,
        dStart.toISOString(),
        dEnd.toISOString(),
        timeInterval
      )
      .then((response) => {
        if (response.length > 0) {
          const points = [];
          const dates = [];
          response.forEach((point, index) => {
            dates.push(point.time_close);
            points.push(point.rate_close.toFixed(2));
          });
          const series = [
            {
              name: selectedCoin,
              data: points,
              color: "#BC5E61",
            },
          ];
          const options = {
            chart: {
              height: 350,
              type: "area",
              foreColor: "#ccc",
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: "straight",
            },
            xaxis: {
              type: "datetime",
              categories: dates,
            },
            tooltip: {
              x: {
                format: "dd/MM/yy HH:mm",
              },
            },
          };
          setDOptions(options);
          setDSeries(series);
        }
      });
  };

  // console.log(dSeries, dOptions);

  return (
    <div
      className="coin-container"
      style={{
        backgroundColor: "#2C2C32",
        paddingRight: "20px",
        paddingLeft: "20px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 16, color: "white" }}>Statistics</span>
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex" }}>
            <span className="datepicker-text">From </span>
            <DatePicker
              selected={fDate}
              onChange={(date) => setFDateCallback(date)}
            />
          </div>
          <div style={{ display: "flex" }}>
            <span className="datepicker-text">To </span>
            <DatePicker
              selected={tDate}
              onChange={(date) => setTDateCallback(date)}
            />
          </div>
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
        {dOptions && dSeries && (
          <ReactApexChart
            options={dOptions}
            series={dSeries}
            type="area"
            height={400}
          />
        )}
      </div>
    </div>
  );
};

export { CoinStatistics };
