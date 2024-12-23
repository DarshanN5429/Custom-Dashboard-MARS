import React, { useState } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
} from "@dnd-kit/core";
import DraggableItems from "../components/DraggableItems";
import DropZones from "../components/DropZones";
import { chartOptions } from "../utils/chartData";

const DashboardConfig = () => {
    const [droppedItems, setDroppedItems] = useState({});
    const [dropZones, setDropZones] = useState([
      { id: "resizable-dropzone", width: 300, height: 300 },
    ]);
  
    const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(TouchSensor, {
        activationConstraint: {
          delay: 250,
          tolerance: 5,
        },
      })
    );
  
    const handleDrop = (event) => {
      const { active, over } = event;
  
      // Check if the item is dropped over a valid drop zone
      if (over && active.id !== over.id) {
        // If dropping a draggable item into a drop zone
        if (chartOptions[active.id]) {
          const dropZoneId = over.id;
          const chartId = active.id;
  
          setDroppedItems((prev) => {
            const droppedItem = chartOptions[chartId];
            const newDroppedItems = {
              ...prev,
              [dropZoneId]: droppedItem,
            };
  
            // Add a new drop zone only if this drop zone was empty
            if (!prev[dropZoneId]) {
              const newDropZoneId = `dropzone-${dropZones.length + 1}`;
              setDropZones((prevZones) => [
                ...prevZones,
                { id: newDropZoneId, width: 300, height: 300 },
              ]);
            }
  
            return newDroppedItems;
          });
        }
        // If a drop zone is dropped over another drop zone (reordering logic)
        else {
          const sourceIndex = dropZones.findIndex(
            (zone) => zone.id === active.id
          );
          const targetIndex = dropZones.findIndex((zone) => zone.id === over.id);
  
          // If we are not dropping the drop zone onto itself
          if (sourceIndex !== targetIndex) {
            const reorderedZones = [...dropZones];
            const [movedZone] = reorderedZones.splice(sourceIndex, 1); // Remove the source zone
            reorderedZones.splice(targetIndex, 0, movedZone); // Insert it in the new position
  
            setDropZones(reorderedZones); // Update the drop zones order
          }
        }
      }
    };
  
    const handleResizeStop = (newSize, zone) => {
      setDropZones((prevZones) =>
        prevZones.map((z) =>
          z.id === zone.id
            ? { ...z, width: newSize.width, height: newSize.height }
            : z
        )
      );
    };
  
    return (
      <DndContext sensors={sensors} onDragEnd={handleDrop}>
        <div className="p-4 space-y-8 flex gap-4 ">
          <div className="mb-4 px-2 min-w-48 flex justify-center overflow-auto max-h-screen p-2 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
            <DraggableItems />
          </div>
  
          <div className="w-7/8 overflow-auto max-h-screen">
            <DropZones
              dropZones={dropZones}
              droppedItems={droppedItems}
              onResizeStop={handleResizeStop}
            />
          </div>
        </div>
      </DndContext>
    );
}

export default DashboardConfig