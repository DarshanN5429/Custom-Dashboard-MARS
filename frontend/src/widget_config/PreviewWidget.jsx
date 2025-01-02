import React from "react";
import ChartComponent from "../components/ChartComponent";
import { chartOptions } from "../utils/chartData";
import KPIComponent from "../components/KPIComponent";
import TableComponent from "../components/TableComponent";

const PreviewWidget = ({ data }) => {
  const { name, description, length, width, chart_type } = data || {};

  // Default dimensions if none are provided
  const defaultDimensions = { length: 300, width: 300 };

  const renderDimensions = () => {
    return (
      <p className="text-gray-600 text-sm mb-2">
        Dimensions: {length} × {width}
      </p>
    );
  };

  const renderContent = () => {
    if (chart_type === "KPI") {
      return <KPIComponent data={chartOptions["KPI"]} />;
    } else if (chart_type === "Table") {
      return <TableComponent data={chartOptions["Table"]} />;
    } else {
      const options = chartOptions[chart_type];
      if (!options) {
        return <p className="text-gray-500">No chart preview available</p>;
      }
      return (
        <div
          className="border border-red-500"
          style={{
            width: `${width || defaultDimensions.width}px`,
            height: `${length || defaultDimensions.length}px`,
          }}
        >
          <ChartComponent
            chartOptions={options}
            dimensions={{
              width: width || defaultDimensions.width,
              length: length || defaultDimensions.length,
            }}
          />
        </div>
      );
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-1/2">
      <h2 className="text-2xl font-semibold mb-4">Preview Widget</h2>
      {name && <h3 className="text-lg font-bold mb-2">{name}</h3>}
      {description && <p className="text-gray-600 mb-2">{description}</p>}
      {renderDimensions()}
      <div className="mt-4">{renderContent()}</div>
    </div>
  );
};

export default PreviewWidget;
