import React from "react";
import ChartComponent from "../components/ChartComponent";
import { chartOptions } from "../utils/chartData";

const PreviewWidget = ({ data }) => {
  const { widgetName, description, dimensions, chartType } = data || {};

  // Default dimensions if none are provided
  const defaultDimensions = { length: 300, width: 300 };

  const renderDimensions = () => {
    const { length, width } = dimensions || defaultDimensions;
    return (
      <p className="text-gray-600 text-sm mb-2">
        Dimensions: {length} × {width}
      </p>
    );
  };

  const renderChart = () => {
    const options = chartOptions[chartType];
    if (!options) {
      return <p className="text-gray-500">No chart preview available</p>;
    }
    return (
      <div
        className="border border-red-500"
        style={{
          width: `${dimensions?.width || defaultDimensions.width}px`,
          height: `${dimensions?.length || defaultDimensions.length}px`,
        }}
      >
        <ChartComponent
          chartOptions={options}
          dimensions={{
            width: dimensions?.width || defaultDimensions.width,
            length: dimensions?.length || defaultDimensions.length,
          }}
        />
      </div>
    );
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-1/2">
      <h2 className="text-2xl font-semibold mb-4">Preview Widget</h2>
      {widgetName && <h3 className="text-lg font-bold mb-2">{widgetName}</h3>}
      {description && <p className="text-gray-600 mb-2">{description}</p>}
      {renderDimensions()}
      <div className="mt-4">{renderChart()}</div>

    </div>
  );
};

export default PreviewWidget;
