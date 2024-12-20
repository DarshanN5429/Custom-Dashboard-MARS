// This component will render the charts (Pie, Bar, and Line):
import React from "react";
import ReactECharts from "echarts-for-react";

const ChartComponent = ({ chartOptions, dimensions }) => {
  return (
    <ReactECharts
      option={chartOptions}
      style={{ height: `${dimensions.length}px`, width: `${dimensions.width}px`}}
      opts={{
        renderer: "svg",
      }}
    />
  );
};

export default ChartComponent;
