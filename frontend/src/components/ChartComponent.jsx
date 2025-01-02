import React from "react";
import ReactECharts from "echarts-for-react";

const ChartComponent = ({ chartOptions, dimensions }) => {
  const { width = 300, height = 300 } = dimensions;

  return (
    <div style={{ width: `${width}px`, height: `${height}px` }}>
      <ReactECharts
        option={chartOptions}
        style={{ height: "100%", width: "100%" }}
        opts={{
          renderer: "svg",
        }}
      />
    </div>
  );
};

export default ChartComponent;
