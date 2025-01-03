import React, { useState, useEffect } from "react";
import { Card, Row, Col, Spin, Alert, Button, Typography, Select } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { fetchDashboard } from "../utils/api";
import { chartOptions } from "../utils/chartData";
import ChartComponent from "../components/ChartComponent";
import KPIComponent from "../components/KPIComponent";
import TableComponent from "../components/TableComponent";

const { Title } = Typography;
const { Option } = Select;

const LandingPage = () => {
  const [dashboards, setDashboards] = useState({});
  const [selectedDashboard, setSelectedDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log("selectedDashboard : ", selectedDashboard);
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchDashboard();
      console.log("Raw Result : ", result);
      if (result && result.length > 0) {
        const userDashboards = result[0]?.positions || {};  // Safely accessing the positions key
        console.log("Processed Dashboards: ", userDashboards);
        setDashboards(userDashboards);
        setSelectedDashboard(userDashboards[Object.keys(userDashboards)[0]]);  // Selecting first dashboard
      }
    } catch (error) {
      setError(error.message || "Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

    // Function to calculate column span based on grid value
    const getColSpan = (gridString) => {
      if (!gridString) return 8; // Default span
      const [rows, cols] = gridString.split(',').map(Number);
      // Calculate span based on a 24-column grid system
      return Math.floor(24 * (cols / 12)); // Assuming 12 is max columns
    };
  

  const handleDashboardChange = (dashboardKey) => {
    const selected = dashboards[dashboardKey];
    setSelectedDashboard(selected || null);
  };

  const sortedWidgets = selectedDashboard?.positions
  ? Object.entries(selectedDashboard.positions) // Iterate over positions
      .sort((a, b) => a.position - b.position) // Sort by position
  : [];
 // Default to empty array if selectedDashboard is null or undefined
console.log("sortedWidgets: ", sortedWidgets)
  if (loading) {
    return (
      <div className="p-8">
        <Title level={2} className="mb-6">Dashboard</Title>
        <div className="flex items-center justify-center min-h-[400px]">
          <Spin size="large" tip="Loading dashboard..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <Alert
          message="Error"
          description={error}
          type="error"
          className="mb-6"
          action={
            <Button onClick={fetchData} icon={<ReloadOutlined />}>
              Retry
            </Button>
          }
        />
      </div>
    );
  }

  if (!Object.keys(dashboards).length) {
    return (
      <div className="p-8">
        <Title level={2} className="mb-6">Dashboard</Title>
        <Alert
          message="No Dashboards Available"
          description="There are no dashboards available to display."
          type="warning"
          showIcon
        />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="!mb-0">Dashboard</Title>
        <div className="flex items-center">
          <Select
            defaultValue={Object.keys(dashboards)[0] || ""} // Default to first dashboard key
            style={{ width: 200, marginRight: 16 }}
            onChange={handleDashboardChange}
            disabled={loading || !Object.keys(dashboards).length} // Disable dropdown when loading or no dashboards
          >
            {Object.keys(dashboards).map((key) => (
              <Option key={key} value={key}>
                {key} {/* Display the dashboard name */}
              </Option>
            ))}
          </Select>
          <Button
            icon={<ReloadOutlined />}
            onClick={fetchData}
            className="flex items-center"
          >
            Refresh
          </Button>
        </div>
      </div>

      <Row gutter={[16, 16]}>
        {sortedWidgets.map(([key, chartWidget]) => {
          const { grid, name, width, height, position } = chartWidget;
          const options = chartOptions[name] || {};
          const colSpan = getColSpan(grid);
          console.log("Name: ", name)
          if (!options) {
            console.warn(`No chart options found for type: ${name}`);
            return null;
          }

          return (
            <Col 
              key={key}
              span={colSpan}
              className="flex"
              style={{
                order: position // Use position for ordering
              }}
            >
              <Card
                title={name}
                className="w-full shadow-sm hover:shadow-md transition-shadow duration-300"
                bodyStyle={{ padding: "12px" }}
              >
                {name === "KPI" ? (
                  <KPIComponent data={chartOptions[name]} />
                ) : name === "Table" ? (
                  <TableComponent data={chartOptions[name]} />
                ) : (
                  <ChartComponent
                    chartOptions={chartOptions[name] || {}}
                    dimensions={{
                      width,
                      height,
                    }}
                  />
                )}
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default LandingPage;