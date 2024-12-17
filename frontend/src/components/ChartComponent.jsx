// This component will render the charts (Pie, Bar, and Line):
import React from "react";
import ReactECharts from "echarts-for-react";

const ChartComponent = ({ chartOptions }) => {
  return (
    <ReactECharts
      option={chartOptions}
      style={{
        width: "100%",
        height: "100%",
      }}
      opts={{
        renderer: "svg",
      }}
    />
  );
};

export default ChartComponent;
