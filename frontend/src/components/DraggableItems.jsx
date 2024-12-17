import React from "react";
import DraggableChart from "./DraggableChart";
import { chartOptions } from "../utils/chartData";

const DraggableItems = () => {
  return (
    <div className="py-4 flex gap-4 flex-col">
      {Object.keys(chartOptions).map((key) => (
        <DraggableChart key={key} id={key}>
          <div className="bg-blue-500 text-white p-4 rounded w-32 text-center">
            {key.replace(/-/g, " ")}
          </div>
        </DraggableChart>
      ))}
    </div>
  );
};

export default DraggableItems;
