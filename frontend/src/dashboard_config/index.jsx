import React, { useState } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
} from "@dnd-kit/core";
import { Layout, Button, Card, Typography, Space, Divider } from "antd";
import {
  SaveOutlined,
  DragOutlined,
  LayoutOutlined,
} from "@ant-design/icons";
import DraggableItems from "../components/DraggableItems";
import DropZones from "../components/DropZones";
import { chartOptions } from "../utils/chartData";
import { saveDashboard } from "../utils/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const DashboardConfig = () => {
  const [droppedItems, setDroppedItems] = useState({});
  const [dropZones, setDropZones] = useState([
    { id: "dropzone-1", width: 300, height: 300 },
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
    console.log("active: " , active)
    console.log("over: " , over)
    if (over && active.id !== over.id) {
      if (chartOptions[active.id]) {
        const dropZoneId = over.id;
        const chartId = active.id;

        setDroppedItems((prev) => {
          const droppedItem = chartOptions[chartId];
          const newDroppedItems = {
            ...prev,
            [dropZoneId]: { ...droppedItem, name: chartId },
          };

          if (!prev[dropZoneId]) {
            const newDropZoneId = `dropzone-${dropZones.length + 1}`;
            setDropZones((prevZones) => [
              ...prevZones,
              { id: newDropZoneId, width: 300, height: 300, name: chartId },
            ]);
          }

          return newDroppedItems;
        });
        setDropZones((prevZones) =>
          prevZones.map((zone) =>
            zone.id === dropZoneId ? { ...zone, name: chartId } : zone
          )
        );
      } else {
        const sourceIndex = dropZones.findIndex((zone) => zone.id === active.id);
        const targetIndex = dropZones.findIndex((zone) => zone.id === over.id);

        if (sourceIndex !== targetIndex) {
          const reorderedZones = [...dropZones];
          const [movedZone] = reorderedZones.splice(sourceIndex, 1);
          reorderedZones.splice(targetIndex, 0, movedZone);
          setDropZones(reorderedZones);
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

  const handleSaveDashboard = async () => {
    const gridUnit = 100;
    const positions = dropZones.reduce((acc, zone, index) => {
      const widgetName = droppedItems[zone.id]?.name || "graph";

      const gridPosition = {
        grid: `${Math.ceil(zone.height / gridUnit)},${Math.ceil(
          zone.width / gridUnit
        )}`,
        position: index + 1,
        name: widgetName,
        width: zone.width,
        height: zone.height,
      };
      acc[zone.id] = gridPosition;
      return acc;
    }, {});

    const keys = Object.keys(positions);
    const updatedPositions = { ...positions };
    delete updatedPositions[keys[keys.length - 1]];

    try {
      await saveDashboard(updatedPositions);
      toast.success("Dashboard saved successfully!");
    } catch (err) {
      toast.error("Failed to save the dashboard.");
    }
  };

  return (
    <Layout className="min-h-screen bg-gray-50">
      <Header className="bg-white shadow-sm px-6 flex items-center justify-between">
        <Space>
          <LayoutOutlined className="text-lg text-blue-600" />
          <Title level={4} className="!mb-0">
            Dashboard Configuration
          </Title>
        </Space>
        <Button
          type="primary"
          icon={<SaveOutlined />}
          onClick={handleSaveDashboard}
          className="bg-blue-600"
        >
          Save Dashboard
        </Button>
      </Header>

      <Layout className="bg-transparent">
        <DndContext sensors={sensors} onDragEnd={handleDrop}>
          <Sider
            width={280}
            theme="light"
            className="overflow-hidden shadow-sm border-r border-gray-200"
          >
            <div className="p-4">
              <Space className="mb-4">
                <DragOutlined className="text-gray-600" />
                <Title level={5} className="!mb-0">
                  Available Widgets
                </Title>
              </Space>
              <Divider className="my-3" />
              <div className="overflow-y-auto h-[calc(100vh-180px)]">
                <DraggableItems />
              </div>
            </div>
          </Sider>

          <Content className="p-6">
            <Card className="w-full h-full bg-white shadow-sm">
              <div className="overflow-auto h-[calc(100vh-200px)]">
                <DropZones
                  dropZones={dropZones}
                  droppedItems={droppedItems}
                  onResizeStop={handleResizeStop}
                />
              </div>
            </Card>
          </Content>
        </DndContext>
      </Layout>
    </Layout>
  );
};

export default DashboardConfig;