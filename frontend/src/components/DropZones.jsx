import React from "react";
import ResizableDropZone from "./ResizableDropZone";

const DropZones = ({ dropZones, droppedItems, onResizeStop }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {dropZones.map((zone) => (
        <ResizableDropZone
          key={zone.id}
          id={zone.id}
          size={{ width: zone.width, height: zone.height }}
          onDrop={droppedItems[zone.id] || null}
          onResizeStop={(newSize) => onResizeStop(newSize, zone)}
        />
      ))}
    </div>
  );
};

export default DropZones;
