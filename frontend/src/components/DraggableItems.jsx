import React, { useEffect, useState } from "react";
import DraggableChart from "./DraggableChart";
import { fetchWidgets } from "../utils/api";

const DraggableItems = () => {
  const [widgets, setWidgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchWidgets();
        setWidgets(response);
      } catch (err) {
        setError("Failed to fetch widgets.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading widgets...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (widgets.length === 0) {
    return <div className="text-gray-500">No widgets to show.</div>;
  }

  return (
    <div className="py-4 flex gap-4 flex-col">
      {widgets.map((widget) => (
        <DraggableChart key={widget.id} id={widget.chart_type}>
          <div className="bg-blue-500 text-white p-4 rounded w-32 text-center">
            {widget.chart_type.replace(/-/g, " ")}
          </div>
        </DraggableChart>
      ))}
    </div>
  );
};

export default DraggableItems;
